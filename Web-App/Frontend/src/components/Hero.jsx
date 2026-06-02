import { Target, Loader2, ArrowRight, X, ChevronDown, Search, CheckCircle2 } from 'lucide-react';

export default function Hero({
  isLoadingForm,
  rolesData,
  filteredSkills,
  selectedRole,
  setSelectedRole,
  isRoleDropdownOpen,
  setIsRoleDropdownOpen,
  roleSearchQuery,
  setRoleSearchQuery,
  currentSkills,
  toggleSkill,
  isSkillDropdownOpen,
  setIsSkillDropdownOpen,
  skillSearchQuery,
  setSkillSearchQuery,
  handleAnalyze,
  isAnalyzing
}) {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
            Career Path AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9FF66] to-[#fff]">Roadmap</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Platform cerdas untuk mengidentifikasi <i>skill</i> yang dibutuhkan pada peran profesi spesifik. Temukan kesenjangan kompetensi Anda dan dapatkan Peta Jalan Visual untuk meningkatkan keahlian yang paling dicari oleh dunia industri teknologi saat ini.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 size={16} className="text-[#B9FF66]" /> Sistem Dinamis
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 size={16} className="text-[#B9FF66]" /> Evaluasi Real-time
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="bg-[#111111]/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl relative group z-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B9FF66]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="text-[#B9FF66]" size={28} />
              Analisis Kompetensi
            </h3>
            <p className="text-sm text-gray-400 mt-2">Masukan data profil untuk memulai menganalisis kebutuhan skill.</p>
          </div>

          {isLoadingForm ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="animate-spin text-[#B9FF66]" size={32} />
              <p className="text-sm font-medium text-gray-400">Menyinkronkan node dataset...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Role Dropdown */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-300 mb-2">1. Target Spesialisasi Karier</label>
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="w-full flex items-center justify-between p-4 bg-[#1A1A1A] border border-white/10 rounded-xl hover:bg-[#222] transition-colors text-left focus:ring-2 focus:ring-[#B9FF66]/30 outline-none"
                >
                  <span className={selectedRole ? "text-white font-medium" : "text-gray-500"}>
                    {selectedRole ? selectedRole : "Pilih spesialisasi"}
                  </span>
                  <ChevronDown size={20} className={`text-gray-400 transition-transform ${isRoleDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl max-h-60 overflow-y-auto backdrop-blur-xl custom-scrollbar">
                    <div className="p-3 border-b border-white/10 sticky top-0 bg-[#1A1A1A] z-10">
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Cari spesialisasi..."
                          value={roleSearchQuery}
                          onChange={(e) => setRoleSearchQuery(e.target.value)}
                          className="w-full bg-[#111] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#B9FF66]/50 transition-colors"
                        />
                      </div>
                    </div>
                    {rolesData.filter(role => role.toLowerCase().includes(roleSearchQuery.toLowerCase())).length > 0 ? (
                      rolesData.filter(role => role.toLowerCase().includes(roleSearchQuery.toLowerCase())).map((role, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedRole(role);
                            setIsRoleDropdownOpen(false);
                            setRoleSearchQuery('');
                          }}
                          className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-b-0 transition-colors text-gray-200 hover:text-[#B9FF66] font-medium"
                        >
                          {role}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">Tidak ada spesialisasi ditemukan</div>
                    )}
                  </div>
                )}
              </div>

              {/* Skills Dropdown */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-300 mb-2">2. Skill yang di miliki</label>

                {/* Tags */}
                {currentSkills.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {currentSkills.map(skill => (
                      <span key={skill} className="bg-[#B9FF66]/10 text-[#B9FF66] border border-[#B9FF66]/20 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 font-medium">
                        {skill}
                        <X size={14} className="cursor-pointer hover:text-white transition-colors" onClick={() => toggleSkill(skill)} />
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
                  className="w-full flex items-center justify-between p-4 bg-[#1A1A1A] border border-white/10 rounded-xl hover:bg-[#222] transition-colors text-left focus:ring-2 focus:ring-[#B9FF66]/30 outline-none"
                >
                  <span className="text-gray-500">
                    Tambahkan Skill Kamu
                  </span>
                  <ChevronDown size={20} className={`text-gray-400 transition-transform ${isSkillDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isSkillDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl max-h-60 overflow-y-auto backdrop-blur-xl custom-scrollbar">
                    <div className="p-3 border-b border-white/10 sticky top-0 bg-[#1A1A1A] z-10">
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Cari kompetensi..."
                          value={skillSearchQuery}
                          onChange={(e) => setSkillSearchQuery(e.target.value)}
                          className="w-full bg-[#111] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#B9FF66]/50 transition-colors"
                        />
                      </div>
                    </div>
                    {filteredSkills.filter(skill => skill.toLowerCase().includes(skillSearchQuery.toLowerCase())).length > 0 ? (
                      filteredSkills.filter(skill => skill.toLowerCase().includes(skillSearchQuery.toLowerCase())).map(skill => (
                        <div
                          key={skill}
                          className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-b-0 transition-colors text-gray-200 hover:text-[#B9FF66] font-medium"
                          onClick={() => { toggleSkill(skill); setIsSkillDropdownOpen(false); setSkillSearchQuery(''); }}
                        >
                          {skill}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">Kompetensi tidak ditemukan</div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!selectedRole || currentSkills.length === 0 || isAnalyzing}
                className="w-full bg-[#B9FF66] text-black py-4 rounded-xl font-bold text-base hover:bg-[#a3e655] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2 mt-6 shadow-[0_0_20px_rgba(185,255,102,0.2)] hover:shadow-[0_0_30px_rgba(185,255,102,0.4)] disabled:shadow-none"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sedang Memproses...
                  </>
                ) : (
                  <>
                    Mulai Analisis
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
