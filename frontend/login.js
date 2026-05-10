document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch("../backend/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.status === "ok") {
            window.location.href = "DinoChrome.html";
        } else {
            errorMessage.textContent = data.error || "Error de login";
        }
    } catch (error) {
        errorMessage.textContent = "No se pudo conectar con el servidor";
    }
});