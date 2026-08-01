import { TriangleAlert } from "lucide-react";

import "./DeleteDonationModal.css";

interface DeleteDonationModalProps {

    open: boolean;

    loading?: boolean;

    donorName?: string;

    onConfirm: () => void;

    onCancel: () => void;

}

export function DeleteDonationModal({

    open,

    loading = false,

    donorName,

    onConfirm,

    onCancel,

}: DeleteDonationModalProps) {

    if (!open) return null;

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <div className="delete-icon">

                    <TriangleAlert size={34} />

                </div>

                <h2>

                    Excluir doação

                </h2>

                <p>

                    Tem certeza que deseja excluir a doação

                    {donorName && (
                        <>
                            <strong> de "{donorName}"</strong>
                        </>
                    )}

                    ?

                </p>

                <span>

                    Esta doação será removida permanentemente e esta ação não poderá ser desfeita.

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

export default DeleteDonationModal;