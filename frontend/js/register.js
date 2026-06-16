const API_URL = "http://localhost:3000";

document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const body = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        try {

            const response = await fetch(
                `${API_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Erro ao cadastrar");
                return;
            }

            alert("Usuário cadastrado!");

            window.location.href = "login.html";

        } catch {
            alert("Erro ao conectar com a API");
        }
    });