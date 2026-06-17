async function loadLocations() {

    try {

        const response = await fetch(
            `${API_URL}/locations`
        );

        const locations =
            await response.json();

        locations
            .filter(
                location =>
                    location.type !== "treasure"
            )
            .forEach(location => {

                const marker = L.marker(
                    location.coordinate
                ).addTo(map);

                if (
                    location.type === "quest" &&
                    location.quest_id
                ) {

                    marker.bindPopup(`
                        <h3>${location.name}</h3>
                        <p>${location.description}</p>

                        <button
                            onclick="acceptQuest(${location.quest_id})"
                        >
                            Aceitar Quest
                        </button>
                    `);

                } else {

                    marker.bindPopup(`
                        <h3>${location.name}</h3>
                        <p>${location.description}</p>
                        <p>Tipo: ${location.type}</p>
                    `);

                }

            });

    } catch (error) {

        console.error(
            "Erro ao carregar locations:",
            error
        );

    }
}