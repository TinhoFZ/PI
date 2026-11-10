async function getZonesInBounds(bounds) {
    const snapshot = await db.collection("zones")
        .where("minLat", "<=", bounds.north)
        .where("maxLat", ">=", bounds.south)
        .where("minLng", "<=", bounds.east)
        .where("maxLng", ">=", bounds.west)
        .get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}