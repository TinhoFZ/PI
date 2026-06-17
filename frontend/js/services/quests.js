window.acceptQuest = async function(questId) {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/quests/${questId}/accept`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        alert(data.message);

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao aceitar quest"
        );

    }
};