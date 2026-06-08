# Dokumentasi Model AI (Career Path Recommendation)

Direktori `Model` ini berisi seluruh kumpulan data (dataset), *notebook* penelitian, algoritma prapemrosesan, serta artefak (*pickle files*) dari model Machine Learning utama yang digunakan untuk merekomendasikan peta jalan karier (Career Path) dan menganalisis kecocokan kompetensi (Skill Gap Analysis).

## Struktur Direktori

Berikut adalah rincian file yang terdapat di dalam folder ini:

### Notebooks (Jupyter Notebooks)
* **`Text_Preprocessing.ipynb`**
  Notebook yang berisi langkah-langkah untuk membersihkan data teks (NLP prapemrosesan) seperti *tokenization*, *stop-word removal*, dan pembersihan karakter khusus sebelum dimasukkan ke dalam model.
* **`Skill_Dictionary.ipynb`**
  Notebook yang bertanggung jawab untuk mengekstraksi, menstandardisasi, dan memetakan kamus kompetensi (*skill dictionary*). Algoritma ini memastikan tidak ada duplikasi *skill* dengan penamaan yang berbeda.
* **`CareerPath_Model.ipynb`**
  Notebook utama tempat model sistem rekomendasi dilatih. Berisi proses ekstraksi fitur (TF-IDF), kalkulasi kemiripan Cosine (*Cosine Similarity*), dan pembuatan artefak akhir model.

### Dataset (CSV Files)
* **`IT_Job_Roles_Skills.csv`**
  Kumpulan data mentah yang memetakan nama peran pekerjaan IT (Job Roles) beserta keahlian (Skills) yang dibutuhkan.
* **`IT_Job_Roles_Skills_Clean.csv`**
  Data bersih hasil prapemrosesan dari peran pekerjaan IT yang siap digunakan untuk ekstraksi fitur (TF-IDF).
* **`Skill_Dictionary_Mentah.csv`**
  Daftar mentah dari berbagai kompetensi yang ditemukan di lapangan sebelum distandardisasi.
* **`Skill_Dictionary.csv`**
  Kamus referensi final berisi kompetensi standar yang digunakan oleh *backend* dan AI-Service untuk memvalidasi *input* pengguna.

### Model Artifacts (Pickle Files)
File-file biner di bawah ini merupakan hasil *training* (pelatihan) model yang akan dimuat (di-*load*) oleh **AI-Service** (`main.py`) saat aplikasi dijalankan (Inference).
* **`tfidf_vectorizer.pkl`**
  Model TF-IDF (Term Frequency-Inverse Document Frequency) yang telah dilatih untuk mengubah teks kompetensi (teks pengguna) menjadi vektor angka (*numerical vectors*).
* **`job_vectors.pkl`**
  Matriks vektor pracetak (*pre-computed*) dari seluruh data peran pekerjaan IT di dalam dataset. Digunakan untuk mempercepat komputasi perbandingan kemiripan secara langsung saat pengguna mengirim permintaan (*request*).

---

## Alur Kerja (Workflow)
Jika Anda ingin melatih ulang (*retrain*) model dengan data baru, ikuti urutan berikut:
1. Perbarui data pada `IT_Job_Roles_Skills.csv` atau `Skill_Dictionary_Mentah.csv`.
2. Jalankan `Text_Preprocessing.ipynb` dan `Skill_Dictionary.ipynb` secara berurutan.
3. Jalankan keseluruhan sel pada `CareerPath_Model.ipynb`.
4. Pastikan file `.pkl` yang baru berhasil di-kesamping (di-*overwrite*) dan *restart* (mulai ulang) AI-Service agar memuat model yang baru.
