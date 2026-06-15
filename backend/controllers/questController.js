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

        const [existing] = await db.query(
            `
            SELECT *
            FROM user_quest
            WHERE user_id = ?
            AND quest_id = ?
            `,
            [userId, questId]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Quest já aceita"
            });
        }

        await db.query(
            `
            INSERT INTO user_quest
            (user_id, quest_id, completed)
            VALUES (?, ?, false)
            `,
            [userId, questId]
        );

        await createLog(userId, "QUEST_ACCEPTED", `Usuário ${userId} aceitou a quest ${questId}`);

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

async function completeQuest(req, res) {
    try {

        
        const userId = req.user.userId;
        const questId = req.params.questId;

        const [quests] = await db.query(
            `
            SELECT xp_reward
            FROM quests
            WHERE quest_id = ?
            `,
            [questId]
        );

        const reward = quests[0].xp_reward;
        
        await db.query(
            `
            UPDATE user_quest
            SET completed = true
            WHERE user_id = ?
            AND quest_id = ?
            `,
            [userId, questId]
        );

        await db.query(
            `
            UPDATE users
            SET xp = xp + ?
            WHERE user_id = ?
            `,
            [reward, userId]
        );

        await createLog(userId, "QUEST_COMPLETED", `Usuário ${userId} completou a quest ${questId} e ganhou ${reward} XP`);

        res.json({
            success: true,
            message: "Quest concluída"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao concluir quest"
        });
    }
}

module.exports = {
    getAllQuests,
    acceptQuest,
    getMyQuests,
    completeQuest
};