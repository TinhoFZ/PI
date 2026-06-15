const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createLog } = require("../utils/logger");

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            `,
            [name, email, hashedPassword]
        );

        await createLog(null, "USER_REGISTERED", `Novo usuário registrado: ${email}`);

        res.status(201).json({
            message: "Usuário criado com sucesso"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro ao criar usuário"
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Email ou senha inválidos"
            });
        }

        const user = users[0];

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Email ou senha inválidos"
            });
        }

        const token = jwt.sign(
            {
                userId: user.user_id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        await createLog(user.user_id, "USER_LOGGED_IN", `Usuário logado: ${email}`);

        res.json({
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro interno"
        });
    }
}

module.exports = {
    login,
    register
};