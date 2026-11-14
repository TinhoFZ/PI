const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { geohashForLocation } = require("geofire-common");

const serviceAccount = require("./serviceAccount.json");

const app = admin.initializeApp({
    credential: admin.cert(serviceAccount)
});

const db = getFirestore(app);

async function updateLocationGeohashes() {
    const zonesSnapshot = await db.collection("zones").get();

    let updated = 0;

    for (const zoneDoc of zonesSnapshot.docs) {
        const locationsSnapshot = await zoneDoc.ref
            .collection("locations")
            .get();

        for (const locationDoc of locationsSnapshot.docs) {
            const location = locationDoc.data();

            if (!location.coordinates) continue;

            const geohash = geohashForLocation([
                location.coordinates.latitude,
                location.coordinates.longitude
            ]);

            await locationDoc.ref.update({ geohash });

            updated++;
        }
    }

    console.log(`${updated} locations updated.`);
}

updateLocationGeohashes()
    .catch(console.error)
    .finally(() => app.delete());