const email = document.querySelector('.profile-email');
const name = document.querySelector('.profile-name');

const xp = document.querySelector('#xp-text');
const level = document.querySelector('#level-text');
const quest = document.querySelector('#quest-text');
const treasure = document.querySelector('#treasure-text');

const xpCard = {
    xpLabel: document.querySelector('.xp-label'),
    xpValue: document.querySelector('.xp-value'),
    progressFill: document.querySelector('.progress-fill'),
    xpNextHint: document.querySelector('.xp-next-hint'),
    progressFooter: document.querySelector('.progress-footer')
}

const maxXp = 1000;

async function loadProfile() {

    try {
        const token = localStorage.getItem('token');

        const userResponse =       
            await fetch(
                `${API_URL}/me`,
                {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            )
    
        const questResponse =
            await fetch(
                `${API_URL}/quests/my-quests`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            )

        const treasureResponse = 
            await fetch(
                `${API_URL}/treasures/my-treasures`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            )

        const data = [await userResponse.json(), await questResponse.json(), await treasureResponse.json()];

        if (!userResponse.ok && questResponse.ok && treasureResponse.ok) {

            alert(
                data.message || "Erro ao carregar perfil"
            )

            return;
        }

        let completedQuests = 0;

        data[1].forEach(quest => {
            if(quest.completed === 1) {
                completedQuests++;
            }
        });

        let collectedTreasures = 0;

        data[2].forEach(treasure => {
            collectedTreasures++;
        })

        email.innerText = data[0].email;
        name.innerText = data[0].name;

        xp.children[0].innerText = data[0].xp;
        level.children[0].innerText = data[0].level;
        quest.children[0].innerText = completedQuests;
        treasure.children[0].innerText = collectedTreasures;

        xpCard.xpLabel.innerText = `Progresso para o Nível ${data[0].level + 1}`;
        xpCard.xpValue.innerText = `${data[0].xp}/${maxXp}`
        xpCard.xpNextHint.innerText = `✦ Faltam ${maxXp - data[0].xp} XP para subir de nível. Continue explorando!`;
        xpCard.progressFooter.children[0].innerText = `Nível ${data[0].level}`;
        xpCard.progressFooter.children[1].innerText = `${(data[0].xp / maxXp) * 100}% concluído`
        xpCard.progressFooter.children[2].innerText = `Nível ${data[0].level + 1}`;

    } catch(error) {
        console.error(error);
    }
}