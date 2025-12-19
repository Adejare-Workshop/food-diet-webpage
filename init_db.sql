-- 1. Users & Medical Profiles
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    height_cm REAL,
    weight_kg REAL,
    bmi REAL,
    medical_data TEXT,        -- Requirement 7 (Medical info)
    daily_limit INTEGER,      -- Requirement 10 (Set by BMI)
    goal TEXT                 -- Requirement 6 (e.g., 'weight_reduction')
);

-- 2. Daily Food & Calorie Logs
CREATE TABLE food_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    food_name TEXT,
    calories_detected INTEGER, -- From your AI Model
    portion_status TEXT,       -- Requirement 8 (Too much/Sufficient)
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

-- 3. Workout Tracking
CREATE TABLE workout_logs (
    workout_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    start_time TEXT,           -- Requirement 5 (7:00 - 9:00)
    duration_minutes INTEGER,
    date DATE,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);
