const db = require("../database/connection");

async function getZones(req, res) {
    try {
        const [zones] = await db.query(`
            SELECT
                zone_id,
                name,
                description,
                geometry
            FROM zones
        `);

        res.status(200).json(zones);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro ao buscar zonas."
        });
    }
}

module.exports = {
    getZones
};