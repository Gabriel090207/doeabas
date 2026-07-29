import os

from dotenv import load_dotenv

import mercadopago


load_dotenv()


access_token = os.getenv(
    "MERCADO_PAGO_ACCESS_TOKEN"
)


sdk = mercadopago.SDK(
    access_token
)