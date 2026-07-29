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