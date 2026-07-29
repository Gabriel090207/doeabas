from fastapi import APIRouter

from pydantic import BaseModel

from datetime import datetime

from app.config.firebase import db


router = APIRouter()



class DonationCreate(BaseModel):

    paymentId: int | None = None

    campaignId: str

    campaignTitle: str

    amount: float

    donorName: str

    donorEmail: str

    paymentMethod: str



@router.post("/donations")
def create_donation(
    data: DonationCreate
):


    donation_ref = (
        db.collection("donations")
        .document()
    )


    donation_ref.set({

        "paymentId":
            data.paymentId,

        "campaignId":
            data.campaignId,

        "campaignTitle":
            data.campaignTitle,

        "amount":
            data.amount,

        "donorName":
            data.donorName,

        "donorEmail":
            data.donorEmail,

        "paymentMethod":
            data.paymentMethod,

        "status":
            "pending",

        "createdAt":
            datetime.utcnow()

    })


    return {

        "success": True,

        "id":
            donation_ref.id

    }





@router.delete("/donations/{donation_id}")
def delete_donation(
    donation_id: str
):


    donation_ref = (
        db.collection("donations")
        .document(donation_id)
    )


    donation = donation_ref.get()


    if not donation.exists:

        return {

            "success": False,

            "message":
                "Doação não encontrada"

        }


    donation_ref.delete()


    return {

        "success": True,

        "message":
            "Doação apagada"

    }