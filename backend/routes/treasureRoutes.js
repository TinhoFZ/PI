const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");

const treasureController = require("../controllers/treasureController");

router.get(
    "/",
    treasureController.getAllTreasures
);

router.post(
    "/:treasureId/collect",
    authenticate,
    treasureController.collectTreasure
);

router.get(
    "/my-treasures",
    authenticate,
    treasureController.getMyTreasures
);

module.exports = router;