type Props = {
    title: string;
    description?: string;
    subtitle?: string;
    variant?: "zone" | "location";
};

export default function MapPopup({
    title,
    description,
    subtitle,
    variant = "location",
}: Props) {
    return (
        <div className={`stog-popup stog-${variant}`}>
            <div className="stog-popup-header">
                <div className="stog-title-area">
                    <h3>{title}</h3>
                    {subtitle && <span>{subtitle}</span>}
                </div>
            </div>

            {description && (
                <div className="stog-popup-body">
                    <p>{description}</p>
                </div>
            )}

            <div className="stog-popup-actions">
                <button>Explorar</button>
            </div>
        </div>
    );
}