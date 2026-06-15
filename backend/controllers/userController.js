const db = require("../database/connection");

async function me(req, res) {
    const [users] = await db.query(
        `
        SELECT
            user_id,
            name,
            email,
            xp,
            coins,
            level
        FROM users
        WHERE user_id = ?
        `,
        [req.user.userId]
    );

    res.json(users[0]);
}

async function leaderboard(req, res) {
    const [users] = await db.query(
        `
        SELECT
            user_id,
            name,
            xp,
            level
        FROM users
        ORDER BY xp DESC
        LIMIT 50
        `
    );

    res.json(users);
}

module.exports = {
    me,
    leaderboard
};