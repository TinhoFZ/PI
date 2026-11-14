
const express = require("express");
const { db } = require("../config/firebase");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

const contentTypes = {
    items: {
        userSubcollection: "item",
        collection: "items"
    },
    treasures: {
        userSubcollection: "treasure",
        collection: "treasures"
    },
    powers: {
        userSubcollection: "power",
        collection: "powers"
    }
};

function getDocument(collection) {
    return async (req, res) => {
        try {
            const id = req.params.id;

            const contentRef = db.collection(collection).doc(id);
            const contentDoc = await contentRef.get();

            if (!contentDoc.exists) {
                return res.status(404).json({
                    error: "Content not found"
                });
            }

            res.status(200).json({
                id: contentDoc.id,
                ...contentDoc.data()
            });
        } catch (error) {
            console.error("Get content error:", error);

            res.status(500).json({
                error: "Could not retrieve content"
            });
        }
    };
}

router.post("/zones/:zoneId/locations/:locationId/collect", authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { zoneId, locationId } = req.params;

        const locationRef = db
            .collection("zones")
            .doc(zoneId)
            .collection("locations")
            .doc(locationData.treasureId);

        const userTreasureRef = db
            .collection("users")
            .doc(userId)
            .collection("treasure")
            .doc(`${zoneId}_${locationId}`);

        const result = await db.runTransaction(async (transaction) => {
            const locationDoc = await transaction.get(locationRef);

            if (!locationDoc.exists) {
                throw new Error("LOCATION_NOT_FOUND");
            }

            const locationData = locationDoc.data();

            if (locationData.type !== "treasure" || !locationData.treasureId) {
                throw new Error("INVALID_TREASURE_LOCATION");
            }

            const treasureRef = db
                .collection("treasures")
                .doc(locationData.treasureId);

            const treasureDoc = await transaction.get(treasureRef);

            if (!treasureDoc.exists) {
                throw new Error("TREASURE_NOT_FOUND");
            }

            const userTreasureDoc = await transaction.get(userTreasureRef);

            if (userTreasureDoc.exists) {
                throw new Error("TREASURE_ALREADY_COLLECTED");
            }

            transaction.set(userTreasureRef, {
                treasureId: locationData.treasureId,
                zoneId,
                locationId,
                collectedAt: new Date()
            });

            return {
                treasureId: locationData.treasureId
            };
        });

        return res.status(200).json({
            message: "Treasure collected successfully",
            ...result
        });

    } catch (error) {
        const errors = {
            LOCATION_NOT_FOUND: [404, "Location not found"],
            INVALID_TREASURE_LOCATION: [400, "This location is not a valid treasure location"],
            TREASURE_NOT_FOUND: [404, "Treasure not found"],
            TREASURE_ALREADY_COLLECTED: [409, "This location has already been collected"]
        };

        if (errors[error.message]) {
            const [status, message] = errors[error.message];

            return res.status(status).json({ error: message });
        }

        console.error("Collect treasure error:", error);

        return res.status(500).json({
            error: "Could not collect treasure"
        });
    }
});

router.post("/items/:id/use", authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const itemId = req.params.id;

        const itemRef = db.collection("items").doc(itemId);

        const userItemRef = db
            .collection("users")
            .doc(userId)
            .collection("item")
            .doc(itemId);

        await db.runTransaction(async (transaction) => {
            const itemDoc = await transaction.get(itemRef);

            if (!itemDoc.exists) {
                throw new Error("ITEM_NOT_FOUND");
            }

            const userItemDoc = await transaction.get(userItemRef);

            if (!userItemDoc.exists) {
                throw new Error("ITEM_NOT_OWNED");
            }

            transaction.delete(userItemRef);
        });

        return res.status(200).json({
            message: "Item used successfully",
            itemId
        });

    } catch (error) {
        const errors = {
            ITEM_NOT_FOUND: [404, "Item not found"],
            ITEM_NOT_OWNED: [403, "You do not own this item"]
        };

        if (errors[error.message]) {
            const [status, message] = errors[error.message];

            return res.status(status).json({ error: message });
        }

        console.error("Use item error:", error);

        return res.status(500).json({
            error: "Could not use item"
        });
    }
});

for (const [type, config] of Object.entries(contentTypes)) {
    router.get(
        `/${type}/:id`,
        authenticate,
        getDocument(config.collection)
    );
}

module.exports = router;
