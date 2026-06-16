const express = require("express");
const router = express.Router();

const {
    getAllLocations,
    getLocationsByZone,
    createLocation
} = require("../controllers/locationController");

const authenticate = require("../middlewares/authMiddleware");

router.get("/", getAllLocations);
router.get("/zone/:zoneId", getLocationsByZone);

router.post("/", authenticate, createLocation);

module.exports = router;