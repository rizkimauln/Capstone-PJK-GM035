from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import os

# Tempat penyimpanan global untuk model ML dan dataset
ml_models: Dict[str, Any] = {}
app_data: Dict[str, Any] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load semua file PKL dan CSV saat server pertama kali berjalan
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_dir = os.path.join(base_dir, "Model")
    
    try:
        # Load ML Models dari folder Model
        ml_models["vectorizer"] = joblib.load(os.path.join(model_dir, "tfidf_vectorizer.pkl"))
        ml_models["job_vectors"] = joblib.load(os.path.join(model_dir, "job_vectors.pkl"))
        
        # Load Data CSV dari folder Model
        app_data["df_jobs"] = pd.read_csv(os.path.join(model_dir, "IT_Job_Roles_Skills_Clean.csv"))
        df_dict = pd.read_csv(os.path.join(model_dir, "Skill_Dictionary.csv"))
        
        # Buat dictionary map untuk mempermudah pencarian link YouTube
        app_data["skill_links"] = dict(zip(df_dict['Skills'].str.lower(), df_dict['Link Youtube']))
        print("✅ Models and datasets loaded successfully.")
    except Exception as e:
        print(f"❌ Error loading assets: {e}")
    
    yield
    
    # Hapus model dari memori saat server dimatikan
    ml_models.clear()
    app_data.clear()

app = FastAPI(title="CareerPath AI API", lifespan=lifespan)

# Konfigurasi CORS agar bisa diakses oleh Frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Ganti dengan domain frontend saat deploy ke production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schema validasi untuk format input JSON
class RecommendationRequest(BaseModel):
    current_skills: List[str]
    target_role: str

@app.get("/api/options")
def get_form_options():
    """Mengembalikan daftar roles dan skills untuk mengisi dropdown di Frontend."""
    df_jobs = app_data.get("df_jobs")
    skill_links = app_data.get("skill_links")
    
    if df_jobs is None or not skill_links:
        raise HTTPException(status_code=500, detail="Data not loaded yet.")
        
    roles = df_jobs['Job Title'].tolist()
    skills = list(skill_links.keys())
    return {"roles": roles, "skills": skills}

@app.post("/api/recommend")
def recommend_path(request: RecommendationRequest):
    """Menerima input skill dan target pekerjaan, mengembalikan Similarity Score dan rekomendasi belajar."""
    vectorizer = ml_models.get("vectorizer")
    job_vectors = ml_models.get("job_vectors")
    df_jobs = app_data.get("df_jobs")
    skill_links = app_data.get("skill_links")
    
    if None in (vectorizer, job_vectors, df_jobs, skill_links):
        raise HTTPException(status_code=500, detail="Models not loaded yet.")
        
    current_skills = [skill.lower().strip() for skill in request.current_skills]
    target_role_lower = request.target_role.strip().lower()
    
    # Cek apakah Role ada di database
    role_idx = df_jobs.index[df_jobs['Job Title'].str.lower() == target_role_lower].tolist()
    if not role_idx:
        raise HTTPException(status_code=404, detail=f"Role '{request.target_role}' not found.")
    
    idx = role_idx[0]
    role_data = df_jobs.iloc[idx]
    
    target_skills = [skill.strip().lower() for skill in role_data['Skills'].split(',')]
    
    # Kalkulasi Cosine Similarity Score
    user_skills_str = ", ".join(current_skills)
    user_vector = vectorizer.transform([user_skills_str])
    target_vector = job_vectors[idx]
    
    similarity_score = cosine_similarity(user_vector, target_vector)[0][0]
    
    # Ekstraksi Skill Gap
    skill_gap = [skill for skill in target_skills if skill not in current_skills]
    
    # Pemetaan Skill Gap ke link YouTube
    recommendations = [{"skill": skill, "link": skill_links.get(skill, "Link not available")} for skill in skill_gap]
        
    return {
        "target_role": role_data['Job Title'],
        "similarity_score": round(similarity_score * 100, 2), # Dikali 100 untuk format persentase
        "missing_skills": recommendations
    }
