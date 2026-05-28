**Dokumen Project Plan**  
**Pijak in collaboration with IBM Skillsbuild**

**ID Tim Capstone Project	:** PJK-GM035

**Tema Capstone		:** AI for Smart Education

**Nama Proyek/Product	:** **CareerPath AI** (Roadmap & Learning Path Generator)

**List Anggota		:** 

1. APC222D6X0117 \- Rizka Aulia Fauziah \- **Aktif**  
2. APC222D6Y0129 \- Rizki Maulana \- **Aktif**  
3. APC222D6Y0414 \- Rahkly Arief Putranto \- **Aktif**  
4. APC222D6Y0421 \- Rifky Daffa Pratama \- **Aktif**  
     
1. **Ringkasan Eksekutif**

**Problem Statement:** Di era digital saat ini , pergerakan industri teknologi yang sangat pesat sering kali tidak sejalan dengan lambatnya pembaruan kurikulum di perguruan tinggi Indonesia , sehingga memicu skill-gap yang tajam. Kondisi ini menyebabkan banyak mahasiswa menghabiskan waktu mempelajari tech-stack kurang relevan , yang berdampak langsung pada menurunnya keterserapan tenaga kerja akibat ketidaksesuaian kualifikasi teknis 

**Research Questions:**

1. Bagaimana tingkat akurasi algoritma *Cosine Similarity* (berbasis pembobotan *TF-IDF*) dalam menghitung nilai kemiripan (*similarity score*) antara profil kompetensi pengguna dengan variasi kata kunci teknis pada dataset *job description* industri?  
2. Sejauh mana sistem mampu memetakan metrik *skill-gap* secara otomatis untuk menghasilkan rekomendasi jalur pembelajaran (*learning path*) yang tervalidasi presisi terhadap parameter *tech-stack* spesifik perusahaan?  
3. Bagaimana tingkat efektivitas fitur *Visual Roadmap* dan kurasi materi praktikal dalam membantu mahasiswa menentukan arah spesialisasi teknis, yang diukur berdasarkan pengujian interaksi pengguna (*User Acceptance Testing / Usability Testing*)?

**Latar Belakang & Solusi:** CareerPath AI adalah platform berbasis web yang dirancang sebagai "kompas karier" bagi mahasiswa Teknik Informatika guna menjembatani kesenjangan antara kurikulum akademis dengan kebutuhan dinamis industri teknologi. Melalui pemanfaatan kecerdasan buatan, platform ini bertujuan mengeliminasi kebingungan mahasiswa dalam memetakan spesialisasi teknis mereka.

Platform ini hadir untuk memproses data kompetensi pengguna untuk menghasilkan output aplikatif berupa **Visual Roadmap** beserta kurasi materi belajar praktikal yang terarah. Tim kami memilih proyek ini karena memiliki urgensi tinggi dalam menekan angka pengangguran lulusan TI melalui intervensi teknologi yang menyelaraskan profil mahasiswa dengan standar industri terkini secara *real-time*.

2. **Cakupan Proyek dan Hasil Kerja**

1. **Batasan Proyek** 

Untuk menjaga fokus dan memastikan ketercapaian proyek dalam fase Minimum Viable Product (MVP) selama durasi 5 minggu, tim menetapkan batasan-batasan berikut:

* **Fokus Bidang**: Platform dikhususkan untuk memetakan kualifikasi pada profesi spesifik di rumpun Teknologi Informasi (seperti Frontend, Backend, Data Analyst, dan DevOps).  
* **Metode Input:** Input pengguna dibatasi menggunakan Tag-based Dropdown untuk menghindari ambiguitas teks bebas dan memastikan data yang masuk ke dalam model bersih 100%.  
* **Data Sekunder (Industri):** Dataset kebutuhan industri bersifat statis dan merupakan dataset sekunder yang diakuisisi dari penyedia data publik (Kaggle). Sistem tidak melakukan web scraping real-time untuk menjaga stabilitas arsitektur MVP.  
* **Data Primer (Pembelajaran):** Rekomendasi materi pembelajaran dibangun menggunakan dataset primer hasil kurasi tim secara manual, berupa tautan eksternal publik yang berkualitas (Tautan Video YouTube).  
* **Teknologi AI:** Pendekatan difokuskan pada fondasi algoritma Natural Language Processing (NLP) klasik menggunakan vektorisasi TF-IDF dan metrik Cosine Similarity yang dibangun dari awal, tanpa menggunakan Large Language Models (LLM) komersial.  
* **Lingkungan Sistem:** Aplikasi PoC bersifat frictionless tanpa fitur autentikasi, dengan backend berbasis Python (FastAPI) dan frontend menggunakan React, serta di-deploy menggunakan kontainerisasi (Docker).

