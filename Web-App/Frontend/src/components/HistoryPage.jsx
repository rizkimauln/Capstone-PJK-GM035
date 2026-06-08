import { useState } from 'react';
import { History, ArrowLeft, X, ChevronRight, Target, Trophy, Clock, Trash2 } from 'lucide-react';

export default function HistoryPage({ savedHistory, loadProgress, handleDeleteProgress, goBack, goHome }) {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative z-20 w-full min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex items-center gap-4">
        <button 
          onClick={goBack}
          className="bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 transition-colors text-white shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <History className="text-[#B9FF66]" size={28} /> Riwayat Peta Jalan
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Lanjutkan progres pembelajaran dan analisis karier Anda sebelumnya.</p>
        </div>
      </div>

      <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9FF66]/5 rounded-full blur-[120px] pointer-events-none"></div>

        {savedHistory.length === 0 ? (
          <div className="text-center py-20 bg-[#1A1A1A]/50 rounded-lg border border-white/5 border-dashed relative z-10">
            <Target size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Belum Ada Progres Tersimpan</h3>
            <p className="text-gray-400 text-sm">Lakukan analisis kompetensi terlebih dahulu dan simpan hasilnya.</p>
            <button 
              onClick={goHome || goBack}
              className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 relative z-10">
            {savedHistory.map((item) => (
              <div key={item.id} className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4 md:p-5 group hover:border-[#B9FF66]/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(185,255,102,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 w-full">
                
                {/* Left: Icon and Title */}
                <div className="flex items-center gap-4 md:gap-5 flex-1">
                  <div className="bg-white/5 p-3 md:p-4 rounded-lg border border-white/10 group-hover:bg-[#B9FF66]/10 group-hover:border-[#B9FF66]/30 transition-colors shrink-0">
                    <Target size={24} className="text-white group-hover:text-[#B9FF66] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-white mb-1 line-clamp-2 leading-tight">{item.roleName}</h3>
                    <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-400">
                      <Clock size={12} className="md:w-3.5 md:h-3.5" />
                      <span>Tersimpan di histori</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions (Desktop) / Bottom: Actions (Mobile) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-transparent mt-1 md:mt-0">
                  
                  {/* Badge and Trash row on mobile */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                    <div className="bg-[#B9FF66]/10 border border-[#B9FF66]/20 px-3 py-2 md:px-4 md:py-2.5 rounded-lg flex items-center justify-center min-w-[120px] md:w-[140px] shrink-0">
                      <span className="text-[#B9FF66] font-bold text-xs md:text-sm whitespace-nowrap">{item.dynamicScore}% Terpenuhi</span>
                    </div>
                    
                    <button 
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="sm:hidden bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/50 p-2 rounded-lg transition-all shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Continue Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => loadProgress(item)}
                      className="flex-1 bg-white/5 hover:bg-[#B9FF66] text-white hover:text-black border border-white/10 hover:border-[#B9FF66] px-4 py-2.5 md:px-5 md:py-2.5 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-all group/btn"
                    >
                      Lanjutkan <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="hidden sm:flex bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/50 p-2.5 rounded-lg transition-all shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-md p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <button 
              onClick={() => setDeleteConfirmId(null)} 
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-3">Hapus Progres?</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus progres ini dari riwayat? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)} 
                className="flex-1 bg-white/5 text-white px-4 py-3.5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors border border-white/10"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  handleDeleteProgress(deleteConfirmId);
                  setDeleteConfirmId(null);
                }} 
                className="flex-1 bg-red-500 text-white px-4 py-3.5 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.2)]"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
