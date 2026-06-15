const db = require("../database/connection");

async function errorHandler(err, req, res, next) {

    await db.query(
        `
        INSERT INTO error_logs
        (
            user_id,
            route,
            method,
            status_code,
            error_message,
            ip_address,
            user_agent
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            req.user?.userId || null,
            req.originalUrl,
            req.method,
            500,
            err.message,
            req.ip,
            req.get("User-Agent")
        ]
    );

    res.status(500).json({
        message: "Erro interno"
    });
}

module.exports = errorHandler;