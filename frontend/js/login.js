const API_URL = "http://localhost:3000";

document
    .getElementById("loginForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const body = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        try {

            const response = await fetch(
                `${API_URL}/auth/login`,
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
                alert(data.message || "Login inválido");
                return;
            }

            localStorage.setItem(
                "token",
                data.token
            );

            window.location.href = "map.html";

        } catch {
            alert("Erro ao conectar com a API");
        }
    });