const BACKEND_URL = "https://adejareworkstudio-fitness-nigerian-app-backend.hf.space";

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('weight', document.getElementById('weight').value);
    formData.append('height', document.getElementById('height').value);
    formData.append('age', document.getElementById('age').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('goal', document.getElementById('goal').value);
    formData.append('medical_history', document.getElementById('medical').value);

    try {
        const response = await fetch(`${BACKEND_URL}/signup`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Account created successfully! Please login.");
            window.location.href = "login.html";
        } else {
            const error = await response.json();
            alert("Error: " + error.detail);
        }
    } catch (err) {
        console.error("Connection failed", err);
        alert("Could not connect to the backend server.");
    }
});
