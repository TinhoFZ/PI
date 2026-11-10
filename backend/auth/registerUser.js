const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

async function registerUser(name, email, password) {
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });

        await db.collection("users").doc(userRecord.uid).set({
            name,
            email,
            level: 1,
            coins: 0,
            location: null,
            settings: {
                theme: "light",
                notifications: true
            }
        });

        return {
            success: true,
            uid: userRecord.uid
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}