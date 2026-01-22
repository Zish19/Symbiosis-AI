import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  // 🚨 Secret Sauce: Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const isActive = (path) => location.pathname === path ? 'text-green-400' : 'hover:text-green-400';

  return (
    <nav className="flex justify-between items-center p-6 bg-slate-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-green-400 flex items-center gap-2 tracking-tighter">
        <span>♻️</span> Symbiosis AI
      </Link>
      
      <div className="flex gap-8 items-center font-medium">
        <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
        <Link to="/scanner" className={`${isActive('/scanner')} transition-colors`}>AI Scanner</Link>
        <Link to="/marketplace" className={`${isActive('/marketplace')} transition-colors`}>Marketplace</Link>
        <Link to="/dashboard" className={`${isActive('/dashboard')} transition-colors`}>Impact</Link>
        
        {/* 🚨 DYNAMIC AUTH BUTTON: Shows Profile if logged in, otherwise Login */}
        {user ? (
          <Link to="/profile" className="flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-white/10 hover:border-green-500/50 transition-all active:scale-95">
            <img 
              src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Ruchi"} 
              className="w-7 h-7 rounded-full border border-green-500/30" 
              alt="Profile" 
            />
            <span className="text-sm font-bold text-white uppercase tracking-tighter">Account</span>
          </Link>
        ) : (
          <Link to="/login" className="ml-4 px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-all active:scale-95">
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;