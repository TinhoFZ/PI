async function getUserTreasures(uid) {
    const userTreasures = await db
        .collection("users")
        .doc(uid)
        .collection("treasure")
        .get();

    const treasures = await Promise.all(
        userTreasures.docs.map(async (treasure) => {
            const treasureDoc = await db
                .collection("treasures")
                .doc(treasure.id)
                .get();

            return treasureDoc.exists
                ? { id: treasureDoc.id, ...treasureDoc.data() }
                : null;
        })
    );

    return treasures.filter(treasure => treasure !== null);
}

async function getTreasure(treasureId) {
    const treasure = await db
        .collection("treasures")
        .doc(treasureId)
        .get();

    return treasure.exists
        ? { id: treasure.id, ...treasure.data() }
        : null;
}