import {
    CircleAlert,
    CircleCheck,
    CircleX,
    Info,
    X,
} from "lucide-react";

import { useToast } from "../../hooks/useToast";

import "./Toast.css";

export function Toast() {

    const {
        toasts,
        remove,
    } = useToast();

    function getIcon(type: string) {

        switch (type) {

            case "success":
                return <CircleCheck size={22} />;

            case "error":
                return <CircleX size={22} />;

            case "warning":
                return <CircleAlert size={22} />;

            case "info":
                return <Info size={22} />;

            default:
                return <Info size={22} />;

        }

    }

    return (

        <div className="toast-container">

            {toasts.map((toast) => (

                <div
                    key={toast.id}
                    className={`
                        toast
                        toast-${toast.type}
                        ${!toast.visible ? "toast-hide" : ""}
                    `}
                >

                    <div className="toast-icon">

                        {getIcon(toast.type)}

                    </div>

                    <div className="toast-content">

                        <strong className="toast-title">

                            {toast.title}

                        </strong>

                        <span className="toast-message">

                            {toast.message}

                        </span>

                    </div>

                    <button
                        type="button"
                        className="toast-close"
                        aria-label="Fechar notificação"
                        onClick={() => remove(toast.id)}
                    >

                        <X size={18} />

                    </button>

                </div>

            ))}

        </div>

    );

}