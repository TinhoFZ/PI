async function loadMyQuests() {

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

        const container =
            document.getElementById(
                "questList"
            );

        container.innerHTML = "";

        quests.forEach(quest => {

            const card =
                document.createElement("div");

            card.innerHTML = `
                <h3>${quest.name}</h3>

                <p>
                    ${quest.description}
                </p>

                <p>
                    Status:
                    ${
                        quest.completed
                        ? "Concluída"
                        : "Em andamento"
                    }
                </p>

                ${
                    !quest.completed
                    ?
                    `
                    <button
                        onclick="
                            completeQuest(
                                ${quest.quest_id}
                            )
                        "
                    >
                        Concluir
                    </button>
                    `
                    :
                    ""
                }
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

    }
}

window.completeQuest =
async function(questId) {

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

        loadMyQuests();

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao concluir quest"
        );

    }
};

loadMyQuests();