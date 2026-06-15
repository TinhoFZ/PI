const db = require("../database/connection");

async function requestLogger(req, res, next) {
    const originalSend = res.send;

    res.send = function (body) {

        db.query(
            `
            INSERT INTO error_logs
            (
                user_id,
                route,
                method,
                status_code,
                ip_address,
                user_agent
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                req.user?.userId || null,
                req.originalUrl,
                req.method,
                res.statusCode,
                req.ip,
                req.get("User-Agent")
            ]
        ).catch(console.error);

        return originalSend.call(this, body);
    };

    next();
}

module.exports = requestLogger;