async function loadLocations() {

    try {

        const token =
            localStorage.getItem("token");

        const [
            locationsResponse,
            myQuestsResponse
        ] = await Promise.all([
            fetch(`${API_URL}/locations`),
            fetch(
                `${API_URL}/quests/my-quests`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )
        ]);

        const locations =
            await locationsResponse.json();

        const myQuests =
            await myQuestsResponse.json();
            
        const completedQuestIds =
            myQuests
            
                .filter(
                    quest => quest.completed
                )
                .map(
                    quest => quest.quest_id
                );

        locations
            .filter(
                location =>
                    location.type !== "treasure"
            )
            .forEach(location => {

                if (
                    location.type === "quest" &&
                    completedQuestIds.includes(
                        location.quest_id
                    )
                ) {
                    return;
                }

                let icon = defaultIcon;

                if (location.type === "quest") {
                    icon = questIcon;
                }

                const marker = L.marker(
                    location.coordinate,
                    { icon }
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