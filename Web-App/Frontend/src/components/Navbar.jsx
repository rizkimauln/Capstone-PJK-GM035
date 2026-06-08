import { BrainCircuit, ChevronDown, User, LogOut, Settings, History, X } from 'lucide-react';

const LARAVEL_API = import.meta.env.VITE_LARAVEL_API_URL || "http://127.0.0.1:8001/api";
const BACKEND_URL = LARAVEL_API.replace('/api', '');

export default function Navbar({ isLoggedIn, userData, levelData, setIsLoggedIn, setAuthMode, isProfileDropdownOpen, setIsProfileDropdownOpen, setCompletedSkills, setCurrentPage }) {
  return (
    <>
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
              <div className="relative group">
                <button
                  onClick={() => setIsProfileDropdownOpen(true)}
                  className="rounded-full overflow-hidden border border-white/10 hover:border-[#B9FF66] transition-colors shadow-sm hover:shadow-[0_0_15px_rgba(185,255,102,0.3)] focus:outline-none"
                >
                  <div className="w-10 h-10 bg-[#B9FF66]/20 flex items-center justify-center text-[#B9FF66]">
                    {userData?.photo ? (
                      <img src={`${BACKEND_URL}/storage/${userData.photo}`} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                </button>

                {/* Desktop Dropdown (CSS Hover) */}
                <div className="hidden md:block absolute right-0 top-full pt-2">
                  <div className="w-56 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
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
                </div>

              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setCurrentPage('auth'); }}
                className="text-xs sm:text-sm bg-white/5 border border-white/10 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-white/10 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <User size={16} className="w-4 h-4 sm:w-4 sm:h-4" /> Masuk / Daftar
              </button>
            )}
          </div>
        </div>
      </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      {isLoggedIn && isProfileDropdownOpen && (
        <div className="md:hidden fixed inset-0 bg-[#050505] z-[100] flex flex-col animate-in slide-in-from-right duration-300 cursor-default">
          <div className="flex justify-between items-center h-20 px-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B9FF66]/20 flex items-center justify-center text-[#B9FF66] overflow-hidden">
                {userData?.photo ? (
                  <img src={`${BACKEND_URL}/storage/${userData.photo}`} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={18} />
                )}
              </div>
              <span className="font-bold text-lg text-white">{userData?.name || "Pengguna"}</span>
            </div>
            <button onClick={() => setIsProfileDropdownOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-col p-4 gap-2">
            <button
              onClick={() => { setCurrentPage('settings'); setIsProfileDropdownOpen(false); }}
              className="w-full text-left p-4 text-base font-medium text-gray-300 hover:text-white bg-white/5 rounded-lg flex items-center gap-4 transition-colors"
            >
              <Settings size={20} className="text-[#B9FF66]" /> Pengaturan
            </button>
            <button
              onClick={() => { setCurrentPage('history'); setIsProfileDropdownOpen(false); }}
              className="w-full text-left p-4 text-base font-medium text-gray-300 hover:text-white bg-white/5 rounded-lg flex items-center gap-4 transition-colors"
            >
              <History size={20} className="text-[#B9FF66]" /> Progres Tersimpan
            </button>
          </div>

          <div className="mt-auto p-4 border-t border-white/10 pb-8">
            <button
              onClick={() => { setIsLoggedIn(false); setIsProfileDropdownOpen(false); setCompletedSkills([]); setCurrentPage('home'); }}
              className="w-full text-center p-4 text-base font-bold text-red-400 bg-red-500/10 rounded-lg flex items-center justify-center gap-3 transition-colors hover:bg-red-500/20"
            >
              <LogOut size={20} /> Keluar dari Akun
            </button>
          </div>
        </div>
      )}
    </>
  )
}
