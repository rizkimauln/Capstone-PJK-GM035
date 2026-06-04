import { BrainCircuit, ChevronDown, User, LogOut, Settings, History } from 'lucide-react';

const LARAVEL_API = import.meta.env.VITE_LARAVEL_API_URL || "http://127.0.0.1:8001/api";
const BACKEND_URL = LARAVEL_API.replace('/api', '');

export default function Navbar({ isLoggedIn, userData, levelData, setIsLoggedIn, setAuthMode, isProfileDropdownOpen, setIsProfileDropdownOpen, setCompletedSkills, setCurrentPage }) {
  return (
    <nav className="fixed w-full top-0 z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <img src="/Icon CAPAI.png" alt="Logo" className="w-7 h-7 object-contain" />
            <span className="font-bold text-xl tracking-tight text-white">CAP<span className="text-[#B9FF66]">AI</span></span>
          </div>

          {/* Menu Login/Profil Navbar */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-1.5 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#B9FF66]/20 flex items-center justify-center text-[#B9FF66] border border-[#B9FF66]/30 shrink-0 overflow-hidden">
                      {userData?.photo ? (
                        <img src={`${BACKEND_URL}/storage/${userData.photo}`} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={16} />
                      )}
                    </div>
                    <div className="hidden sm:flex flex-col">
                      <span className="text-sm font-semibold text-white leading-none max-w-[120px] truncate">{userData.name || 'Mahasiswa IT'}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{levelData?.name}</span>
                    </div>
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                    <button
                      onClick={() => { setCurrentPage('settings'); setIsProfileDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors"
                    >
                      <Settings size={16} className="text-gray-400" /> Pengaturan
                    </button>
                    <button
                      onClick={() => { setCurrentPage('history'); setIsProfileDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors"
                    >
                      <History size={16} className="text-gray-400" /> Progres Tersimpan
                    </button>
                    <div className="my-2 border-t border-white/5"></div>
                    <button
                      onClick={() => { setIsLoggedIn(false); setIsProfileDropdownOpen(false); setCompletedSkills([]); setCurrentPage('home'); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 flex items-center gap-3 transition-colors"
                    >
                      <LogOut size={16} /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setCurrentPage('auth'); }}
                className="text-xs sm:text-sm bg-white/5 border border-white/10 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <User size={16} className="w-4 h-4 sm:w-4 sm:h-4" /> Masuk / Daftar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