2. **Pembagian Tugas & Tanggung Jawab Tim**

| Peran Inti (AI) | Peran Tambahan | Tanggung Jawab |
| ----- | ----- | ----- |
| AI Data Engineer | UI/UX Designer | Mengumpulkan dataset sekunder (Kaggle), melakukan *Exploratory Data Analysis* (EDA), eksekusi *Text Preprocessing* dasar. Merancang *wireframe* dan *mockup* alur pengguna di Figma, serta menyusun aset visual untuk dokumentasi akhir. |
| AI NLP Engineer | Frontend Developer | Menyusun *Skill Dictionary*, melakukan *tokenization*, ekstraksi fitur teks, dan mengimplementasikan algoritma vektorisasi (TF-IDF). Membangun antarmuka web interaktif (React), membuat fitur input dropdown, dan memvisualisasikan Roadmap Timeline. |
| AI Modeling Engineer | Backend & Cloud Engineer | Mengembangkan matriks perhitungan *Cosine Similarity*, mengatur nilai batas (*threshold*), serta melatih dan mengekspor model. Membangun peladen FastAPI, merancang struktur JSON API, dan melakukan konfigurasi Docker untuk *deployment*. |
| AI Deployment Engineer | Content & QA Engineer | Mengevaluasi akurasi model, melakukan serialisasi (.pkl/.joblib), dan merancang skrip pembungkus model. Menyusun dataset primer (kurasi tautan belajar), serta melakukan pengujian fungsional sistem secara menyeluruh (*System Testing*). |

3. **Hasil Kerja**  
1) Dataset Terintegrasi: Kombinasi dataset sekunder industri dan dataset primer edukasi yang telah dibersihkan.  
2) Model AI NLP: Skrip algoritma TF-IDF dan Cosine Similarity yang telah dioptimasi.  
3) Aplikasi Web MVP: Platform CareerPath AI yang di-deploy secara publik dengan fungsi analisis skill-gap dan visualisasi roadmap.  
4) Dokumentasi Teknis: Laporan pengujian dan instruksi instalasi repositori.  
4. **Cakupan Mingguan**

| Waktu  | Fokus Kegiatan |
| :---: | ----- |
| Minggu 1 | Riset & Ekstraksi Data: Perumusan parameter skill IT, pengunduhan dataset Job Description dari Kaggle, serta ekstraksi dan penyusunan kamus keahlian (Skill Dictionary) sebagai fondasi database pencocokan. |
| Minggu 2 | Pemrosesan NLP & Pemodelan: Implementasi Text Preprocessing (pembersihan teks, tokenisasi), penulisan skrip vektorisasi menggunakan TF-IDF, dan pembuatan fungsi inti pencocokan (matching engine) berbasis Cosine Similarity. |
| Minggu 3 | Arsitektur Backend & API: Membungkus model NLP ke dalam arsitektur FastAPI, merancang skema komunikasi data (format Request/Response JSON), dan melakukan pengujian endpoint secara lokal. |
| Minggu 4 | Frontend & Kurasi Konten: Pengembangan antarmuka interaktif menggunakan React (termasuk fitur Tag-based Dropdown dan Timeline Roadmap), serta penyelesaian kurasi tautan materi belajar (YouTube) untuk dimasukkan ke sistem. |
| Minggu 5 | Testing, Deployment & Finalisasi: Pengujian integrasi End-to-End (System Testing), proses containerization aplikasi menggunakan Docker, penyusunan Laporan Akhir Capstone, dan persiapan demo akhir. |

3. **Jadwal Pengerjaan**

Periode pengerjaan proyek berlangsung selama 5 minggu (11 Mei \- 14 Juni 2026). Komunikasi harian dilakukan melalui Daily Standup secara asinkron setiap malam hari.

