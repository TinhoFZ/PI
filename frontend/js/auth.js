const token = localStorage.getItem("token");

if (!token) {
    console.log("Sem token, redirecionando...");
    window.location.href = "login.html";
}