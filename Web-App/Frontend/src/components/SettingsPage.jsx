import { useState, useRef } from 'react';
import { User, Mail, Lock, Trash2, Camera, ArrowLeft, Shield, Save, AlertTriangle } from 'lucide-react';

export default function SettingsPage({ userData, setUserData, token, handleDeleteAccount, goBack, setShowToast }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [previewPhoto, setPreviewPhoto] = useState(userData.photo || null);
  const fileInputRef = useRef(null);

  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewPhoto(url);
    }
  };

  const LARAVEL_API = import.meta.env.VITE_LARAVEL_API_URL || "http://127.0.0.1:8001/api";

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${LARAVEL_API}/update-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name, email, photo: previewPhoto })
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUserData(updatedUser);
        setShowToast("Profil berhasil diperbarui!");
      } else {
        alert("Gagal memperbarui profil. Email mungkin sudah terdaftar.");
      }
    } catch(err) {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    try {
      const res = await fetch(`${LARAVEL_API}/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
      });
      if (res.ok) {
        setCurrentPassword('');
        setNewPassword('');
        setShowToast("Kata sandi berhasil diubah!");
      } else {
        const data = await res.json();
        alert(data.message || "Gagal mengubah kata sandi.");
      }
    } catch(err) {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative z-20 w-full min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex items-center gap-4">
        <button 
          onClick={goBack}
          className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-colors text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Pengaturan Akun</h1>
          <p className="text-gray-400 mt-1 text-sm">Kelola preferensi, keamanan, dan data pribadi Anda.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Menu */}
        <div className="w-full lg:w-72 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'profile' 
                ? 'bg-[#B9FF66] text-black shadow-[0_0_20px_rgba(185,255,102,0.2)]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <User size={18} /> Profil Pribadi
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'security' 
                ? 'bg-[#B9FF66] text-black shadow-[0_0_20px_rgba(185,255,102,0.2)]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Shield size={18} /> Keamanan & Sandi
          </button>

          <div className="pt-4 mt-4 border-t border-white/10">
            <button 
              onClick={() => setActiveTab('danger')}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'danger' 
                  ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                  : 'text-red-400 hover:bg-red-500/10'
              }`}
            >
              <Trash2 size={18} /> Hapus Akun
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

          {activeTab === 'profile' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white">Informasi Profil</h2>
                <button type="submit" form="profileForm" className="hidden md:flex bg-[#B9FF66] text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#a3e655] transition-all items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,255,102,0.15)] hover:shadow-[0_0_30px_rgba(185,255,102,0.3)]">
                  <Save size={16} /> Simpan Profil
                </button>
              </div>
              
              <form id="profileForm" onSubmit={handleSaveProfile} className="space-y-8">
                {/* Photo Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-2 border-white/10 bg-[#1A1A1A] overflow-hidden relative flex items-center justify-center">
                      {previewPhoto ? (
                        <img src={previewPhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={40} className="text-gray-500" />
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <Camera size={24} className="text-white" />
                      </div>
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handlePhotoChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Foto Profil</h3>
                    <p className="text-sm text-gray-500 mb-3">Format disarankan: JPG, PNG. Maks ukuran 2MB.</p>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-semibold transition-colors">
                      Ubah Foto
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={16} className="text-gray-500" />
                      </div>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#B9FF66]/50 focus:ring-1 focus:ring-[#B9FF66]/50 transition-all placeholder:text-gray-600" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Alamat Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-500" />
                      </div>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#B9FF66]/50 focus:ring-1 focus:ring-[#B9FF66]/50 transition-all placeholder:text-gray-600" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 md:hidden">
                  <button type="submit" className="w-full bg-[#B9FF66] text-black px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-[#a3e655] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,255,102,0.15)] hover:shadow-[0_0_30px_rgba(185,255,102,0.3)]">
                    <Save size={16} /> Simpan Profil
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white">Ubah Kata Sandi</h2>
                <button type="submit" form="passwordForm" className="hidden md:flex bg-[#B9FF66] text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#a3e655] transition-all items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,255,102,0.15)] hover:shadow-[0_0_30px_rgba(185,255,102,0.3)]">
                  <Save size={16} /> Perbarui Sandi
                </button>
              </div>
              
              <form id="passwordForm" onSubmit={handleSavePassword} className="space-y-8 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Kata Sandi Saat Ini</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={16} className="text-gray-500" />
                      </div>
                      <input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required 
                        placeholder="••••••••"
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#B9FF66]/50 focus:ring-1 focus:ring-[#B9FF66]/50 transition-all placeholder:text-gray-600" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Kata Sandi Baru</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={16} className="text-gray-500" />
                      </div>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required 
                        placeholder="••••••••"
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#B9FF66]/50 focus:ring-1 focus:ring-[#B9FF66]/50 transition-all placeholder:text-gray-600" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 md:hidden">
                  <button type="submit" className="w-full bg-[#B9FF66] text-black px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-[#a3e655] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,255,102,0.15)] hover:shadow-[0_0_30px_rgba(185,255,102,0.3)]">
                    <Save size={16} /> Perbarui Sandi
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'danger' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Hapus Akun Permanen</h2>
              <p className="text-gray-400 text-sm mb-8 max-w-2xl leading-relaxed">
                Menghapus akun Anda akan memusnahkan semua data, termasuk riwayat Peta Jalan, sertifikasi, dan analitik kompetensi secara permanen. Tindakan ini tidak dapat dibatalkan.
              </p>
              
              <div className="bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl p-6 lg:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                  <AlertTriangle size={200} className="text-red-500" />
                </div>

                <div className="relative z-10 w-full md:w-auto">
                  <h3 className="text-red-400 font-bold text-lg mb-2">Zona Bahaya</h3>
                  <p className="text-red-300/70 text-sm max-w-md">Setelah Anda menghapus akun, tidak ada jalan kembali. Harap pastikan keputusan Anda.</p>
                </div>

                <div className="relative z-10 w-full md:w-auto shrink-0 flex flex-col md:items-end">
                  {!confirmDelete ? (
                    <button 
                      onClick={() => setConfirmDelete(true)} 
                      className="w-full md:w-auto bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all border border-red-500/20 hover:border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                    >
                      <Trash2 size={20}/> Hapus Akun Saya
                    </button>
                  ) : (
                    <div className="flex flex-col gap-3 w-full md:w-80">
                      <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                           <Lock size={16} className="text-red-500/50" />
                         </div>
                         <input 
                           type="password" 
                           placeholder="Kata sandi konfirmasi..." 
                           value={deletePassword} 
                           onChange={(e) => setDeletePassword(e.target.value)} 
                           className="w-full bg-[#0A0A0A] border border-red-500/30 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-red-500 transition-all placeholder:text-red-500/30" 
                         />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setConfirmDelete(false); setDeletePassword(''); }} 
                          className="flex-1 bg-white/5 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors border border-white/10"
                        >
                          Batal
                        </button>
                        <button 
                          onClick={() => handleDeleteAccount(deletePassword)} 
                          disabled={!deletePassword} 
                          className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Konfirmasi
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