| Minggu ke- | Rentang Tanggal | Aktivitas Utama / Rincian Pekerjaan | Target Capaian |
| ----- | ----- | ----- | :---- |
| Minggu 1 | 11 – 17 Mei | Akuisisi dataset dari Kaggle, pembersihan data teks (preprocessing), dan pembuatan desain UI/UX di Figma | Dataset bersih & rancangan visual final. |
| Minggu 2 | 18 – 24 Mei | Pelatihan model ML (TF-IDF & Cosine Similarity) dan pembekuan model. | Model AI fungsional dan teruji. |
| Minggu 3 | 25 – 31 Mei | Pembangunan *server* Backend (FastAPI/Flask), integrasi model AI, dan perancangan *endpoint* API. | API aktif dan dapat diakses lokal. |
| Minggu 4 | 1 – 7 Juni | Pengembangan komponen Frontend di React, integrasi (fetching) data dari API, dan kurasi materi belajar. | Dashboard web terintegrasi dengan Backend. |
| Minggu 5 | 8 – 14 Juni | Implementasi visualisasi Roadmap, Deployment Ke Publik, pengujian menyeluruh, pembuatan Dokumentasi Teknis, dan Penyusunan Laporan Akhir | Produk MVP stabil, dokumentasi lengkap, & laporan final |

