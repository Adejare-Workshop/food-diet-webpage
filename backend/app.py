from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from datetime import datetime
import torch
import json

app = FastAPI()

# 1. User Profile & Medical Data Schema
class UserProfile(BaseModel):
    name: str
    weight: float  # in kg
    height: float  # in meters
    medical_history: str = "None"
    daily_cal_goal: float = 2000.0

# 2. Logic: BMI & Daily Limit Calculation
def get_user_metrics(profile: UserProfile):
    bmi = profile.weight / (profile.height ** 2)
    # Harris-Benedict Equation simplified for weight reduction
    base_calories = (10 * profile.weight) + (6.25 * profile.height * 100) - 500 
    return round(bmi, 2), round(base_calories, 2)

# 3. Logic: Nigerian Food Recommender (Time-Based)
def recommend_nigerian_dish(time_hr):
    if 5 <= time_hr < 11:
        return "Breakfast: Akara & Pap (Light) or Boiled Eggs"
    elif 11 <= time_hr < 16:
        return "Lunch: Bulgur Jollof with Grilled Croaker Fish"
    elif 16 <= time_hr < 20:
        return "Dinner: Garden Egg Stew with 1 slice of Yam"
    else:
        return "Late Night: Light Pepper Soup (Assorted) - Avoid heavy carbs"

# 4. Logic: Workout Window Check (7:00 - 9:00)
@app.get("/workout-status")
def check_workout_time():
    now = datetime.now().hour
    if 7 <= now < 9:
        return {"status": "Active", "message": "Time for your 7am-9am session!"}
    return {"status": "Closed", "message": "Workout sessions are only 7:00 - 9:00 AM"}

# 5. Integration: Cal AI Food Scanning
@app.post("/scan-food")
async def scan_food(file: UploadFile = File(...)):
    # Here we would load the 'nigerian_cal_ai_v1.pth' from Stage 1
    # For now, we return a mock response for the workflow
    return {
        "dish_identified": "Jollof Rice",
        "portion_status": "Too Much",
        "calories": 650,
        "action": "Reduce portion by 30% to meet your weight reduction goal."
    }

if __name__ == "__main__":
    import uvicorn
    # Hugging Face Spaces requires port 7860
    uvicorn.run(app, host="0.0.0.0", port=7860)
