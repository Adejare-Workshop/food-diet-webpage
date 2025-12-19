const API_URL = "https://your-huggingface-space.hf.space";

// --- 1. SESSION MANAGEMENT ---
const saveUser = (id) => localStorage.setItem('fitness_user_id', id);
const getUserId = () => localStorage.getItem('fitness_user_id');

// --- 2. TIME-BASED WORKOUTS (Requirement 5) ---
function checkWorkoutWindow() {
    const hour = new Date().getHours();
    const workoutDiv = document.getElementById('workout-status');
    if (!workoutDiv) return;

    if (hour >= 7 && hour < 9) {
        workoutDiv.innerHTML = "🏃 <span class='gold-text'>ACTIVE:</span> Morning Session (7am-9am)";
    } else {
        workoutDiv.innerHTML = "🌙 REST: Next session at 07:00 AM";
    }
}

// --- 3. FOOD ANALYSIS (Requirement 10) ---
async function analyzeFoodImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', getUserId());

    const res = await fetch(`${API_URL}/analyze-food`, { method: 'POST', body: formData });
    const data = await res.json();
    
    document.getElementById('cal-result').innerText = `${data.calories_detected} kcal`;
    document.getElementById('portion-status').innerText = data.portion_status;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    checkWorkoutWindow();
    setInterval(checkWorkoutWindow, 60000);
});
// GLOBAL STATE
const AppState = {
    user: JSON.parse(localStorage.getItem('user_data')) || null,
    isWorkoutWindow: false,
    dailyGoal: 2500,
    currentCals: 0
};

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', () => {
    updateWorkoutStatus();
    animateGradients();
    setupImagePreview();
});

// TIME LOGIC: Requirement 5 (7-9 AM Window)
function updateWorkoutStatus() {
    const hour = new Date().getHours();
    const statusEl = document.getElementById('workout-status');
    const isWindow = hour >= 7 && hour < 9;
    
    if (statusEl) {
        statusEl.innerHTML = isWindow 
            ? `<div class="pulse-gold">●</div> LIVE: Morning Grind (7am-9am)`
            : `Next Session at 07:00 AM`;
        statusEl.className = isWindow ? 'status-active' : 'status-idle';
    }
}

// AI VISION INTEGRATION: Requirement 10
async function processFoodAI(input) {
    const file = input.files[0];
    const preview = document.getElementById('food-preview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
        
        // Trigger API Call (Placeholder for your HF URL)
        console.log("Analyzing food structure...");
        // await fetch(...)
    }
}
