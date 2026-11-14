
const express = require("express");
const { db } = require("./config/firebase");
const authenticate = require("./middleware/authenticate");

const userRoutes = require("./routes/users");
const gameContentRoutes = require("./routes/gameContent");
const mapRoutes = require("./routes/map");

const app = express()

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", gameContentRoutes);
app.use("/api/map", mapRoutes);

app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "online",
        message: "API is working correctly"
    });
});

app.get("/api/firebase-test", async (req, res) => {
    try {
        await db.collection("users").limit(1).get();

        res.status(200).json({
            status: "connected",
            message: "Firestore connection successful"
        });
    } catch (error) {
        console.error("Firestore connection error:", error);

        res.status(500).json({
            status: "error",
            message: "Could not connect to Firestore"
        });
    }
});

app.get("/api/protected", authenticate, (req, res) => {
    res.status(200).json({
        message: "Authentication successful",
        uid: req.user.uid,
        email: req.user.email
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