4. **Uraian Rencana Penugasan/*Job Desk* Setiap Learning Path**

| Nama Anggota | Peran | Job Desk |
| ----- | ----- | ----- |
| Rizka Aulia Fauziah | AI Data Engineer & UI/UX Designer | Mengumpulkan dataset Job Description khusus bidang IT dari Kaggle dan melakukan pembersihan teks (hapus stopword, keyword extraction) Melakukan Exploratory Data Analysis (EDA) dan visualisasi tren skill industri Merancang wireframe dan mockup lengkap di Figma untuk halaman form pelaporan dan dashboard |
| Rizki Maulana | AI NLP Engineer & Frontend Developer | Membangun arsitektur pemrosesan bahasa alami dengan mengubah teks menjadi representasi vektor numerik (TF-IDF) Membangun antarmuka aplikasi web yang bersih dan responsif menggunakan React. Mengimplementasikan komponen Tag-Based Searchable Dropdown dan merender data JSON menjadi komponen visual timeline roadmap |
| Rakhly Arief Putranto | AI Modeling Engineer, Backend & Cloud Engineer | Mengimplementasikan logika komparasi menggunakan algoritma Cosine Similarity untuk menghitung kedekatan profil user dengan Job Desc Membangun arsitektur RESTful API menggunakan FastAPI dan merancang skema komunikasi data JSON  Melakukan containerization seluruh sistem menggunakan Docker untuk menjaga konsistensi environment |
| Rifky Daffa Pratama | AI Deployment Engineer, Content, & QA Engineer | Membungkus model terlatih dalam endpoint API dan melakukan testing performa (akurasi dan kecepatan) Melakukan riset industri untuk menyusun database pemetaan skill manual berisi tautan GitHub dan YouTube berkualitas Melakukan pengujian sistem menyeluruh (System & Integration Testing) dan menyusun dokumentasi teknis akhir (README) |

5. **Sumber Daya Proyek**  
   Untuk mengembangkan platform CareerPath AI yang memenuhi kriteria *Minimum Viable Product* (MVP), tim akan memanfaatkan berbagai sumber daya teknis berikut. Setiap perangkat lunak dan arsitektur dipilih secara spesifik guna mengoptimalkan pemrosesan *Natural Language Processing* (NLP) sekaligus menghadirkan antarmuka web interaktif yang efisien.

**Bahasa Pemrograman**

* Python: Berfungsi sebagai bahasa pemrograman utama yang beroperasi secara komprehensif. Python digunakan untuk seluruh ekosistem komputasi, mencakup tahapan pengolahan data teks (*Text Preprocessing*), pelatihan model *Machine Learning*, hingga pembangunan arsitektur peladen API (*Backend*).

**Framework Utama**

* React (Frontend & UI): Diimplementasikan sebagai library/framework utama untuk membangun antarmuka web interaktif yang dinamis dan berbasis komponen (component-based).  
  React bertugas menangani antarmuka (User Interface), mengelola state untuk input spesifikasi keahlian dari pengguna, melakukan fetching data (request) ke backend via REST API, dan menyajikan visualisasi data Roadmap secara real-time dalam satu tampilan dashboard.  
* FastAPI / Flask (Backend & AI Inference): Bertindak sebagai *framework* peladen mandiri yang tangguh dan ringan untuk membangun arsitektur *RESTful API*. Pustaka ini berfungsi membungkus model AI (pada fase *inference*), memastikan sistem mampu memproses *request* teks dari antarmuka *frontend* dan mengembalikan *response* kalkulasi *skill-gap* dalam struktur data JSON yang presisi.

**Library Python (Machine Learning & Data Science)**

* Scikit-Learn: Pustaka komputasi utama yang diandalkan untuk membangun algoritma pencocokan teks secara mandiri (*from-scratch*, tanpa menggunakan layanan *AutoML*). Secara spesifik, modul TfidfVectorizer digunakan untuk proses ekstraksi bobot fitur teks, sedangkan matrix cosine similarity diimplementasikan untuk melakukan komparasi jarak matriks tekstual.  
* NLTK (Natural Language Toolkit): Pustaka esensial untuk pemrosesan bahasa alami pada fase *preprocessing*. Digunakan untuk menstandarisasi teks mentah pada silabus dan deskripsi pekerjaan melalui teknik *case folding*, penghapusan tanda baca, *tokenization*, dan eliminasi kata sambung (*stopword removal*).  
* Pandas: Pustaka fundamental untuk manipulasi dan analisis data tabular. Digunakan secara ekstensif pada fase *assessing*, *data cleaning* (penanganan baris data kosong), serta penggabungan dua entitas dataset yang berbeda ke dalam satu format CSV akhir yang terstruktur.  
* NumPy: Pustaka komputasi numerik berkinerja tinggi yang ditugaskan untuk mengeksekusi operasi *array* dan manipulasi matriks matematis kompleks yang dihasilkan dari proses vektorisasi TF-IDF.  
* Joblib/Pickle: Pustaka fungsional krusial untuk mengeksekusi proses *serialization*. Berfungsi untuk "membekukan" model *Machine Learning* pasca-pelatihan, memungkinkan peladen API untuk memuat model secara instan tanpa harus mengulangi proses *training* yang membebani komputasi peladen.

**Dataset & Referensi Kurikulum**

* Data Sekunder (Sumber Industri): Memanfaatkan himpunan data IT Job Postings yang diakuisisi dari platform Kaggle. Dataset ini berfungsi sebagai repositori informasi tekstual berskala besar untuk menganalisis dan memetakan kualifikasi teknis serta keahlian spesifik yang menjadi standar kebutuhan industri teknologi saat ini secara objektif.  
* Data Primer (Kurasi Edukasi): Berupa basis data hasil kurasi mandiri yang disusun secara terstruktur oleh tim pengembang. Data ini menghimpun kumpulan rekomendasi jalur pembelajaran praktikal, mencakup tautan video tutorial dari YouTube dan modul dokumentasi teknis dari GitHub yang diselaraskan dengan hasil analisis kualifikasi industri untuk memberikan panduan belajar yang tervalidasi.  
6. **Rencana Manajemen Risiko dan Isu**

Untuk memastikan proyek CareerPath AI berjalan sesuai jadwal (5 minggu) dan mencapai target Minimum Viable Product (MVP), tim telah mengidentifikasi potensi risiko teknis maupun manajerial. Kami menggunakan kerangka kerja identifikasi risiko berbasis dampak untuk menyusun strategi mitigasi (solusi) berikut:

| ID | Deskripsi Isu | Dampak | Strategi Mitigasi |
| :---: | ----- | :---: | ----- |
| R1 | Akurasi model sangat rendah akibat dataset Kaggle mengandung banyak kata deskriptif non-teknis (noise) yang mengaburkan hasil perhitungan jarak fitur. | Tinggi | Implementasi filtering ketat pada tahap pra-pemrosesan teks dengan hanya memperbolehkan ekstraksi bobot pada kata-kata yang telah diverifikasi dan masuk ke dalam Skill Dictionary buatan tim. |
| R2 | Keterlambatan pengerjaan akibat proses kurasi manual dataset primer (materi belajar) yang terlalu masif dan melebar ke teknologi niche. | Sedang | Fokus MVP hanya pada 4 target spesialisasi karier krusial. Jika pengguna mencari teknologi di luar target tersebut, sistem akan dialihkan pada pencarian materi general (fallback plan). |
| R3 | Aplikasi berhenti berjalan (crash) pada sisi pengguna akibat kegagalan komunikasi JSON antara peladen model (FastAPI) dan antarmuka web (React). | Tinggi | Penyelarasan kontrak data secara dini. Menggunakan pustaka Pydantic di backend untuk validasi struktur masukan yang ketat, serta mekanisme try-except block di lapisan antarmuka. |
| R4 | Keterbatasan Perangkat Keras (Hardware). Laptop anggota tim hang atau lambat saat melakukan training model NLP. | Sedang | Memindahkan seluruh proses komputasi berat ke platform cloud gratis seperti Google Colab, lalu mengunduh model final  ke lokal. |

