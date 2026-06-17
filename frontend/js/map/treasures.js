async function loadTreasures() {

    const token =
        localStorage.getItem("token");

    const [treasuresResponse, myTreasuresResponse] =
        await Promise.all([
            fetch(`${API_URL}/treasures`),
            fetch(
                `${API_URL}/treasures/my-treasures`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )
        ]);

    const treasures =
        await treasuresResponse.json();

    const myTreasures =
        await myTreasuresResponse.json();

    const collectedIds =
        myTreasures.map(
            treasure => treasure.treasure_id
        );

    treasures
        .filter(
            treasure =>
                !collectedIds.includes(
                    treasure.treasure_id
                )
        )
        .forEach(treasure => {

            const marker = L.marker(
                treasure.coordinate,
                {
                    icon: treasureIcon
                }
            ).addTo(map);

            marker.bindPopup(`
                <h3>${treasure.name}</h3>
                <p>${treasure.description}</p>

                <button
                    onclick="
                        collectTreasure(
                            ${treasure.treasure_id}
                        )
                    "
                >
                    Coletar
                </button>
            `);

            treasureMarkers[
                treasure.treasure_id
            ] = marker;

        });
}