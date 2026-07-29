import { TriangleAlert } from "lucide-react";

import "./DeleteCampaignModal.css";

interface DeleteCampaignModalProps {

    open: boolean;

    loading?: boolean;

    campaignTitle?: string;

    onConfirm: () => void;

    onCancel: () => void;

}

export function DeleteCampaignModal({

    open,

    loading = false,

    campaignTitle,

    onConfirm,

    onCancel,

}: DeleteCampaignModalProps) {

    if (!open) return null;

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <div className="delete-icon">

                    <TriangleAlert size={34} />

                </div>

                <h2>

                    Excluir campanha

                </h2>

                <p>

                    Tem certeza que deseja excluir

                    {campaignTitle && (
                        <>
                            <strong> "{campaignTitle}"</strong>
                        </>
                    )}

                    ?

                </p>

                <span>

                    A campanha será removida permanentemente, juntamente com sua imagem e todos os dados vinculados.

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