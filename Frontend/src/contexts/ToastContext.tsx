import React, {
    createContext,
    useState,
} from "react";

export type ToastType =
    | "success"
    | "error"
    | "warning"
    | "info";


export interface ToastData {

    id: string;

    type: ToastType;

    title: string;

    message: string;

    visible: boolean;

}


interface ShowToastData {

    type: ToastType;

    title: string;

    message: string;

}

interface ToastContextData {

    show: (toast: ShowToastData) => void;

    remove: (id: string) => void;

    toasts: ToastData[];

}

export const ToastContext = createContext({} as ToastContextData);

interface ToastProviderProps {

    children: React.ReactNode;

}

export function ToastProvider({
    children,
}: ToastProviderProps) {

    const [toasts, setToasts] = useState<ToastData[]>([]);

   function show({
        type,
        title,
        message,
    }: ShowToastData) {

        const id = crypto.randomUUID();

        const toast: ToastData = {

            id,

            type,

            title,

            message,

            visible: true,

        };

        setToasts((oldState) => [

            ...oldState,

            toast,

        ]);

        setTimeout(() => {

            remove(id);

        }, 4000);

    }

    function remove(id: string) {

        setToasts((oldState) =>
            oldState.map((toast) =>

                toast.id === id
                    ? {
                        ...toast,
                        visible: false,
                    }
                    : toast

            )
        );

        setTimeout(() => {

            setToasts((oldState) =>
                oldState.filter((toast) => toast.id !== id)
            );

        }, 300);

    }

    return (

        <ToastContext.Provider
            value={{

                show,

                remove,

                toasts,

            }}
        >

            {children}

        </ToastContext.Provider>

    );

}