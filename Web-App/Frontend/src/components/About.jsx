import { ListChecks, Cpu, Check } from 'lucide-react';

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24 relative z-10">
      <div className="bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9FF66] rounded-full blur-[150px] opacity-10"></div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mengenal <span className="text-[#B9FF66]">CAPAI</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Platform cerdas untuk mengidentifikasi <i>skill</i> yang dibutuhkan pada peran profesi spesifik, menjembatani kesenjangan kompetensi, dan meningkatkan kesiapan talenta di dunia industri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Cara Kerja */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <ListChecks className="text-[#B9FF66]" size={24} /> Tata Cara Penggunaan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#B9FF66]/30 transition-colors">
                <div className="text-[#B9FF66] font-bold text-lg mb-2">01. Tentukan Peran</div>
                <p className="text-sm text-gray-400 leading-relaxed">Pilih target profesi yang ingin Anda tuju pada kolom input pertama (misal: Frontend Developer).</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#B9FF66]/30 transition-colors">
                <div className="text-[#B9FF66] font-bold text-lg mb-2">02. Input Kompetensi</div>
                <p className="text-sm text-gray-400 leading-relaxed">Masukkan daftar teknologi dan <i>skills</i> yang telah Anda kuasai ke dalam sistem pencatatan.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#B9FF66]/30 transition-colors">
                <div className="text-[#B9FF66] font-bold text-lg mb-2">03. Komputasi AI</div>
                <p className="text-sm text-gray-400 leading-relaxed">Sistem akan membedah profil Anda dan membandingkannya dengan dataset standar industri.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#B9FF66]/30 transition-colors">
                <div className="text-[#B9FF66] font-bold text-lg mb-2">04. Ikuti Roadmap</div>
                <p className="text-sm text-gray-400 leading-relaxed">Dapatkan <i>Visual Roadmap</i> berisi materi edukasi terkurasi untuk menutup <i>skill-gap</i> Anda.</p>
              </div>
            </div>
          </div>

          {/* Teknologi Inti */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Cpu className="text-[#B9FF66]" size={24} /> Teknologi Inti
            </h3>
            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-6 md:p-8 rounded-2xl h-[calc(100%-3.5rem)] flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#B9FF66] rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6 relative z-10">
                Sistem pemetaan menggunakan algoritma pemrosesan bahasa <strong>Natural Language Processing (NLP)</strong> murni tanpa bias:
              </p>
              <ul className="space-y-5 text-sm text-gray-400 relative z-10">
                <li className="flex items-start gap-3">
                  <div className="bg-[#B9FF66]/10 p-1.5 rounded-md shrink-0">
                    <Check size={14} className="text-[#B9FF66]" />
                  </div>
                  <span><strong>TF-IDF Vectorization:</strong> Ekstraksi bobot dan signifikansi unik untuk setiap parameter <i>skill</i>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#B9FF66]/10 p-1.5 rounded-md shrink-0">
                    <Check size={14} className="text-[#B9FF66]" />
                  </div>
                  <span><strong>Cosine Similarity:</strong> Menghitung nilai kedekatan fitur antara profil Anda dan skill yang dibutuhkan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
