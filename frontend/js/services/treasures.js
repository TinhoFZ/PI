const treasureMarkers = {};

window.collectTreasure = async function(treasureId) {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/treasures/${treasureId}/collect`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
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