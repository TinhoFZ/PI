const db = require("../database/connection");

async function createLog(userId, action, description) {
    try {
        await db.query(
            `
            INSERT INTO logs
            (
                user_id,
                action,
                description
            )
            VALUES (?, ?, ?)
            `,
            [userId, action, description]
        );
    } catch (error) {
        console.error("Erro ao criar log:", error);
    }
}

module.exports = {
    createLog
};