async function getUserItems(uid) {
    const userItems = await db
        .collection("users")
        .doc(uid)
        .collection("item")
        .get();

    const items = await Promise.all(
        userItems.docs.map(async (item) => {
            const itemDoc = await db
                .collection("items")
                .doc(item.id)
                .get();

            return itemDoc.exists
                ? { id: itemDoc.id, ...itemDoc.data() }
                : null;
        })
    );

    return items.filter(item => item !== null);
}

async function getItem(itemId) {
    const item = await db
        .collection("items")
        .doc(itemId)
        .get();

    return item.exists
        ? { id: item.id, ...item.data() }
        : null;
}



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



async function getUserPowers(uid) {
    const userPowers = await db
        .collection("users")
        .doc(uid)
        .collection("power")
        .get();

    const powers = await Promise.all(
        userPowers.docs.map(async (power) => {
            const powerDoc = await db
                .collection("powers")
                .doc(power.id)
                .get();

            return powerDoc.exists
                ? { id: powerDoc.id, ...powerDoc.data() }
                : null;
        })
    );

    return powers.filter(power => power !== null);
}

async function getPower(powerId) {
    const power = await db
        .collection("powers")
        .doc(powerId)
        .get();

    return power.exists
        ? { id: power.id, ...power.data() }
        : null;
}