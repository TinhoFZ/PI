const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: `${process.env.AUTH_DOMAIN}.firebaseapp.com`,
    projectId: process.env.PROJECT_KEY
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return {
            success: true,
            uid: userCredential.user.uid
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}