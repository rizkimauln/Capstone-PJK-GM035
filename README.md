# CAPAI - Career Path Artificial Intelligence Roadmap

CAPAI adalah aplikasi cerdas yang membantu mahasiswa dan profesional untuk memetakan alur belajar (roadmap) mereka, mengevaluasi kemampuan teknis secara dinamis, dan bersiap menuju peran spesifik di industri teknologi. 

Proyek ini merupakan hasil Capstone Project (PJK-GM035) yang diimplementasikan menggunakan arsitektur *Monorepo Full-Stack* yang terdiri dari:
1. **Frontend**: Antarmuka pengguna interaktif menggunakan React, Vite, dan Tailwind CSS.
2. **Backend**: Sistem manajemen data dan otentikasi menggunakan framework Laravel 12 dan MySQL.
3. **AI-Service**: Layanan rekomendasi cerdas (berbasis Python dan FastAPI) untuk menganalisis kecocokan keterampilan (Skill Gap Analysis).

---

## Prasyarat Sistem

Sebelum memulai instalasi, pastikan sistem Anda telah terpasang perangkat lunak berikut:
- **Node.js** (v18 atau lebih baru) dan **npm**
- **PHP** (v8.2 atau lebih baru) dan **Composer**
- **Python** (v3.10 atau lebih baru) dan **pip**
- **MySQL Server** (bisa menggunakan XAMPP, Laragon, dsb.)
- **Git**

---

## Panduan Instalasi & Penyiapan

Ikuti langkah-langkah di bawah ini secara berurutan untuk menjalankan keseluruhan ekosistem aplikasi di komputer lokal Anda.

### 1. Kloning Repositori
```bash
git clone https://github.com/username/capstone-pjk-gm035.git
cd capstone-pjk-gm035
```

### 2. Penyiapan Database
1. Buka aplikasi database manager Anda (misalnya `phpMyAdmin` atau terminal MySQL).
2. Buat sebuah database kosong baru bernama **`capairoadmap`**.

### 3. Penyiapan AI-Service (Python / FastAPI)
Layanan AI ini berjalan di port **8000**.
```bash
# Masuk ke direktori AI-Service
cd AI-Service

# (Opsional) Buat Virtual Environment
python -m venv venv
venv\Scripts\activate  # Untuk Windows

# Instal dependensi
pip install -r requirements.txt

# Jalankan server
uvicorn main:app --reload
```
*Biarkan terminal ini tetap terbuka.*

### 4. Penyiapan Backend (Laravel 12)
Sistem *backend* ini berjalan di port **8001** agar tidak berbenturan dengan AI-Service.
```bash
# Buka terminal baru dan masuk ke direktori Backend
cd Web-App/Backend

# Instal dependensi PHP
composer install

# Siapkan file konfigurasi environment
cp .env.example .env

# Buka file .env dan sesuaikan konfigurasi database Anda menjadi seperti ini:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=capairoadmap
# DB_USERNAME=root
# DB_PASSWORD=

# Generate Application Key
php artisan key:generate

# Migrasi tabel ke database MySQL (pastikan database 'capairoadmap' sudah dibuat)
php artisan migrate

# Jalankan server Laravel pada port 8001
php artisan serve --port=8001
```
*Biarkan terminal ini tetap terbuka.*

### 5. Penyiapan Frontend (React + Vite)
Sistem antarmuka ini berjalan di port **5173** (Bawaan Vite).
```bash
# Buka terminal baru dan masuk ke direktori Frontend
cd Web-App/Frontend

# Instal dependensi Node.js
npm install

# Siapkan file konfigurasi environment
cp .env.example .env

# Jalankan development server
npm run dev
```

---

## Petunjuk Penggunaan

1. Buka browser Anda dan akses aplikasi Frontend di **`http://localhost:5173`**.
2. **Pilih Karir**: Pada halaman utama, pilih *Target Spesialisasi Karier* yang Anda inginkan (misalnya *Data Scientist*).
3. **Input Skill**: Pilih keterampilan/modul apa saja yang sudah Anda kuasai saat ini.
4. **Analisis AI**: Klik tombol "Analisis Kesesuaian Karier". Sistem Frontend akan menggunakan *AI-Service* untuk mengukur *Similarity Score* dan memberikan rekomendasi modul apa saja yang masih perlu dipelajari (*Missing Skills*).
5. **Simpan Progres (Opsional)**: Aplikasi ini dapat digunakan tanpa harus memiliki akun. Namun, jika Anda ingin menyimpan hasil analisis secara permanen dan melacak kemajuan belajar (mencentang modul yang diselesaikan), Anda wajib melakukan *Login* atau *Daftar Akun* dengan mengklik **"Simpan Analisis"** atau tombol masuk di sudut kanan atas.
6. **Pantau Riwayat**: Setelah masuk, Anda dapat memperbarui progres dan melihat kembali riwayat analisis Anda kapan saja melalui menu "Progres Tersimpan" di bawah nama profil Anda.

---

## Informasi Penting Lainnya

- **Keamanan (CORS & Token)**: Laravel Backend telah dikonfigurasi menggunakan **Laravel Sanctum** untuk menangani *Bearer Token API*. 
- **Arsitektur Port**: 
  - `8000`: Digunakan secara eksklusif untuk algoritma *Machine Learning / AI* (FastAPI).
  - `8001`: Digunakan untuk *Database & Authentication Gateway* (Laravel).
  - `5173`: Lingkungan pengembangan antarmuka (Vite React).
- **Pengembangan Lanjutan**: Jika Anda ingin menambah fitur AI, letakkan model cerdas (misal: file `.pkl` atau model *Tensorflow*) di dalam subfolder direktori `AI-Service`. Jika mengubah struktur tabel *user*, edit file *migration* di dalam direktori `Web-App/Backend/database/migrations`.

---
*Dibuat oleh Tim Capstone PJK-GM035 (Pijak in collaboration with IBM SkillsBuild).*
