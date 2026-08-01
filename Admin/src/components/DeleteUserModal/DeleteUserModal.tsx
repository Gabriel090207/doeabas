import { TriangleAlert } from "lucide-react";

import "./DeleteUserModal.css";

interface DeleteUserModalProps {

    open: boolean;

    loading?: boolean;

    userName?: string;

    onConfirm: () => void;

    onCancel: () => void;

}

export function DeleteUserModal({

    open,

    loading = false,

    userName,

    onConfirm,

    onCancel,

}: DeleteUserModalProps) {

    if (!open) return null;

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <div className="delete-icon">

                    <TriangleAlert size={34} />

                </div>

                <h2>

                    Excluir usuário

                </h2>

                <p>

                    Tem certeza que deseja excluir

                    {userName && (

                        <>

                            <strong> "{userName}"</strong>

                        </>

                    )}

                    ?

                </p>

                <span>

                    O usuário será removido permanentemente da plataforma e não poderá mais acessar sua conta.

                </span>

                <div className="delete-actions">

                    <button

                        className="cancel"

                        onClick={onCancel}

                        disabled={loading}

                    >

                        Cancelar

                    </button>

                    <button

                        className="confirm"

                        onClick={onConfirm}

                        disabled={loading}

                    >

                        {loading

                            ? "Excluindo..."

                            : "Excluir"}

                    </button>

                </div>

            </div>

        </div>

    );

}