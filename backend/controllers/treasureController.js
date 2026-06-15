const db = require("../database/connection");
const { createLog } = require("../utils/logger");

async function getAllTreasures(req, res) {
    try {
        const [treasures] = await db.query(`
            SELECT
                treasure_id,
                zone_id,
                name,
                description,
                coordinate
            FROM treasures
        `);

        const formatted = treasures.map(t => ({
            ...t,
            coordinate: typeof t.coordinate === "string"
                ? JSON.parse(t.coordinate)
                : t.coordinate
        }));

        res.json(formatted);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro ao buscar tesouros"
        });
    }
}

async function collectTreasure(req, res) {
    try {
        const userId = req.user.userId;
        const treasureId = req.params.treasureId;

        const [treasures] = await db.query(
            `
            SELECT xp_reward
            FROM treasures
            WHERE treasure_id = ?
            `,
            [treasureId]
        );

        const reward = treasures[0].xp_reward;

        const [existing] = await db.query(
            `
            SELECT *
            FROM user_treasure
            WHERE user_id = ?
            AND treasure_id = ?
            `,
            [userId, treasureId]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "Tesouro já coletado"
            });
        }

        await db.query(
            `
            INSERT INTO user_treasure
            (user_id, treasure_id, date_collected)
            VALUES (?, ?, NOW())
            `,
            [userId, treasureId]
        );

        await db.query(
            `
            UPDATE users
            SET xp = xp + ?
            WHERE user_id = ?
            `,
            [reward, userId]
        );

        await createLog(userId, "TREASURE_COLLECTED", `Tesouro coletado: ID ${treasureId}, XP ganho: ${reward}`);

        res.json({
            message: "Tesouro coletado"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao coletar tesouro"
        });
    }
}

async function getMyTreasures(req, res) {
    try {
        const userId = req.user.userId;

        const [treasures] = await db.query(
            `
            SELECT
                t.treasure_id,
                t.name,
                t.description,
                ut.date_collected
            FROM user_treasure ut
            JOIN treasures t
                ON t.treasure_id = ut.treasure_id
            WHERE ut.user_id = ?
            `,
            [userId]
        );

        res.json(treasures);

    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar tesouros"
        });
    }
}

module.exports = {
    getAllTreasures,
    collectTreasure,
    getMyTreasures
}