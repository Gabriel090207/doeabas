import os
import json

import firebase_admin

from firebase_admin import credentials
from firebase_admin import firestore



firebase_key_path = (
    "app/firebase-key.json"
)


if os.path.exists(firebase_key_path):

    cred = credentials.Certificate(
        firebase_key_path
    )

else:

    firebase_credentials = json.loads(
        os.getenv(
            "FIREBASE_CREDENTIALS"
        )
    )

    cred = credentials.Certificate(
        firebase_credentials
    )


if not firebase_admin._apps:

    firebase_admin.initialize_app(
        cred
    )


db = firestore.client()