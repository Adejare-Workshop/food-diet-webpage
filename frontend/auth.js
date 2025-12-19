const BACKEND_URL = "https://your-space.hf.space";

document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const payload = {
        username: document.getElementById('username').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        medical: document.getElementById('medical').value,
        goal: document.getElementById('goal').value
    };

    const response = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if(response.ok) window.location.href = 'login.html';
});
