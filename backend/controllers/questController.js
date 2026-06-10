const db = require("../database/connection");

async function getAllQuests(req, res) {
    try {
        const [quests] = await db.query(`
            SELECT *
            FROM quests
        `);

        res.json(quests);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar quests"
        });
    }
}

async function acceptQuest(req, res) {
    try {
        const userId = req.user.userId;
        const questId = req.params.questId;

        await db.query(
            `
            INSERT INTO user_quest
            (user_id, quest_id, completed)
            VALUES (?, ?, false)
            `,
            [userId, questId]
        );

        res.json({
            message: "Quest aceita"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao aceitar quest"
        });
    }
}

async function getMyQuests(req, res) {
    try {
        const userId = req.user.userId;

        const [quests] = await db.query(
            `
            SELECT
                q.quest_id,
                q.name,
                q.description,
                uq.completed
            FROM user_quest uq
            JOIN quests q
                ON q.quest_id = uq.quest_id
            WHERE uq.user_id = ?
            `,
            [userId]
        );

        res.json(quests);

    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar quests"
        });
    }
}

module.exports = {
    getAllQuests,
    acceptQuest,
    getMyQuests
};