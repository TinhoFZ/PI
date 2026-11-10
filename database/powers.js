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