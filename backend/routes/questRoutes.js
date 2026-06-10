const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");

const questController = require("../controllers/questController");

router.get("/", questController.getAllQuests);
router.post(
    "/:questId/accept",
    authenticate,
    questController.acceptQuest
);
router.get(
    "/my-quests",
    authenticate,
    questController.getMyQuests
);

module.exports = router;