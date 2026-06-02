import { ArrowRight, Save, CheckCircle2, Sparkles, AlertCircle, Target, Trophy, Check, Clock, Play } from 'lucide-react';

export default function ResultDisplay({
  analysisResult,
  resetForm,
  activeSavedId,
  handleSaveAnalysis,
  completedSkills,
  dynamicScore,
  levelData,
  toggleCompleteSkill
}) {
  return (
    <main id="dashboard-section" className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-24 relative z-10 w-full animate-fade-in">
      <div className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <button
            onClick={resetForm}
            className="text-gray-500 hover:text-white transition-colors text-sm font-medium flex justify-center items-center gap-2 mb-6 bg-white/5 hover:bg-white/10 w-[44px] sm:w-[170px] h-[44px] rounded-lg border border-white/5 backdrop-blur-md"
          >
            <ArrowRight size={16} className="rotate-180" />
            <span className="hidden sm:inline">Kembali Evaluasi</span>
          </button>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">Peta Jalan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9FF66] to-[#fff]">Visual</span></h2>
          <p className="text-gray-400 mt-3 text-lg">Laporan analitik & proyeksi pembelajaran untuk <span className="text-white font-semibold">{analysisResult.roleName}</span></p>
        </div>
        <div className="flex mt-2 md:mt-0 shrink-0">
          {activeSavedId !== analysisResult.roleId ? (
            <button
              onClick={handleSaveAnalysis}
              className="text-[#B9FF66] hover:text-black bg-[#B9FF66]/10 hover:bg-[#B9FF66] transition-colors text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-[180px] h-[48px] rounded-lg border border-[#B9FF66]/20 backdrop-blur-md shadow-[0_0_15px_rgba(185,255,102,0.1)] hover:shadow-[0_0_20px_rgba(185,255,102,0.3)]"
            >
              <Save size={18} /> Simpan Analisis
            </button>
          ) : (
            <button disabled className="text-[#B9FF66]/50 bg-[#B9FF66]/5 cursor-default text-sm font-bold flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#B9FF66]/10 backdrop-blur-md w-full md:w-auto">
              <CheckCircle2 size={18} /> Tersimpan Otomatis
            </button>
          )}
        </div>
      </div>

      {completedSkills.length > 0 && dynamicScore < 100 && (
        <div className="bg-gradient-to-r from-[#B9FF66]/20 to-transparent border border-[#B9FF66]/30 rounded-2xl p-4 mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="bg-[#B9FF66] p-2 rounded-full shadow-[0_0_15px_rgba(185,255,102,0.5)]">
            <Sparkles size={20} className="text-black" />
          </div>
          <div>
            <h4 className="text-white font-bold">Kerja Bagus!</h4>
            <p className="text-sm text-gray-300">Anda telah menyelesaikan <strong>{completedSkills.length}</strong> modul baru. Skor kecocokan industri Anda meningkat!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 items-stretch">
        <div className="bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 relative overflow-hidden group flex flex-col items-center shadow-2xl h-full">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B9FF66] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>

          <div className="flex justify-between w-full items-center mb-8">
            <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-widest">Similarity Index</h3>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border ${levelData?.color || "text-gray-400 bg-gray-400/10 border-gray-400/20"}`}>
              {levelData?.name || "Pemula"}
            </div>
          </div>

          <div className="relative w-48 h-48 flex items-center justify-center mb-8 mt-4">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(185,255,102,0.15)]" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="none" />
              <circle
                cx="64" cy="64" r="56"
                stroke="url(#score-gradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={(2 * Math.PI * 56) - ((dynamicScore / 100) * (2 * Math.PI * 56))}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8bc53f" />
                  <stop offset="100%" stopColor="#B9FF66" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center gap-1">
              <span className="text-5xl font-extrabold text-white tracking-tighter">{dynamicScore}</span>
              <span className="text-2xl font-bold text-[#B9FF66]">%</span>
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center max-w-[260px] mt-auto">
            Selesaikan modul di Peta Jalan untuk meningkatkan skor kecocokan profil Anda!
          </p>
        </div>

        <div className="bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 flex flex-col hover:border-[#B9FF66]/20 transition-colors duration-300 relative overflow-hidden h-full">
          <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none">
            <CheckCircle2 size={200} />
          </div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-inner">
              <CheckCircle2 size={24} className="text-[#B9FF66]" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-white text-lg leading-tight">Kualifikasi Terpenuhi</h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                {analysisResult.matched.length + completedSkills.length} Kompetensi
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            {analysisResult.matched.map(skill => (
              <span key={skill} className="bg-white/5 text-gray-300 border border-white/10 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B9FF66] shadow-[0_0_8px_#B9FF66]"></span>
                {skill}
              </span>
            ))}

            {completedSkills.map(skill => (
              <span key={`comp-${skill}`} className="bg-[#B9FF66]/10 text-[#B9FF66] border border-[#B9FF66]/30 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-in fade-in zoom-in-90">
                <Check size={14} />
                {skill}
              </span>
            ))}

            {analysisResult.matched.length === 0 && completedSkills.length === 0 && (
              <div className="flex items-center gap-3 text-gray-500 text-sm bg-white/5 px-4 py-4 rounded-xl w-full border border-dashed border-white/10">
                <AlertCircle size={18} /> Belum ada data selaras
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 flex flex-col hover:border-red-500/20 transition-colors duration-300 relative overflow-hidden h-full">
          <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none">
            <Target size={200} />
          </div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-inner">
              <Target size={24} className="text-red-400" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-white text-lg leading-tight">Area Kesenjangan</h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                {analysisResult.missing.length - completedSkills.length} Target Belajar
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 relative z-10">
            {analysisResult.missing.map(skill => {
              const isDone = completedSkills.includes(skill);
              if (isDone) return null;

              return (
                <span key={skill} className="bg-red-500/5 text-red-200 border border-red-500/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#F87171]"></span>
                  {skill}
                </span>
              );
            })}

            {analysisResult.missing.length - completedSkills.length === 0 && (
              <div className="flex items-center justify-center gap-2 text-[#B9FF66] bg-[#B9FF66]/10 px-4 py-4 rounded-xl w-full border border-dashed border-[#B9FF66]/20">
                <Trophy size={18} /> Sempurna! Semua target selesai.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 bg-gradient-to-r from-[#111] to-transparent border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-5">
            <div className="bg-[#B9FF66] p-4 rounded-2xl shadow-[0_0_30px_rgba(185,255,102,0.3)]">
              <Target size={32} className="text-black" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Visual Roadmap</h3>
              <p className="text-gray-400 text-sm mt-1">Selesaikan modul di bawah ini untuk meningkatkan persentase <span className="text-[#B9FF66] font-semibold">Similarity Index</span> Anda.</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pl-2 md:pl-0">
          {analysisResult.missing.length === 0 ? (
            <div className="text-center py-20 px-6 bg-[#111] rounded-2xl border border-white/5">
              <div className="inline-flex bg-[#B9FF66]/20 p-6 rounded-full mb-6">
                <Trophy size={56} className="text-[#B9FF66]" />
              </div>
              <h4 className="text-3xl font-bold text-white mb-3">Kualifikasi Paripurna</h4>
              <p className="text-gray-400 max-w-md mx-auto text-lg">Profil Anda telah memenuhi 100% persyaratan teknis. Anda telah siap untuk memasuki pasar kerja industri teknologi.</p>
            </div>
          ) : (
            <div className="relative py-10">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B9FF66] via-[#B9FF66]/30 to-transparent transform -translate-x-1/2 z-0"></div>

              <div className="md:hidden absolute left-[35px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B9FF66] via-[#B9FF66]/30 to-transparent z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-24 md:gap-y-12 relative z-10">
                {analysisResult.missing.map((skill, index) => {
                  const url = analysisResult.links?.[skill] || "#";
                  const isEven = index % 2 === 0;
                  const isCompleted = completedSkills.includes(skill);

                  return (
                    <div key={skill} className={`relative pl-16 md:pl-0 group ${isCompleted ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}`}>
                      <div className={`md:hidden absolute left-[20px] top-6 w-8 h-8 rounded-full border-[3px] flex items-center justify-center z-20 ${isCompleted ? 'bg-[#B9FF66] border-[#B9FF66] text-black shadow-[0_0_20px_rgba(185,255,102,0.6)]' : 'bg-[#0A0A0A] border-[#B9FF66] shadow-[0_0_20px_rgba(185,255,102,0.4)]'}`}>
                        {isCompleted ? <Check size={14} strokeWidth={4} /> : <div className="w-2.5 h-2.5 bg-[#B9FF66] rounded-full"></div>}
                      </div>

                      {isEven && (
                        <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 z-20 w-8 h-8 rounded-full border-[3px] items-center justify-center transition-transform duration-300 group-hover:scale-125 ${isCompleted ? 'bg-[#B9FF66] border-[#B9FF66] text-black shadow-[0_0_20px_rgba(185,255,102,0.6)]' : 'bg-[#0A0A0A] border-[#B9FF66] shadow-[0_0_20px_rgba(185,255,102,0.4)]'}`}>
                          {isCompleted ? <Check size={14} strokeWidth={4} /> : <div className="w-2.5 h-2.5 bg-[#B9FF66] rounded-full animate-pulse"></div>}
                        </div>
                      )}

                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 border-t-2 border-dashed z-10 ${isEven ? '-right-12' : '-left-12'} ${isCompleted ? 'border-[#B9FF66]' : 'border-[#B9FF66]/30'}`}></div>

                      <div className={`bg-[#111] rounded-2xl border p-6 lg:p-8 transition-all duration-300 relative overflow-hidden group/card h-full flex flex-col justify-between shadow-lg ${isCompleted ? 'border-[#B9FF66] bg-[#151a10]' : 'border-white/5 hover:border-[#B9FF66]/40 hover:bg-[#151515]'}`}>
                        {!isCompleted && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#B9FF66] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                        )}

                        <div className="flex flex-col gap-6 h-full">
                          <div>
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <span className={`inline-flex justify-center items-center w-[80px] h-[25px] text-[10px] font-extrabold rounded-lg uppercase tracking-widest shadow-[0_0_10px_rgba(185,255,102,0.2)] ${isCompleted ? 'bg-gray-800 text-gray-400 line-through' : 'bg-[#B9FF66] text-black'}`}>
                                Tahap {index + 1}
                              </span>
                            </div>

                            <h4 className={`text-xl lg:text-2xl font-bold mb-2 ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>{skill}</h4>
                            <p className={`text-sm leading-relaxed ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                              Pelajari konsep komprehensif dan implementasi nyata dari {skill}.
                            </p>
                          </div>

                          <div className="mt-auto flex flex-col xl:flex-row items-stretch gap-3">
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex-1 flex items-center justify-between gap-3 p-3.5 rounded-xl transition-all duration-300 group/btn border ${isCompleted ? 'bg-transparent border-white/10 hover:bg-white/5 opacity-70' : 'bg-white/5 hover:bg-[#B9FF66] border-white/10 hover:border-[#B9FF66]'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full transition-colors shrink-0 ${isCompleted ? 'bg-white/10 text-white' : 'bg-white/10 group-hover/btn:bg-black/10 text-white group-hover/btn:text-black'}`}>
                                  <Play size={14} fill="currentColor" />
                                </div>
                                <div className="text-left">
                                  <p className={`text-xs font-bold truncate max-w-[100px] xl:max-w-[130px] transition-colors ${isCompleted ? 'text-white' : 'text-white group-hover/btn:text-black'}`}>Mulai Belajar</p>
                                </div>
                              </div>
                            </a>

                            <button
                              onClick={() => toggleCompleteSkill(skill)}
                              className={`flex items-center justify-center gap-2 p-3.5 rounded-xl transition-all font-bold text-xs uppercase tracking-wide border ${isCompleted
                                ? 'bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500'
                                : 'bg-[#B9FF66]/10 border-[#B9FF66]/30 text-[#B9FF66] hover:bg-[#B9FF66] hover:text-black hover:shadow-[0_0_15px_rgba(185,255,102,0.4)]'
                                }`}
                            >
                              {isCompleted ? 'Batalkan' : <><Check size={16} /> Selesai</>}
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              <div className="relative flex justify-center mt-12 md:mt-24 w-full z-20">
                <div className={`absolute left-[16px] md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-[3px] top-0 transition-colors duration-500 ${dynamicScore >= 100 ? 'bg-[#B9FF66] border-[#B9FF66] shadow-[0_0_30px_rgba(185,255,102,0.8)]' : 'bg-[#0A0A0A] border-gray-700'}`}>
                  <Trophy size={16} className={dynamicScore >= 100 ? "text-black" : "text-gray-500"} />
                </div>

                <div className={`w-[calc(100%-4rem)] ml-[4rem] md:ml-0 md:w-1/2 lg:w-5/12 border rounded-2xl p-6 flex items-center justify-center gap-4 relative mt-1 md:mt-12 text-center md:text-left transition-all duration-500 ${dynamicScore >= 100 ? 'bg-[#B9FF66]/10 border-[#B9FF66]/40 opacity-100' : 'bg-white/5 border-white/5 opacity-60'}`}>
                  <div className={`p-4 rounded-full hidden md:block transition-colors ${dynamicScore >= 100 ? 'bg-[#B9FF66] shadow-lg' : 'bg-white/10'}`}>
                    <Target size={28} className={dynamicScore >= 100 ? "text-black" : "text-white"} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${dynamicScore >= 100 ? "text-[#B9FF66]" : "text-white"}`}>Target Kompetensi Tercapai</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {dynamicScore >= 100 ? "Luar biasa! Anda telah siap untuk melamar pekerjaan ini." : "Selesaikan seluruh modul di atas untuk membuka badge ini."}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </main>
  )
}
