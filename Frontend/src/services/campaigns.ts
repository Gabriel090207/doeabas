import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
    getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export interface Campaign {

    id: string;

    slug: string;

    title: string;

    story: string;

    coverImage: string;

    category: string;

    goalAmount: number;

    raisedAmount: number;

    duration: string;

    featured: boolean;

    status: string;

    createdAt?: any;

}

function normalizeCampaign(doc: any): Campaign {

    return {

        id: doc.id,

        ...doc.data(),

    } as Campaign;

}

/* ==========================================================
   CAMPANHAS EM DESTAQUE
========================================================== */

export function getFeaturedCampaigns(
    callback: (campaigns: Campaign[]) => void
) {

    return onSnapshot(

        query(
            collection(db, "campaigns"),
            orderBy("createdAt", "desc")
        ),

        (snapshot) => {

            callback(

                snapshot.docs
                    .map(normalizeCampaign)
                    .filter(campaign =>
                        campaign.featured &&
                        campaign.status === "Ativa"
                    )
                    .slice(0, 4)

            );

        }

    );

}

/* ==========================================================
   TODAS AS CAMPANHAS
========================================================== */

export async function getCampaigns(): Promise<Campaign[]> {

    const snapshot = await getDocs(

        query(
            collection(db, "campaigns"),
            orderBy("createdAt", "desc")
        )

    );

    return snapshot.docs.map(normalizeCampaign);

}


/* ==========================================================
   CAMPANHA POR SLUG
========================================================== */

export async function getCampaignBySlug(
    slug: string
): Promise<Campaign | null> {


    const snapshot = await getDocs(

        query(

            collection(db, "campaigns"),

            where(
                "slug",
                "==",
                slug
            )

        )

    );


    if (snapshot.empty) {

        return null;

    }


    const campaign = snapshot.docs[0];


    return normalizeCampaign(
        campaign
    );

}


/* ==========================================================
   OUVIR CAMPANHA EM TEMPO REAL
========================================================== */

export function listenCampaignBySlug(
    slug: string,
    callback: (campaign: Campaign | null) => void
){

    return onSnapshot(

        query(

            collection(db, "campaigns"),

            where(
                "slug",
                "==",
                slug
            )

        ),

        (snapshot)=>{


            if(snapshot.empty){

                callback(null);

                return;

            }


            const campaign =
                snapshot.docs[0];


            callback(
                normalizeCampaign(
                    campaign
                )
            );


        }

    );

}