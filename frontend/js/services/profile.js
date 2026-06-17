const email = document.querySelector('.profile-email');
const name = document.querySelector('.profile-name');

const xp = document.querySelector('#xp-text');
const level = document.querySelector('#level-text');
const quest = document.querySelector('#quest-text');
const treasure = document.querySelector('#treasure-text');

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

    } catch(error) {
        console.error(error);
    }
}