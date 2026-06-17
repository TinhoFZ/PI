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
    console.error
);