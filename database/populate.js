const admin = require("firebase-admin");
const { GeoPoint } = require("firebase-admin/firestore");
const { geohashForLocation } = require("geofire-common");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function main() {
  const itemId = "001";
  const treasureId = "001";
  const powerId = "002";

  await db.collection("items").doc(itemId).set({
    name: "Lanterna",
    description: "Uma lanterna brilhante para iluminar o caminho.",
    type: "exploração",
    imageUrl: ""
  });

  await db.collection("items").doc("002").set({
    name: "Barra de Energia",
    description: "Uma barra de energia para recuperar a vitalidade.",
    type: "consumível",
    imageUrl: ""
  });

  await db.collection("treasures").doc(treasureId).set({
    name: "Trofeu",
    description: "O primeiro tesouro a ser criado!",
    value: 1000,
    rarity: "unique",
    imageUrl: ""
  });

  await db.collection("powers").doc(powerId).set({
    name: "Visão Noturna",
    description: "Permite enxergar no escuro.",
    imageUrl: ""
  });

  const zoneRef = await db.collection("zones").add({
    name: "Centro Histórico",
    description: "Região histórica do Recife.",
    boundaries: [
      new GeoPoint(-8.0476, -34.8770),
      new GeoPoint(-8.0480, -34.8760),
      new GeoPoint(-8.0490, -34.8775),
      new GeoPoint(-8.0476, -34.8770)
    ]
  });

  await zoneRef.collection("locations").add({
    name: "Marco Zero",
    description: "Praça histórica do Recife.",
    coordinates: new GeoPoint(-8.0631, -34.8711),
    type: "poi",
    geohash: geohashForLocation([latitude, longitude])
  });

  await zoneRef.collection("locations").add({
    name: "Paço do Frevo",
    description: "Centro de referência do frevo.",
    coordinates: new GeoPoint(-8.0608, -34.8711),
    type: "poi",
    geohash: geohashForLocation([latitude, longitude])
  });

  const questRef = await db.collection("quests").add({
    name: "Explorando o Recife",
    description: "Explore os pontos alguns pontos de interesse do Recife!",
    rewards: {
      coins: 500,
      experience: 100
    },
    goals: {
      type: "visit_locations",
      amount: {
        needed: 2,
        completed: 0
      }
    }
  });

  console.log("Zone and locations created!");
  console.log("Database populated!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
