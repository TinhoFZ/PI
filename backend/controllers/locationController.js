const db = require("../database/connection");
const { createLog } = require("../utils/logger");

async function getAllLocations(req, res) {
    try {
        const [locations] = await db.query(`
            SELECT
                location_id,
                zone_id,
                quest_id,
                name,
                description,
                coordinate,
                type
            FROM locations
        `);

        const formatted = locations.map(loc => ({
            ...loc,
            coordinate:
                typeof loc.coordinate === "string"
                    ? JSON.parse(loc.coordinate)
                    : loc.coordinate
        }));

        res.json(formatted);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro ao buscar locations"
        });
    }
}

async function getLocationsByZone(req, res) {
    try {
        const { zoneId } = req.params;

        const [locations] = await db.query(`
            SELECT
                location_id,
                zone_id,
                name,
                description,
                coordinate,
                type
            FROM locations
            WHERE zone_id = ?
        `, [zoneId]);

        const formatted = locations.map(loc => ({
            ...loc,
            coordinate:
                typeof loc.coordinate === "string"
                    ? JSON.parse(loc.coordinate)
                    : loc.coordinate
        }));

        res.json(formatted);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro ao buscar locations da zona"
        });
    }
}

async function createLocation(req, res) {
    try {
        const {
            zone_id,
            quest_id,
            name,
            description,
            coordinate,
            type
        } = req.body;

        const userId = req.user?.userId || null;

        await db.query(`
            INSERT INTO locations
            (zone_id, quest_id, name, description, coordinate, type)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            zone_id,
            quest_id,
            name,
            description,
            JSON.stringify(coordinate),
            type || "poi"
        ]);

        await createLog(
            userId,
            "LOCATION_CREATED",
            `Location criada: ${name} (zone ${zone_id})`
        );

        res.status(201).json({
            message: "Location criada com sucesso"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro ao criar location"
        });
    }
}

module.exports = {
    getAllLocations,
    getLocationsByZone,
    createLocation
};