from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.config.firebase import db

from app.routes.donations import router as donations_router
from app.routes.payments import router as payments_router
from app.routes.users import router as users_router

from app.config.mp import sdk



app = FastAPI(
    title="ABAS API",
    version="1.0.0"
)



# ==========================
# CORS
# ==========================
app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",
        "http://localhost:5174",
        "https://doeabas.netlify.app"

    ],

    allow_credentials=True,

    allow_methods=[

        "*"

    ],

    allow_headers=[

        "*"

    ]

)
# ==========================
# ROTAS
# ==========================


app.include_router(
    donations_router
)


app.include_router(
    payments_router
)

app.include_router(
    users_router
)

# ==========================
# TESTE API
# ==========================


@app.get("/")
def home():

    return {

        "status":
            "API ABAS online"

    }





# ==========================
# TESTE FIREBASE
# ==========================


@app.get("/test-firebase")
def test_firebase():

    campaigns = (
        db.collection("campaigns")
        .limit(1)
        .get()
    )


    data = []


    for campaign in campaigns:

        data.append({

            "id":
                campaign.id,

            **campaign.to_dict()

        })


    return {

        "connected":
            True,

        "campaigns":
            data

    }





# ==========================
# TESTE MERCADO PAGO
# ==========================


@app.get("/test-mp")
def test_mp():

    return {

        "mercado_pago":
            "configurado"

    }