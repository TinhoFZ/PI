require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const requestLogger = require("./middlewares/requestLogger");

app.use(requestLogger);

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const questRoutes = require("./routes/questRoutes");
const treasureRoutes = require("./routes/treasureRoutes");
const locationRoutes = require("./routes/locationRoutes");

app.use("/", userRoutes);

app.use("/auth", authRoutes);
app.use("/zones", zoneRoutes);
app.use("/quests", questRoutes);
app.use("/treasures", treasureRoutes);
app.use("/locations", locationRoutes);

const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});