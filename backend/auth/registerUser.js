const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("../database/serviceAccount.json");

const app = admin.initializeApp({
    credential: admin.cert(serviceAccount)
});

const db = getFirestore(app);
const auth = getAuth(app);

async function registerUser(name, email, password) {
    try {
        const userRecord = await auth.createUser({
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

        const userRef = await db.collection("users");
        const userDoc = await userRef.get();

        console.log("Firestore document exists:", userDoc.exists);
        console.log("Firestore document:", userDoc.data());

        return {
            success: true,
            uid: userRecord.uid
        };
        
    } catch (error) {
        console.error("Registration error:", error)
        return {
            success: false,
            error: error.message
        };
    }
}