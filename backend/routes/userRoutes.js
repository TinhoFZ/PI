const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");


router.get(
    "/me",
    authenticate,
    userController.me
);

router.get(
    "/leaderboard",
    userController.leaderboard
);

module.exports = router;