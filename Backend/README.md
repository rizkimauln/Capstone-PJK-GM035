# CareerPath AI - Backend API

Repositori ini berisi kode *Backend* berbasis **FastAPI** untuk aplikasi CareerPath AI. Backend ini berfungsi sebagai mesin pemrosesan (*inference engine*) yang melayani permintaan dari *Frontend* (React) untuk mencocokkan *skill* pengguna dengan standar industri menggunakan model *Machine Learning* (TF-IDF & Cosine Similarity).

## 🚀 Fitur Utama
- Memuat model ML (`.pkl`) dan dataset ke dalam memori (RAM) saat *startup* menggunakan fitur *lifespan*, sehingga respon API sangat cepat (tidak ada baca/tulis ke *disk* saat *request* masuk).
- Endpoint terintegrasi untuk menyuplai daftar *dropdown* statis ke Frontend.
- Menghasilkan rekomendasi otomatis beserta metrik kemiripan (*similarity score*) keahlian IT.

## 🛠️ Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal Python (minimal versi 3.9+) di sistem Anda. Disarankan untuk menggunakan *Virtual Environment* (venv).

## 📦 Instalasi & Cara Menjalankan
Ikuti langkah-langkah berikut untuk menjalankan server secara lokal:

1. Buka terminal dan arahkan ke folder `Backend`:
   ```bash
   cd Backend
   ```
2. Instal semua dependensi yang dibutuhkan:
   ```bash
   pip install -r requirements.txt
   ```
3. Jalankan server FastAPI menggunakan *uvicorn*:
   ```bash
   uvicorn main:app --reload
   ```
4. Server akan berjalan secara *default* pada alamat `http://localhost:8000`.

## 📖 Dokumentasi Endpoint API

FastAPI menyediakan dokumentasi interaktif bawaan. Setelah server berjalan, Anda dapat langsung menguji setiap rute (*endpoint*) API melalui browser pada tautan berikut:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs) *(Direkomendasikan untuk uji coba instan)*
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 1. Ambil Opsi Dropdown
- **Endpoint**: `GET /api/options`
- **Fungsi**: Mengembalikan daftar pekerjaan (*roles*) dan keahlian (*skills*) untuk ditampilkan di form interaktif Frontend.
- **Respons Sukses (200 OK)**:
  ```json
  {
    "roles": ["Data Scientist", "DevOps Engineer", "..."],
    "skills": ["python", "sql", "aws", "..."]
  }
  ```

### 2. Dapatkan Rekomendasi Roadmap
- **Endpoint**: `POST /api/recommend`
- **Fungsi**: Memproses input pengguna menggunakan AI untuk menemukan *Skill Gap* dan merekomendasikan video pembelajaran.
- **Body Request (JSON)**:
  ```json
  {
    "current_skills": ["python", "sql"],
    "target_role": "Data Scientist"
  }
  ```
- **Respons Sukses (200 OK)**:
  ```json
  {
    "target_role": "Data Scientist",
    "similarity_score": 45.32,
    "missing_skills": [
      {
        "skill": "machine learning",
        "link": "https://youtube.com/..."
      },
      {
        "skill": "statistics",
        "link": "https://youtube.com/..."
      }
    ]
  }
  ```

## 📂 Peringatan Struktur File
Script `main.py` di-desain untuk mencari file model (`.pkl`) dan dataset (`.csv`) di dalam folder bernama `Model` yang posisinya berada satu tingkat (level) **di atas** folder `Backend`. Pastikan folder `Model` tidak terhapus atau dipindahkan agar Backend dapat menyala tanpa error.
