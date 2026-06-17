const API_URL = "http://localhost:3000";

const map = L.map("map").setView(
    [-8.0476, -34.8770],
    13
);

const treasureMarkers = {};

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

navigator.geolocation.getCurrentPosition(
    (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        map.setView(
            [lat, lng],
            16
        );

        L.marker([lat, lng])
            .addTo(map)
            .bindPopup("Você está aqui");

    },
    (error) => {
        console.error(error);
    }
);

async function loadZones() {

    try {

        const response = await fetch(
            `${API_URL}/zones`
        );

        const zones = await response.json();

        zones.forEach(zone => {

            L.polygon(zone.geometry, {
                color: "purple"
            })
            .addTo(map)
            .bindPopup(`
                <h3>${zone.name}</h3>
                <p>${zone.description}</p>
                <p>Tesouros: ${zone.treasure_count}</p>
            `);

        });

    } catch (error) {

        console.error(
            "Erro ao carregar zonas:",
            error
        );

    }
}

async function loadLocations() {

    try {

        const response = await fetch(
            `${API_URL}/locations`
        );

        const locations = await response.json();

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

window.collectTreasure = async function(treasureId) {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/treasures/${treasureId}/collect`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        if (!response.ok) {

            alert(
                data.message ||
                "Erro ao coletar tesouro"
            );

            return;
        }

        alert(data.message);

        const marker =
            treasureMarkers[treasureId];

        if (marker) {

            map.removeLayer(marker);

            delete treasureMarkers[
                treasureId
            ];

        }

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao coletar tesouro"
        );

    }
};

window.acceptQuest = async function(questId) {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/quests/${questId}/accept`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        alert(data.message);

    } catch (error) {

        console.error(error);

        alert("Erro ao aceitar quest");

    }
};

loadZones();
loadLocations();
loadTreasures();

window.acceptQuest = async function(questId) {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/quests/${questId}/accept`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        alert(data.message);

    } catch (error) {

        console.error(error);

        alert("Erro ao aceitar quest");

    }
};