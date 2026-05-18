document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const messageBox = document.getElementById("register-message");

    if (password !== confirmPassword) {
        messageBox.textContent = "Las contraseñas no coinciden";
        return;
    }

    try {
        const response = await fetch("../backend/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        //api("register.php", 
        // { username:user.value,
        //   password: password.value}) 
        // });

        const data = await response.json();

        if (data.success) {
            messageBox.style.color = "#1f7a3f";
            messageBox.textContent = data.message || "Usuario registrado correctamente";
            setTimeout(() => {
                window.location.href = "../frontend/Index.html";
            }, 1200);
        } else {
            messageBox.style.color = "#c0392b";
            messageBox.textContent = data.message || "No se pudo registrar el usuario";
        }
    } catch (error) {
        messageBox.style.color = "#c0392b";
        messageBox.textContent = "No se pudo conectar con el servidor";
        //echo json_enconde($e->getMessage());
    }
});
