const db = require("../database/connection");

async function getZones(req, res) {
    try {
        const [zones] = await db.query(`
            SELECT
                z.zone_id,
                z.name,
                z.description,
                z.geometry,
                COUNT(t.treasure_id) AS treasure_count
            FROM zones z
            LEFT JOIN treasures t
                ON t.zone_id = z.zone_id
            GROUP BY
                z.zone_id,
                z.name,
                z.description,
                z.geometry
        `);

        const formatted = zones.map(zone => ({
            zone_id: zone.zone_id,
            name: zone.name,
            description: zone.description,
            treasure_count: Number(zone.treasure_count),
            geometry: typeof zone.geometry === "string"
                ? JSON.parse(zone.geometry)
                : zone.geometry
        }))
        .filter(zone =>
            Array.isArray(zone.geometry) &&
            zone.geometry.length > 0 &&
            zone.geometry.every(
                p => Array.isArray(p) && p.length === 2
            )
        );

        return res.status(200).json(formatted);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erro ao buscar zonas."
        });
    }
}

module.exports = {
    getZones
};