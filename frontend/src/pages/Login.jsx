import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; // Ensure you created this file
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // 1. Google Login Logic
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Logged in as:", result.user.displayName);
      navigate('/dashboard'); // Redirect to Impact page
    } catch (error) {
      console.error("Google Login Error:", error.message);
      alert("Google Login Failed. Check your Firebase Config.");
    }
  };

  // 2. OTP Trigger Logic
  const triggerOtp = () => {
    if (!email) {
      alert("Please enter an email or phone first!");
      return;
    }
    // In a real app, you'd call your Firebase/Backend API here
    setIsOtpSent(true);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="glass p-10 rounded-[40px] w-full max-w-md text-center border-white/5 relative overflow-hidden">
        
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"></div>

        <h1 className="text-3xl font-black mb-2 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          {isOtpSent ? "Verify OTP" : "Secure Login"}
        </h1>
        <p className="text-slate-400 mb-8 text-sm">
          {isOtpSent ? `Code sent to ${email}` : "Step into the future of recycling."}
        </p>

        {!isOtpSent ? (
          <div className="space-y-4">
            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-200 transition-all active:scale-95"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="Google" />
              Sign in with Google
            </button>

            <div className="flex items-center my-6 gap-2">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">Or Email</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <input 
              type="email" 
              placeholder="Email or Phone" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-green-400 outline-none transition-all text-white"
            />

            <div id="recaptcha-container" className="my-4 flex justify-center">
               <div className="bg-white/5 border border-dashed border-white/20 p-4 rounded-xl text-[10px] text-slate-500 uppercase">
                 [ Human Verification Active ]
               </div>
            </div>

            <button 
              onClick={triggerOtp}
              className="w-full py-4 bg-green-500 text-black font-black rounded-xl shadow-lg shadow-green-900/20 hover:bg-green-400 transition-all uppercase tracking-widest"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between gap-2">
              {[...Array(6)].map((_, i) => (
                <input 
                  key={i}
                  type="text" 
                  maxLength="1"
                  className="w-12 h-14 text-center text-2xl font-black bg-white/5 border border-white/10 rounded-xl focus:border-green-400 outline-none transition-all text-white"
                />
              ))}
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-green-500 text-black font-black rounded-xl shadow-lg shadow-green-900/20 hover:bg-green-400 transition-all uppercase tracking-widest"
            >
              Verify & Enter
            </button>
            
            <button 
              onClick={() => setIsOtpSent(false)}
              className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
            >
              ← Use a different email
            </button>
          </div>
        )}

        <p className="mt-8 text-xs text-slate-500">
          By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;