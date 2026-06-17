const questList = document.getElementById("questList");

async function loadQuestPanel() {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/quests/my-quests`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const quests =
            await response.json();

        questList.innerHTML = "";

        quests
            .filter(q => !q.completed)
            .forEach(quest => {

                const div =
                    document.createElement("div");

                div.className =
                    "quest-item";

                div.innerHTML = `
                    <h4>${quest.name}</h4>
                    <p>${quest.description}</p>

                    <button onclick="completeQuest(${quest.quest_id})">
                        Concluir
                    </button>
                `;

                questList.appendChild(div);

            });

    } catch (error) {
        console.error("Erro ao carregar painel de quests:", error);
    }
}

window.completeQuest = async function (questId) {

    try {

        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/quests/${questId}/complete`,
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

        loadQuestPanel(); // atualiza painel

    } catch (error) {

        console.error(error);

        alert("Erro ao concluir quest");

    }
};