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
