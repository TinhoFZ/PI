require('dotenv').config();
const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const questRoutes = require("./routes/questRoutes");
const treasureRoutes = require("./routes/treasureRoutes");

app.use("/auth", authRoutes);
app.use("/zones", zoneRoutes);
app.use("/quests", questRoutes);
app.use("/treasures", treasureRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});