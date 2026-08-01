import axios from "axios";

export const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

});

export async function deleteUser(uid: string) {

    return api.delete(`/users/${uid}`);

}