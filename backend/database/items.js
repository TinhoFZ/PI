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