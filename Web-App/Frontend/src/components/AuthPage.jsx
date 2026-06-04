import { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, BrainCircuit, Sparkles, Code2, Loader2, AlertCircle } from 'lucide-react';

const LARAVEL_API = import.meta.env.VITE_LARAVEL_API_URL || "http://127.0.0.1:8001/api";

export default function AuthPage({ authMode, setAuthMode, handleAuthSubmit, goBack }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Menangani pengiriman data untuk otentikasi (Register/Login) ke Backend
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const endpoint = authMode === 'register' ? `${LARAVEL_API}/register` : `${LARAVEL_API}/login`;
      const payload = authMode === 'register' 
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan saat otentikasi.');
      }
      
      handleAuthSubmit(data.user, data.token);
      
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#050505] selection:bg-[#B9FF66] selection:text-black">
      
      {/* Left Panel - Visual/Brand (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/10">
        
        {/* Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#B9FF66]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B9FF66]/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Abstract Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#B9FF66 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <img src="/Icon CAPAI.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(185,255,102,0.3)]" />
            <span className="font-extrabold text-2xl tracking-tight text-white">CAP<span className="text-[#B9FF66]">AI</span></span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Buka Potensi <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9FF66] to-white">Karier Masa Depan</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Bergabunglah dengan ribuan profesional lainnya untuk memetakan alur belajar Anda, mengevaluasi kemampuan teknis, dan bersiap menuju industri teknologi.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="bg-[#B9FF66]/10 p-3 rounded-full text-[#B9FF66]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Evaluasi Dinamis</h4>
                  <p className="text-sm text-gray-500">Skor kecocokan industri real-time</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="bg-[#B9FF66]/10 p-3 rounded-full text-[#B9FF66]">
                  <Code2 size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Roadmap Spesifik</h4>
                  <p className="text-sm text-gray-500">Panduan terarah untuk target peran Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-gray-500 font-medium">
          <p>© 2026 Pijak • IBM SkillsBuild</p>
        </div>
      </div>

      {/* Right Panel - Form (Full width on Mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <button 
          onClick={goBack}
          className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-colors text-white z-50 flex items-center justify-center group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Mobile Logo Only */}
        <div className="absolute top-8 right-8 lg:hidden flex items-center gap-2">
          <img src="/Icon CAPAI.png" alt="Logo" className="w-6 h-6 object-contain" />
          <span className="font-bold text-lg text-white">CAP<span className="text-[#B9FF66]">AI</span></span>
        </div>

        <div className="w-full max-w-md relative z-10 mt-12 lg:mt-0">
          <div className="text-center lg:text-left mb-10">
            {/* Removed Rocket icon per user request, added empty div to maintain text position */}
            <div className="lg:hidden h-[88px]"></div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {authMode === 'login' ? 'Selamat Datang' : 'Buat Akun Baru'}
            </h2>
            <p className="text-gray-400">
              {authMode === 'login' ? 'Masuk untuk melanjutkan analisis karier Anda.' : 'Daftar sekarang untuk menyimpan peta jalan belajar Anda secara permanen.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {authMode === 'register' && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#B9FF66]/50 focus:ring-1 focus:ring-[#B9FF66]/50 transition-all placeholder:text-gray-600" 
                    placeholder="Contoh: Budi Santoso" 
                  />
                </div>
              </div>
            )}

            <div className="animate-in fade-in slide-in-from-bottom-2 delay-75">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Alamat Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#B9FF66]/50 focus:ring-1 focus:ring-[#B9FF66]/50 transition-all placeholder:text-gray-600" 
                  placeholder="email@mahasiswa.ac.id" 
                />
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 delay-150">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#B9FF66]/50 focus:ring-1 focus:ring-[#B9FF66]/50 transition-all placeholder:text-gray-600" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading} 
              className="w-full bg-[#B9FF66] text-black font-extrabold py-4 rounded-xl mt-8 hover:bg-[#a3e655] disabled:bg-gray-700 disabled:text-gray-500 transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(185,255,102,0.15)] hover:shadow-[0_0_30px_rgba(185,255,102,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : (authMode === 'login' ? 'Masuk ke Dasbor' : 'Daftar & Lanjutkan')}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 font-medium">
            {authMode === 'login' ? "Belum memiliki profil? " : "Sudah memiliki akun? "}
            <button 
              type="button" 
              onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrorMsg(''); }} 
              className="text-[#B9FF66] font-bold hover:underline transition-all"
            >
              {authMode === 'login' ? 'Daftar sekarang' : 'Masuk di sini'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
