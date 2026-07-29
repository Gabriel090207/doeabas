import { API_URL } from "../config/api";


interface PixPaymentData {

    amount: number;

    email: string;

    campaign_id: string;

    campaign_title: string;

    donor_name: string;

}



export async function createPixPayment(
    data: PixPaymentData
){

    const response = await fetch(

        `${API_URL}/payments/create-pix`,

        {

            method:"POST",

            headers:{

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(data)

        }

    );


    if(!response.ok){

        throw new Error(
            "Erro ao gerar Pix"
        );

    }


    return await response.json();

}





interface CardPaymentData {

    token: string;

    payment_method_id: string;

    issuer_id?: string;

    installments: number;

    amount: number;

    email: string;

    campaign_id: string;

    campaign_title: string;

    donor_name: string;

    cpf: string;

    expiration_month: number;

    expiration_year: number;

}



export async function createCardPayment(
    data: CardPaymentData
){

    const response = await fetch(

        `${API_URL}/payments/create-card`,

        {

            method:"POST",

            headers:{

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(data)

        }

    );


    if(!response.ok){

        throw new Error(
            "Erro ao criar pagamento com cartão"
        );

    }


    return await response.json();

}





export async function getPaymentStatus(
    paymentId: string
){

    const response = await fetch(

        `${API_URL}/payments/payment-status/${paymentId}`

    );


    if(!response.ok){

        throw new Error(
            "Erro ao consultar pagamento"
        );

    }


    return await response.json();

}