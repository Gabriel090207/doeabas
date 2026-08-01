from fastapi import APIRouter
from fastapi import HTTPException

from firebase_admin import auth

from app.config.firebase import db


router = APIRouter(

    prefix="/users",

    tags=["Users"]

)


@router.delete("/{uid}")
def delete_user(uid: str):

    try:

        auth.delete_user(uid)

        db.collection("users").document(uid).delete()

        return {

            "success": True

        }

    except auth.UserNotFoundError:

        raise HTTPException(

            status_code=404,

            detail="Usuário não encontrado."

        )

    except Exception as error:

        raise HTTPException(

            status_code=500,

            detail=str(error)

        )