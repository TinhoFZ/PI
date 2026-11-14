
const express = require("express");
const { GeoPoint } = require("firebase-admin/firestore");
const { db } = require("../config/firebase");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/me", authenticate, async (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const user = userDoc.data();

        res.status(200).json({
            uid: userDoc.id,
            name: user.name,
            email: user.email,
            level: user.level,
            coins: user.coins,
            location: user.location
                ? {
                    latitude: user.location.latitude,
                    longitude: user.location.longitude
                }
                : null,
            settings: user.settings
        });
    } catch (error) {
        console.error("Get user error:", error);

        res.status(500).json({
            error: "Could not retrieve user"
        });
    }
});

router.get("/me/inventory", authenticate, async (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        async function getInventory(subcollection, collection) {
            const inventorySnapshot = await userRef
                .collection(subcollection)
                .get();

            const references = inventorySnapshot.docs.map(doc =>
                db.collection(collection).doc(doc.id)
            );

            if (references.length === 0) {
                return [];
            }

            const documents = await db.getAll(...references);

            return documents
                .filter(doc => doc.exists)
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
        }

        const [items, treasures, powers] = await Promise.all([
            getInventory("item", "items"),
            getInventory("treasure", "treasures"),
            getInventory("power", "powers")
        ]);

        res.status(200).json({
            items,
            treasures,
            powers
        });
    } catch (error) {
        console.error("Get inventory error:", error);

        res.status(500).json({
            error: "Could not retrieve inventory"
        });
    }
});

router.patch("/me", authenticate, async (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const allowedFields = ["name", "settings", "location"];
        const receivedFields = Object.keys(req.body);

        const invalidFields = receivedFields.filter(
            field => !allowedFields.includes(field)
        );

        if (invalidFields.length > 0) {
            return res.status(400).json({
                error: "Fields cannot be updated",
                fields: invalidFields
            });
        }

        const updates = {};

        if (req.body.name !== undefined) {
            if (
                typeof req.body.name !== "string" ||
                !req.body.name.trim()
            ) {
                return res.status(400).json({
                    error: "Invalid name"
                });
            }

            updates.name = req.body.name.trim();
        }

        if (req.body.settings !== undefined) {
            const settings = req.body.settings;

            if (
                !settings ||
                typeof settings !== "object" ||
                Array.isArray(settings)
            ) {
                return res.status(400).json({
                    error: "Invalid settings"
                });
            }

            const allowedSettings = ["theme", "notifications"];

            for (const key of Object.keys(settings)) {
                if (!allowedSettings.includes(key)) {
                    return res.status(400).json({
                        error: "Invalid setting",
                        field: key
                    });
                }
            }

            if (settings.theme !== undefined) {
                if (
                    typeof settings.theme !== "string" ||
                    !settings.theme.trim()
                ) {
                    return res.status(400).json({
                        error: "Invalid theme"
                    });
                }

                updates["settings.theme"] = settings.theme;
            }

            if (settings.notifications !== undefined) {
                if (typeof settings.notifications !== "boolean") {
                    return res.status(400).json({
                        error: "Invalid notifications setting"
                    });
                }

                updates["settings.notifications"] = settings.notifications;
            }
        }

        if (req.body.location !== undefined) {
            const location = req.body.location;

            if (
                !location ||
                typeof location.latitude !== "number" ||
                typeof location.longitude !== "number" ||
                !Number.isFinite(location.latitude) ||
                !Number.isFinite(location.longitude) ||
                location.latitude < -90 ||
                location.latitude > 90 ||
                location.longitude < -180 ||
                location.longitude > 180
            ) {
                return res.status(400).json({
                    error: "Invalid location"
                });
            }

            updates.location = new GeoPoint(
                location.latitude,
                location.longitude
            );
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: "No valid fields provided"
            });
        }

        await userRef.update(updates);

        res.status(200).json({
            message: "User updated successfully"
        });
    } catch (error) {
        console.error("Update user error:", error);

        res.status(500).json({
            error: "Could not update user"
        });
    }
});

module.exports = router;
