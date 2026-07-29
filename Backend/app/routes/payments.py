from fastapi import APIRouter

from pydantic import BaseModel

from app.config.mp import sdk

from datetime import datetime

from app.config.firebase import db


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