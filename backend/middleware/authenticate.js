
const { auth } = require("../config/firebase");

async function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Authentication token missing"
            });
        }

        const token = authorization.split(" ")[1];

        const decodedToken = await auth.verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired authentication token"
        });
    }
}

module.exports = authenticate;
