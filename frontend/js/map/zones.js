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