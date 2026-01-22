import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* 1. Header Section */}
      <div className="glass p-8 rounded-[40px] flex flex-col md:flex-row items-center gap-8 mb-10 border-white/5">
        <img 
          src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Ruchi"} 
          alt="Profile" 
          className="w-32 h-32 rounded-full border-4 border-green-500/30 shadow-2xl shadow-green-500/20"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl font-black text-white mb-2">
            {user?.displayName || "Recycler"} <span className="text-green-400">★</span>
          </h1>
          <p className="text-slate-400 font-medium">{user?.email}</p>
          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="px-4 py-1 bg-green-500/10 text-green-400 text-xs font-black rounded-full uppercase tracking-tighter border border-green-500/20">
              Gold Member
            </span>
            <span className="px-4 py-1 bg-blue-500/10 text-blue-400 text-xs font-black rounded-full uppercase tracking-tighter border border-blue-500/20">
              Verified MSME
            </span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500/10 text-red-500 font-bold rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
        >
          Logout
        </button>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Waste Managed", value: "128 kg", icon: "♻️" },
          { label: "CO2 Saved", value: "42.5 kg", icon: "🌱" },
          { label: "Eco-Credits", value: "2,450", icon: "🪙" }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl text-center border-white/5 hover:border-green-500/30 transition-colors">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* 3. Account Details */}
      <div className="glass p-8 rounded-[40px] border-white/5">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Activity Timeline
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4 border-l-2 border-white/10 ml-2 pl-6 relative">
             <div className="absolute -left-[9px] top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-[#0f172a]"></div>
             <div>
               <p className="text-sm font-bold">Scanned 12kg Rubber Scraps</p>
               <p className="text-xs text-slate-500">2 hours ago • Sector 24, Faridabad</p>
             </div>
          </div>
          <div className="flex gap-4 border-l-2 border-white/10 ml-2 pl-6 relative">
             <div className="absolute -left-2.25 top-0 w-4 h-4 bg-slate-700 rounded-full border-4 border-[#0f172a]"></div>
             <div>
               <p className="text-sm font-bold">Listed Denim Waste in Marketplace</p>
               <p className="text-xs text-slate-500">Yesterday • Symbiosis AI</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;