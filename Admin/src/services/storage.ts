import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";

import { storage } from "./firebase";

export function slugify(text: string) {

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

}

export async function uploadCampaignCover(
    file: File,
    category: string,
    title: string
) {

    const categorySlug = slugify(category);

    const titleSlug = slugify(title);

    const extension = file.name.split(".").pop();

    const storageRef = ref(
        storage,
        `campaigns/${categorySlug}/${titleSlug}/cover.${extension}`
    );

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);

}

export async function deleteCampaignCover(
    imageUrl: string
) {

    const storageRef = ref(
        storage,
        imageUrl
    );

    await deleteObject(storageRef);

}