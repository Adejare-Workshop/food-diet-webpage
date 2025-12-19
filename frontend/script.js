// Global Workout Database
const WORKOUT_LEVELS = {
    LOW_IMPACT: [
        { name: "Walking Lunges", reps: "3x12", info: "Easy on joints" },
        { name: "Incline Pushups", reps: "3x10", info: "Chest & Arms" },
        { name: "Plank", reps: "3x30s", info: "Core stability" }
    ],
    FAT_BURN: [
        { name: "Burpees", reps: "4x12", info: "Maximum calories" },
        { name: "Mountain Climbers", reps: "4x45s", info: "Core & Cardio" },
        { name: "Bodyweight Squats", reps: "4x20", info: "Leg definition" }
    ],
    ATHLETIC: [
        { name: "HIIT Sprints", reps: "10 Intervals", info: "Peak metabolic rate" },
        { name: "Jump Squats", reps: "4x15", info: "Explosive power" },
        { name: "Diamond Pushups", reps: "4x12", info: "Muscle toning" }
    ]
};

// 1. Update Profile & Calculate Metrics
function updateHealthProfile() {
    const w = document.getElementById('weight').value;
    const h = document.getElementById('height').value;
    const meds = document.getElementById('med-history').value;

    if (!w || !h) return alert("Please enter weight and height");

    const bmi = (w / ((h/100) * (h/100))).toFixed(1);
    document.getElementById('bmi-display').innerText = bmi;
    document.getElementById('workout-section').classList.remove('hidden');

    // Recommend based on BMI
    let level = "FAT_BURN";
    if (bmi >= 30) level = "LOW_IMPACT";
    if (bmi < 24) level = "ATHLETIC";

    displayWorkouts(level);
    updateMealSuggestion();
    
    // Log initial data to backend (which sends to Google Sheets)
    logDataToBackend("Profile Created", { bmi, weight: w });
}

// 2. Display Exercises
function displayWorkouts(level) {
    const list = document.getElementById('exercise-list');
    list.innerHTML = "";
    WORKOUT_LEVELS[level].forEach(ex => {
        list.innerHTML += `
            <li class="bg-black/20 p-3 rounded-xl flex justify-between items-center border border-gray-800">
                <div>
                    <p class="font-bold text-sm">${ex.name}</p>
                    <p class="text-[10px] text-gray-500">${ex.info}</p>
                </div>
                <span class="text-green-500 font-mono font-bold">${ex.reps}</span>
            </li>
        `;
    });
}

// 3. Time-Based Logic (Workout Window & Meal Times)
function checkSystemTime() {
    const now = new Date();
    const hour = now.getHours();
    
    // Workout Window: 07:00 - 09:00
    const btn = document.getElementById('workout-btn');
    const pill = document.getElementById('status-pill');
    
    if (hour >= 7 && hour < 9) {
        btn.disabled = false;
        btn.classList.replace('bg-gray-800', 'bg-green-600');
        btn.classList.replace('text-gray-500', 'text-white');
        pill.classList.replace('bg-red-600', 'bg-green-600');
        pill.innerText = "WINDOW OPEN";
    }
}

function updateMealSuggestion() {
    const hour = new Date().getHours();
    let meal = "";
    if (hour < 11) meal = "Breakfast: Boiled Eggs & Sauteed Spinach";
    else if (hour < 16) meal = "Lunch: Grilled Fish & Large Green Salad";
    else meal = "Dinner: Light Pepper Soup (Chicken/Fish)";
    
    document.getElementById('meal-rec').innerText = meal;
}

// 4. Cal AI Scanner Integration
async function handleFoodScan(event) {
    const file = event.target.files[0];
    if (!file) return;

    alert("Cal AI is analyzing your Nigerian dish...");
    
    // Replace URL with your actual Hugging Face Space URL
    const HF_BACKEND = "https://adejareworkstudio-fitness-nigerian-app-backend.hf.space";
    
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(HF_BACKEND, { method: 'POST', body: formData });
        const data = await response.json();
        alert(`Analysis: ${data.dish_identified}\nCalories: ${data.calories}\nAdvice: ${data.action}`);
    } catch (err) {
        console.error("Scanner error:", err);
    }
}

// Initialize
setInterval(checkSystemTime, 60000);
checkSystemTime();
