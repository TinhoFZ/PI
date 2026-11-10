const admin = require("firebase-admin");
const { GeoPoint } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  const userCounterRef = db.collection("counters").doc("users");

  const userRef = await db.runTransaction(async (transaction) => {
    const counterDoc = await transaction.get(userCounterRef);

    const newCount = counterDoc.exists
      ? counterDoc.data().count + 1
      : 1;

    const newUserRef = db.collection("users").doc();

    transaction.set(userCounterRef, {
      count: newCount
    });

    transaction.set(newUserRef, {
      name: `User${newCount}`,
      email: `user${newCount}@example.com`,
      level: 1,
      coins: 100,
      location: new GeoPoint(-8.0476, -34.8770),
      experience: {
        current: 0,
        required: 100
      },
      settings: {
        theme: "dark",
        notifications: true
      }
    });

    return newUserRef;
  });

  await userRef.collection("memories").add({
    locationId: "001",
    date: admin.firestore.Timestamp.now(),
    name: "Primeira Memória",
    text: "Uma memória inesquecível.",
    imageUrl: ""
  });

  const randomItem = Math.random();
  const randomTreasure = Math.random();
  const randomPower = Math.random();

  if (randomItem < 0.5) {
    await userRef.collection("item").doc("001").set({
      obtainedAt: admin.firestore.Timestamp.now()
    });
    console.log("User received: Lanterna");
  } else {
    await userRef.collection("item").doc("002").set({
      obtainedAt: admin.firestore.Timestamp.now()
    });
    console.log("User received: Barra de Energia");
  }

  if (randomTreasure < 0.5) {
    await userRef.collection("treasure").doc(treasureId).set({
      obtainedAt: admin.firestore.Timestamp.now()
    });
    console.log("User received: Trofeu");
  } else {
    console.log("User did not receive the treasure.");
  }

  if (randomPower < 0.5) {
    await userRef.collection("power").doc(powerId).set({
      obtainedAt: admin.firestore.Timestamp.now()
    });
    console.log("User received: Visão Noturna");
  } else {
    console.log("User did not receive the power.");
  }

  console.log("User created!");
  console.log("User ID:", userRef.id);

}