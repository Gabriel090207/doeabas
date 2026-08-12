from fastapi import APIRouter, Request

from pydantic import BaseModel

from app.config.mp import sdk

from datetime import datetime

from app.config.firebase import db

from google.cloud.firestore_v1 import Increment

router = APIRouter()



class PixPayment(BaseModel):

    amount: float

    email: str

    campaign_id: str

    campaign_title: str

    donor_name: str


class CardPayment(BaseModel):

    token: str

    payment_method_id: str

    issuer_id: str | None = None

    installments: int

    amount: float

    email: str

    campaign_id: str

    campaign_title: str

    donor_name: str

    cpf: str

    expiration_month: int

    expiration_year: int


@router.post("/payments/create-pix")
def create_pix(
    data: PixPayment
):


    payment_data = {


        "transaction_amount":
            data.amount,


        "description":
            data.campaign_title,


        "payment_method_id":
            "pix",


        "payer": {

            "email":
                data.email,

            "first_name":
                data.donor_name

        },


        "metadata": {

            "campaign_id":
                data.campaign_id,


            "campaign_title":
                data.campaign_title,


            "donor_name":
                data.donor_name,


            "donor_email":
                data.email

        }

    }



    response = sdk.payment().create(
        payment_data
    )






    if "response" not in response:

        return {

            "success": False,

            "error":
                response

        }



    payment = response["response"]

 

    if not payment.get("id"):

        return {

            "success": False,

            "mercadopago_response": response,
            "payment": payment

        }




    donation_ref = (
        db.collection("donations")
        .document()
    )



    donation_ref.set({


        "paymentId":
            payment.get("id"),


        "campaignId":
            data.campaign_id,


        "campaignTitle":
            data.campaign_title,


        "amount":
            data.amount,


        "donorName":
            data.donor_name,


        "donorEmail":
            data.email,


        "paymentMethod":
            "pix",


        "status":
            "pending",


        "paymentStatus":
            payment.get("status"),


        "createdAt":
            datetime.utcnow()

    })



    return {


        "success":
            True,


        "id":
            payment.get("id"),


        "donationId":
            donation_ref.id,


        "status":
            payment.get("status"),


        "qr_code":
            payment.get(
                "point_of_interaction",
                {}
            )
            .get(
                "transaction_data",
                {}
            )
            .get(
                "qr_code"
            ),


        "qr_code_base64":
            payment.get(
                "point_of_interaction",
                {}
            )
            .get(
                "transaction_data",
                {}
            )
            .get(
                "qr_code_base64"
            )

    }



@router.post("/webhook")
async def mercadopago_webhook(
    request: Request
):

    try:

        payment_id = request.query_params.get(
            "data.id"
        )


        if not payment_id:

            return {
                "success": True
            }


        # Consulta o pagamento diretamente no Mercado Pago
        payment_response = sdk.payment().get(
            payment_id
        )


        payment = payment_response["response"]


        # Só continua se o Mercado Pago confirmar
        # que o pagamento foi aprovado
        if payment.get("status") != "approved":

            return {

                "success": True,

                "status":
                    payment.get("status")

            }


        # Procura a doação correspondente
        # ao paymentId recebido
        donations = (
            db.collection("donations")
            .where(
                "paymentId",
                "==",
                int(payment_id)
            )
            .limit(1)
            .get()
        )


        if len(donations) == 0:

            return {

                "success": False,

                "message":
                    "Doação não encontrada"

            }


        donation_doc = donations[0]

        donation_ref = donation_doc.reference


        # A transação impede que dois webhooks
        # simultâneos somem a mesma doação duas vezes
        @db.transactional
        def approve_donation(transaction):

            donation_snapshot = donation_ref.get(
                transaction=transaction
            )


            donation = donation_snapshot.to_dict()


            # Se outro webhook já aprovou essa doação,
            # não soma novamente
            if donation.get("status") == "approved":

                return False


            campaign_ref = (
                db.collection("campaigns")
                .document(
                    donation["campaignId"]
                )
            )


            # Aprova a doação
            transaction.update(
                donation_ref,
                {

                    "status":
                        "approved",

                    "paymentStatus":
                        "approved",

                    "approvedAt":
                        datetime.utcnow()

                }
            )


            # Soma somente essa nova doação
            # ao valor que a campanha já possui
            transaction.update(
                campaign_ref,
                {

                    "raisedAmount":
                        Increment(
                            donation["amount"]
                        )

                }
            )


            return True


        transaction = db.transaction()


        approved_now = approve_donation(
            transaction
        )


        if not approved_now:

            return {

                "success": True,

                "message":
                    "Doação já aprovada"

            }


        return {

            "success": True,

            "message":
                "Doação aprovada com sucesso"

        }


    except Exception as error:

        print(
            "ERRO WEBHOOK:",
            error
        )


        return {

            "success": False,

            "error":
                str(error)

        }

@router.get("/payments/payment-status/{payment_id}")
def payment_status(
    payment_id: str
):

    payment_response = sdk.payment().get(
        payment_id
    )

    payment = payment_response["response"]


    return {

        "status":
            payment.get("status")

    }



@router.post("/payments/create-card")
def create_card_payment(
    data: CardPayment
):

    payment_data = {

        "transaction_amount":
            float(data.amount),


        "token":
            data.token,


        "description":
            data.campaign_title,


        "installments":
            data.installments,


        "payment_method_id":
            data.payment_method_id,


        "issuer_id":
            data.issuer_id,


        "metadata": {

            "campaign_id":
                data.campaign_id,


            "campaign_title":
                data.campaign_title,


            "donor_name":
                data.donor_name,


            "donor_email":
                data.email

        },


        "payer": {

            "email":
                data.email,


            "identification": {

                "type":
                    "CPF",


                "number":
                    data.cpf

            }

        }

    }


    response = sdk.payment().create(
        payment_data
    )



    if "response" not in response:


        return {

            "success": False,

            "error":
                response

        }



    payment = response["response"]



    if not payment.get("id"):


        return {

            "success": False,

            "error":
                "Pagamento sem ID retornado"

        }



    if payment.get("status") == "approved":


        donation_ref = (
            db.collection("donations")
            .document()
        )


        donation_ref.set({

            "paymentId":
                payment.get("id"),


            "campaignId":
                data.campaign_id,


            "campaignTitle":
                data.campaign_title,


            "amount":
                data.amount,


            "donorName":
                data.donor_name,


            "donorEmail":
                data.email,


            "paymentMethod":
                "credit_card",


            "status":
                "approved",


            "paymentStatus":
                payment.get("status"),


            "createdAt":
                datetime.utcnow()

        })

    return {

        "success": True,

        "id": payment.get("id"),

        "status": payment.get("status"),

        "payment_method":
            payment.get("payment_method_id"),

        "payment_type":
            payment.get("payment_type_id")

    }