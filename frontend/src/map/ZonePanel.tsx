import type { Zone } from "../types/Zone";

type Props = {
    zone: Zone | null;
    onClose: () => void;
};

export default function ZonePanel({ zone, onClose }: Props) {
    if (!zone) return null;

    return (
        <div className="stog-panel">
            <div className="stog-panel-header">
                <h4>{zone.name}</h4>
                <button onClick={onClose}>×</button>
            </div>

            <p className="stog-panel-desc">
                {zone.description}
            </p>

            <div className="stog-panel-box">
                🧭 Área explorável ativa
            </div>

            <div className="stog-panel-actions">
                <button>Explorar zona</button>
            </div>
        </div>
    );
}