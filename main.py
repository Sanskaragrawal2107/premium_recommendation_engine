from contextlib import asynccontextmanager
from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict, Field, StrictFloat, StrictInt


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "bajaj_xgboost_model.pkl"
LABEL_ENCODER_PATH = BASE_DIR / "bajaj_label_encoder.pkl"
MODEL_COLUMNS_PATH = BASE_DIR / "model_columns.pkl"

CATEGORICAL_COLUMNS = ["sex", "smoker", "city_tier", "diabetes", "blood_pressure"]


class CustomerInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    age: StrictInt = Field(...)
    sex: Literal["male", "female"]
    bmi: StrictFloat = Field(...)
    smoker: Literal["yes", "no"]
    city_tier: Literal["Tier 1", "Tier 2", "Tier 3"]
    diabetes: Literal["Yes", "No"]
    blood_pressure: Literal["Normal", "High"]
    total_family_members: StrictInt = Field(...)
    max_family_age: StrictInt = Field(...)


def load_artifacts() -> dict:
    model = joblib.load(MODEL_PATH)
    label_encoder = joblib.load(LABEL_ENCODER_PATH)
    model_columns = joblib.load(MODEL_COLUMNS_PATH)

    return {
        "model": model,
        "label_encoder": label_encoder,
        "model_columns": list(model_columns),
    }


def preprocess_customer_input(payload: CustomerInput, model_columns: list[str]) -> pd.DataFrame:
    raw_frame = pd.DataFrame([payload.model_dump()])
    encoded_frame = pd.get_dummies(raw_frame, columns=CATEGORICAL_COLUMNS, drop_first=True)
    aligned_frame = encoded_frame.reindex(columns=model_columns, fill_value=0)
    return aligned_frame


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.artifacts = load_artifacts()
    yield


app = FastAPI(
    title="Bajaj Allianz Health Insurance Recommendation Engine",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/predict")
def predict(customer: CustomerInput) -> dict:
    artifacts = app.state.artifacts
    model = artifacts["model"]
    label_encoder = artifacts["label_encoder"]
    model_columns = artifacts["model_columns"]

    features = preprocess_customer_input(customer, model_columns)

    try:
        prediction_index = model.predict(features)[0]
        recommended_plan = label_encoder.inverse_transform([prediction_index])[0]
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Prediction failed") from exc

    return {"recommended_plan": recommended_plan}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
