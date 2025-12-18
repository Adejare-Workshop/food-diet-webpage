# NaijaFit Fitness AI: Personalized Nutrition & Global Fitness

A sophisticated web application designed to help users achieve weight reduction through AI-powered Nigerian food recognition and personalized workout routines.

## 🚀 System Architecture
- **Frontend:** React/Tailwind CSS hosted on **Cloudflare Pages**.
- **Backend:** FastAPI (Python) hosted on **Hugging Face Spaces**.
- **Model:** PyTorch ResNet34 Multi-head model for food classification and portion estimation.
- **Database:** Automated daily logging to **Google Sheets**.

## 🛠️ Project Stages

### Stage 1: Computer Vision Model
A trained model capable of identifying common Nigerian dishes (Jollof, Amala, Egusi, etc.) and estimating portion weight to determine if a serving is "too much" or "sufficient" based on caloric density.

### Stage 2: Backend Logic (Hugging Face)
- **FastAPI Wrapper:** Handles model inference and BMI calculations.
- **Google Sheets Integration:** Uses Service Account credentials to append user metrics and daily food logs.
- **Dockerized Environment:** Custom `Dockerfile` optimized for Hugging Face hardware requirements (Port 7860).

### Stage 3: Modern UI (Cloudflare)
- **Cal AI Scanner:** Mobile-first camera interface for real-time food analysis.
- **Medical Profiler:** Dynamic BMI and BMR calculation using user-provided height and weight.
- **Global Fitness Hub:** Recommendation engine providing High-Intensity Interval Training (HIIT) and strength routines.

## 🕒 Features
- **Restricted Access:** Workout logging is only functional during the **07:00 - 09:00 AM** window.
- **Dietary Recommendations:** Real-time meal suggestions based on the time of day and the user’s metabolic needs.
- **Personalized Privacy:** Individual data is processed via secure API secrets to ensure medical history remains private.

## 📁 Repository Structure
```text
├── backend/
│   ├── app.py           # FastAPI Logic & Sheets Integration
│   ├── Dockerfile       # HF Deployment Config
│   └── requirements.txt # Python Dependencies
├── frontend/
│   ├── index.html       # Dashboard Structure
│   ├── style.css        # Custom UI Animations
│   └── script.js        # Workout Engine & Logic
├── model/
│   └── nigerian_food_model.pth # Trained Brain
└── README.md
