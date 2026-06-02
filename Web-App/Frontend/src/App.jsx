import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import SettingsPage from './components/SettingsPage';
import HistoryPage from './components/HistoryPage';
import AuthPage from './components/AuthPage';
import { User, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const LARAVEL_API = import.meta.env.VITE_LARAVEL_API_URL || "http://127.0.0.1:8001/api";

const getLevelBadge = (score) => {
  if (score >= 100) return { name: "Siap Industri", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" };
  if (score >= 70) return { name: "Profesional", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" };
  if (score >= 40) return { name: "Penjelajah", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" };
  return { name: "Pemula", color: "text-gray-400 bg-gray-400/10 border-gray-400/20" };
};

const mapHistory = (h) => ({
  id: h.role_id,
  dbId: h.id,
  roleName: h.role_name,
  dynamicScore: h.dynamic_score,
  analysisResult: h.analysis_result,
  completedSkills: h.completed_skills,
  currentSkills: h.current_skills,
  selectedRole: h.selected_role
});

export default function App() {
  const [rolesData, setRolesData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  const [selectedRole, setSelectedRole] = useState(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [roleSearchQuery, setRoleSearchQuery] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [completedSkills, setCompletedSkills] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [authMode, setAuthMode] = useState('login'); 
  const [pendingSkillToComplete, setPendingSkillToComplete] = useState(null); 

  const [userData, setUserData] = useState({ id: null, name: '', email: '', photo: null });
  const [savedHistory, setSavedHistory] = useState([]);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeSavedId, setActiveSavedId] = useState(null); 
  const [currentPage, setCurrentPage] = useState('home');

  // Load Initial Data (AI Service options)
  useEffect(() => {
    fetch(`${API_BASE}/options`)
      .then(res => res.json())
      .then(data => {
        setRolesData(data.roles);
        setSkillsData(data.skills.map(s => s.charAt(0).toUpperCase() + s.slice(1))); // Capitalize
        setIsLoadingForm(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoadingForm(false);
      });
  }, []);

  // Fetch Laravel User & History if token exists
  useEffect(() => {
    if (token) {
      fetch(`${LARAVEL_API}/user`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      })
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            setUserData({ id: data.id, name: data.name, email: data.email, photo: data.photo });
            setIsLoggedIn(true);
            fetchHistories(token);
          });
        } else {
          handleLogout();
        }
      }).catch(err => console.error(err));
    }
  }, [token]);

  // Menarik riwayat analisis user dari Laravel API
  const fetchHistories = (authToken) => {
    fetch(`${LARAVEL_API}/histories`, {
      headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      setSavedHistory(data.map(mapHistory));
    })
    .catch(err => console.error(err));
  };

  const handleLogout = () => {
    if (token) {
      fetch(`${LARAVEL_API}/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    }
    setToken(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData({ id: null, name: '', email: '', photo: null });
    setSavedHistory([]);
    resetForm();
    setCurrentPage('home');
  };

  const filteredSkills = skillsData.filter(skill => !currentSkills.includes(skill));

  const toggleSkill = (skill) => {
    if (currentSkills.includes(skill)) {
      setCurrentSkills(currentSkills.filter(s => s !== skill));
    } else {
      setCurrentSkills([...currentSkills, skill]);
    }
  };

  // Meminta rekomendasi pembelajaran dari AI Service
  const handleAnalyze = async () => {
    if (!selectedRole) {
      alert("Mohon tentukan target spesialisasi karier terlebih dahulu.");
      return;
    }
    
    setIsAnalyzing(true);
    setCompletedSkills([]); 
    setActiveSavedId(null); 
    
    try {
      const res = await fetch(`${API_BASE}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_role: selectedRole,
          current_skills: currentSkills.map(s => s.toLowerCase())
        })
      });
      
      const data = await res.json();
      if (data.detail) throw new Error(data.detail);

      const missingSkillNames = data.missing_skills.map(m => m.skill.charAt(0).toUpperCase() + m.skill.slice(1));
      const linksMap = data.missing_skills.reduce((acc, curr) => {
        acc[curr.skill.charAt(0).toUpperCase() + curr.skill.slice(1)] = curr.link;
        return acc;
      }, {});

      setAnalysisResult({
        roleId: selectedRole.toLowerCase().replace(/\s/g, '_'),
        roleName: data.target_role,
        score: data.similarity_score,
        matched: currentSkills.filter(s => !missingSkillNames.includes(s)), 
        missing: missingSkillNames,
        links: linksMap
      });
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan analisis. Pastikan server API berjalan.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setAnalysisResult(null);
    setCurrentSkills([]);
    setSelectedRole(null);
    setCompletedSkills([]);
    setActiveSavedId(null);
    setRoleSearchQuery('');
    setSkillSearchQuery('');
  };

  const toggleCompleteSkill = (skill) => {
    if (!isLoggedIn) {
      setPendingSkillToComplete(skill);
      setCurrentPage('auth');
      return;
    }
    executeCompleteSkill(skill);
  };

  const executeCompleteSkill = (skill) => {
    if (completedSkills.includes(skill)) {
      setCompletedSkills(completedSkills.filter(s => s !== skill));
    } else {
      setCompletedSkills([...completedSkills, skill]);
    }
  };

  let dynamicScore = 0;
  let levelData = getLevelBadge(0);
  
  if (analysisResult) {
    const totalRequirements = analysisResult.matched.length + analysisResult.missing.length;
    const totalAcquired = analysisResult.matched.length + completedSkills.length;
    dynamicScore = totalRequirements > 0 ? Math.round((totalAcquired / totalRequirements) * 100) : 100;
    levelData = getLevelBadge(dynamicScore);
  }

  const handleAuthSubmit = (user, jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    setUserData(user);
    setIsLoggedIn(true);
    setCurrentPage('home');
    
    if (pendingSkillToComplete) {
      executeCompleteSkill(pendingSkillToComplete);
      setPendingSkillToComplete(null);
      if (analysisResult) setActiveSavedId(analysisResult.roleId);
    }
  };

  // Sync to backend automatically when completed skills change and it's already saved
  useEffect(() => {
    if (isLoggedIn && analysisResult && activeSavedId === analysisResult.roleId) {
      const totalReq = analysisResult.matched.length + analysisResult.missing.length;
      const totalAcq = analysisResult.matched.length + completedSkills.length;
      const currentScore = totalReq > 0 ? Math.round((totalAcq / totalReq) * 100) : 100;

      const payload = {
        role_id: analysisResult.roleId,
        role_name: analysisResult.roleName,
        dynamic_score: currentScore,
        analysis_result: analysisResult,
        completed_skills: completedSkills,
        current_skills: currentSkills,
        selected_role: selectedRole
      };

      fetch(`${LARAVEL_API}/histories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      }).then(res => {
        if(res.ok) fetchHistories(token);
      });
    }
  }, [completedSkills, isLoggedIn, activeSavedId, analysisResult]);

  // Menyimpan hasil analisis ke database Backend
  const handleSaveAnalysis = async () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setCurrentPage('auth');
      return;
    }
    
    const totalReq = analysisResult.matched.length + analysisResult.missing.length;
    const totalAcq = analysisResult.matched.length + completedSkills.length;
    const currentScore = totalReq > 0 ? Math.round((totalAcq / totalReq) * 100) : 100;

    const payload = {
      role_id: analysisResult.roleId,
      role_name: analysisResult.roleName,
      dynamic_score: currentScore,
      analysis_result: analysisResult,
      completed_skills: completedSkills,
      current_skills: currentSkills,
      selected_role: selectedRole
    };

    try {
      const res = await fetch(`${LARAVEL_API}/histories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchHistories(token);
        setActiveSavedId(analysisResult.roleId);
        setShowToast("Analisis berhasil disimpan!");
        setTimeout(() => setShowToast(false), 3000);
      } else {
        alert("Gagal menyimpan analisis.");
      }
    } catch(err) {
      console.error(err);
      alert("Kesalahan jaringan.");
    }
  };

  const loadProgress = (historyItem) => {
    setCurrentSkills(historyItem.currentSkills);
    setSelectedRole(historyItem.selectedRole);
    setAnalysisResult(historyItem.analysisResult);
    setCompletedSkills(historyItem.completedSkills);
    setActiveSavedId(historyItem.id);
    setActiveModal(null);
    setCurrentPage('home');
    setTimeout(() => {
      document.getElementById('dashboard-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDeleteProgress = async (id) => {
    const historyItem = savedHistory.find(h => h.id === id);
    if (!historyItem) return;
    
    try {
      const res = await fetch(`${LARAVEL_API}/histories/${historyItem.dbId || id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchHistories(token);
        if (activeSavedId === id) {
          setActiveSavedId(null);
        }
      }
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async (password) => {
    try {
      const res = await fetch(`${LARAVEL_API}/delete-account`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        handleLogout();
        alert("Akun berhasil dihapus.");
      } else {
        const data = await res.json();
        alert(data.message || "Gagal menghapus akun.");
      }
    } catch(err) {
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-gray-200 selection:bg-[#B9FF66] selection:text-black relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#B9FF66]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#B9FF66]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[150] bg-[#B9FF66] text-black px-6 py-3 rounded-full font-bold shadow-[0_10px_40px_rgba(185,255,102,0.4)] animate-in slide-in-from-bottom-8 fade-in flex items-center gap-3">
          <CheckCircle2 size={20} />
          {showToast}
        </div>
      )}



      {currentPage !== 'auth' && (
        <Navbar 
          isLoggedIn={isLoggedIn}
          userData={userData}
          levelData={levelData}
          setIsLoggedIn={handleLogout}
          setAuthMode={setAuthMode}
          isProfileDropdownOpen={isProfileDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
          setCompletedSkills={setCompletedSkills}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'auth' ? (
        <AuthPage 
          authMode={authMode} 
          setAuthMode={setAuthMode} 
          handleAuthSubmit={handleAuthSubmit} 
          goBack={() => { setCurrentPage('home'); setPendingSkillToComplete(null); }} 
        />
      ) : currentPage === 'history' && isLoggedIn ? (
        <HistoryPage 
          savedHistory={savedHistory}
          loadProgress={loadProgress}
          handleDeleteProgress={handleDeleteProgress}
          goBack={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          goHome={() => {
            setCurrentPage('home');
            resetForm();
          }}
        />
      ) : currentPage === 'settings' && isLoggedIn ? (
        <SettingsPage 
          userData={userData}
          setUserData={setUserData}
          token={token}
          handleDeleteAccount={handleDeleteAccount}
          goBack={() => setCurrentPage('home')}
          setShowToast={(msg) => {
            setShowToast(msg);
            setTimeout(() => setShowToast(false), 3000);
          }}
        />
      ) : (
        <>
          {!analysisResult && (
            <>
              <Hero 
                isLoadingForm={isLoadingForm}
                rolesData={rolesData}
                filteredSkills={filteredSkills}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                isRoleDropdownOpen={isRoleDropdownOpen}
                setIsRoleDropdownOpen={setIsRoleDropdownOpen}
                roleSearchQuery={roleSearchQuery}
                setRoleSearchQuery={setRoleSearchQuery}
                currentSkills={currentSkills}
                toggleSkill={toggleSkill}
                isSkillDropdownOpen={isSkillDropdownOpen}
                setIsSkillDropdownOpen={setIsSkillDropdownOpen}
                skillSearchQuery={skillSearchQuery}
                setSkillSearchQuery={setSkillSearchQuery}
                handleAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
              <About />
            </>
          )}

          {analysisResult && (
            <ResultDisplay 
              analysisResult={analysisResult}
              resetForm={resetForm}
              activeSavedId={activeSavedId}
              handleSaveAnalysis={handleSaveAnalysis}
              completedSkills={completedSkills}
              dynamicScore={dynamicScore}
              levelData={levelData}
              toggleCompleteSkill={toggleCompleteSkill}
            />
          )}
        </>
      )}

      {currentPage !== 'auth' && <Footer />}
    </div>
  );
}
