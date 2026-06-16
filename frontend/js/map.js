const API_URL = "http://localhost:3000";

const map = L.map("map").setView(
    [-8.0476, -34.8770],
    13
);

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

    const response = await fetch(
        `${API_URL}/zones`
    );

    const zones = await response.json();

    zones.forEach(zone => {

        L.polygon(zone.geometry, {
            color: "purple"
        })
        .addTo(map)
        .bindPopup(zone.name);

    });
}

async function loadTreasures() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/treasures`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    const treasures =
        await response.json();

    treasures.forEach(treasure => {

        L.marker(treasure.coordinate)
            .addTo(map)
            .bindPopup(
                treasure.name
            );

    });
}

loadZones();
loadTreasures();