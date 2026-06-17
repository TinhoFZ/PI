async function loadTreasures() {

    try {

        const response = await fetch(
            `${API_URL}/treasures`
        );

        const treasures =
            await response.json();

        treasures.forEach(treasure => {

            const marker = L.marker(
                treasure.coordinate
            ).addTo(map);

            marker.bindPopup(`
                <h3>${treasure.name}</h3>
                <p>${treasure.description}</p>

                <button
                    onclick="collectTreasure(${treasure.treasure_id})"
                >
                    Coletar
                </button>
            `);

            treasureMarkers[
                treasure.treasure_id
            ] = marker;

        });

    } catch (error) {

        console.error(
            "Erro ao carregar tesouros:",
            error
        );

    }
}