import "./LoadingModal.css";

interface LoadingModalProps {
    open: boolean;
    title: string;
    description?: string;
}

export function LoadingModal({
    open,
    title,
    description,
}: LoadingModalProps) {

    if (!open) return null;

    return (

        <div className="loading-overlay">

            <div className="loading-modal">

                <div className="loading-spinner">

                    <span />

                </div>

                <h2>{title}</h2>

                {description && (
                    <p>{description}</p>
                )}

            </div>

        </div>

    );

}