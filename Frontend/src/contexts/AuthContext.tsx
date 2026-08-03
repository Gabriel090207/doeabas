import {
    createContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import type { User } from "firebase/auth";

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";

import {
    auth,
    db,
} from "../services/firebase";

import { FirebaseError } from "firebase/app";

interface CreateAccountData {

    fullName: string;

    cpf: string;

    phone: string;

    email: string;

    password: string;

}

interface AuthContextData {

    user: User | null;

    authenticated: boolean;

    loading: boolean;

    createAccount: (
        data: CreateAccountData,
    ) => Promise<void>;

    login: (
        email: string,
        password: string,
    ) => Promise<void>;

    logout: () => Promise<void>;

}

export const AuthContext = createContext(
    {} as AuthContextData,
);

interface AuthProviderProps {

    children: ReactNode;

}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [loading, setLoading] =
        useState(true);

    const [user, setUser] =
        useState<User | null>(null);

    async function createAccount(
        data: CreateAccountData,
    ) {

        setLoading(true);

        try {

            const cpfQuery = query(

                collection(db, "users"),

                where("cpf", "==", data.cpf),

            );

            const cpfSnapshot = await getDocs(cpfQuery);

            if (!cpfSnapshot.empty) {

                throw new Error(
                    "Este CPF já está cadastrado."
                );

            }

            const userCredential =
                await createUserWithEmailAndPassword(

                    auth,

                    data.email,

                    data.password,

                );

            await setDoc(

                doc(
                    db,
                    "users",
                    userCredential.user.uid,
                ),

                {

                    uid: userCredential.user.uid,

                    fullName: data.fullName,

                    cpf: data.cpf,

                    phone: data.phone,

                    email: data.email,

                    role: "user",

                    createdAt: serverTimestamp(),

                }

            );

            } catch (error) {

                
                if (error instanceof FirebaseError) {

                    switch (error.code) {

                        case "auth/email-already-in-use":

                            throw new Error(
                                "Este e-mail já está cadastrado."
                            );

                        case "auth/invalid-email":

                            throw new Error(
                                "O e-mail informado é inválido."
                            );

                        case "auth/weak-password":

                            throw new Error(
                                "A senha deve possuir pelo menos 6 caracteres."
                            );

                        case "auth/network-request-failed":

                            throw new Error(
                                "Falha de conexão. Tente novamente."
                            );

                        default:

                            throw new Error(
                                "Não foi possível criar sua conta."
                            );

                    }

                }

                if (error instanceof Error) {

                    throw error;

                }

                throw new Error(
                    "Ocorreu um erro inesperado."
                );

            } finally {

                setLoading(false);

            }

    }


    async function login(
        email: string,
        password: string,
    ) {

        setLoading(true);

        try {

            await signInWithEmailAndPassword(

                auth,

                email,

                password,

            );

        } catch (error) {

            if (error instanceof FirebaseError) {

                switch (error.code) {

                    case "auth/invalid-credential":

                        throw new Error(
                            "E-mail ou senha inválidos."
                        );

                    case "auth/network-request-failed":

                        throw new Error(
                            "Falha de conexão. Tente novamente."
                        );

                    default:

                        throw new Error(
                            "Não foi possível entrar."
                        );

                }

            }

            throw new Error(
                "Ocorreu um erro inesperado."
            );

        } finally {

            setLoading(false);

        }

    }

    async function logout() {

        await signOut(auth);

    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(

            auth,

            async (currentUser) => {

                if (!currentUser) {

                    setUser(null);

                    setLoading(false);

                    return;

                }

                try {

                    const userDoc = await getDoc(
                        doc(db, "users", currentUser.uid)
                    );

                    if (userDoc.exists()) {

                        setUser({

                            ...currentUser,

                            ...userDoc.data(),

                        } as any);

                    } else {

                        setUser(currentUser);

                    }

                } catch {

                    setUser(currentUser);

                }

                setLoading(false);

            },

        );

        return unsubscribe;

    }, []);

    return (

        <AuthContext.Provider
            value={{

                user,

                authenticated: !!user,

                loading,

                createAccount,

                login,

                logout,

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


