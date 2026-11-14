
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

router.post("/treasures/:id/collect", authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const treasureId = req.params.id;

        const treasureRef = db.collection("treasures").doc(treasureId);
        const userTreasureRef = db
            .collection("users")
            .doc(userId)
            .collection("treasure")
            .doc(treasureId);

        await db.runTransaction(async (transaction) => {
            const treasureDoc = await transaction.get(treasureRef);
            const userTreasureDoc = await transaction.get(userTreasureRef);

            if (!treasureDoc.exists) {
                throw new Error("TREASURE_NOT_FOUND");
            }

            if (userTreasureDoc.exists) {
                throw new Error("TREASURE_ALREADY_COLLECTED");
            }

            transaction.set(userTreasureRef, {
                collectedAt: new Date()
            });
        });

        return res.status(200).json({
            message: "Treasure collected successfully"
        });

    } catch (error) {
        if (error.message === "TREASURE_NOT_FOUND") {
            return res.status(404).json({
                error: "Treasure not found"
            });
        }

        if (error.message === "TREASURE_ALREADY_COLLECTED") {
            return res.status(409).json({
                error: "Treasure already collected"
            });
        }

        console.error("Collect treasure error:", error);

        return res.status(500).json({
            error: "Could not collect treasure"
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
