Health Insurance Recommendation System for Bajaj Allianz
A personalized recommendation engine that suggests the best Bajaj health insurance plan based on customer profile.
Project Overview
Built a smart recommendation system that takes basic customer information (age, BMI, smoking habit, number of children, region) and automatically recommends the most suitable Bajaj Allianz health insurance plan from 7 popular plans.
This project demonstrates real-world application of data science in the health insurance industry — combining rule-based logic with machine learning for accurate and explainable recommendations.
Bajaj Plans Covered

Health Guard
Extra Care
Health Care Supreme
Tax Gain
Critical Illness
Senior Citizen Plan
Hospital Cash Daily Allowance

Dataset Used

Medical Cost Personal Datasets (Kaggle)
1,338 records
Features: age, sex, bmi, children, smoker, region, charges

Approach

Rule-based Labeling: Mapped customers to Bajaj plans using domain logic based on age, risk (smoker + BMI), family size, and estimated premium (charges).
Machine Learning Model: Trained classification model to predict the best Bajaj plan.
Explainability: Added reasoning for why a particular plan is recommended.
Deployment: Streamlit web app for interactive recommendations.

Tech Stack

Python
Pandas, NumPy
Scikit-learn / XGBoost
Streamlit (for Web App)
Matplotlib / Seaborn
​
