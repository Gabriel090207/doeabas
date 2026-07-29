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



    print("====================")
    print(response)
    print("====================")



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



        payment_response = sdk.payment().get(
            payment_id
        )


        payment = payment_response["response"]



        print("====================")
        print(payment)
        print("====================")



        if payment.get("status") != "approved":

            return {

                "success": True,

                "status":
                    payment.get("status")

            }



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


        donation = donation_doc.to_dict()



        if donation.get("status") == "approved":

            return {

                "success": True,

                "message":
                    "Doação já aprovada"

            }



        donation_doc.reference.update({

            "status":
                "approved",

            "paymentStatus":
                "approved",

            "approvedAt":
                datetime.utcnow()

        })



        campaign_ref = (
            db.collection("campaigns")
            .document(
                donation["campaignId"]
            )
        )


        campaign_ref.update({

            "raisedAmount":
                Increment(
                    donation["amount"]
                )

        })


        return {

            "success":
                True

        }



    except Exception as error:


        print(error)


        return {

            "success":
                False

        }