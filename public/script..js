```javascript
const API_URL = "https://46nfpdrf8e.execute-api.ap-south-1.amazonaws.com/dev1";

// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        try {

            const response = await fetch(`${API_URL}/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            });

            const data = await response.json();

            console.log("Register response:", data);

            if (response.ok) {
                message.innerText = data.message || "Registered successfully";
            } else {
                message.innerText = data.message || "Registration failed";
            }

        } catch (error) {

            console.error("Registration Error:", error);

            message.innerText = "Registration failed";
        }

    });
}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        try {

            const response = await fetch(`${API_URL}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            });

            const data = await response.json();

            console.log("Login response:", data);

            if (response.ok) {
                message.innerText = data.message || "Login successful";
            } else {
                message.innerText = data.message || "Login failed";
            }

        } catch (error) {

            console.error("Login Error:", error);

            message.innerText = "Login failed";
        }

    });
}
```
