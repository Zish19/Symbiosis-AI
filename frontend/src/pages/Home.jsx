import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Decorative background blobs for that 'Premium' look */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />

      <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
        RECYCLE <span className="bg-linear-to-r from-green-400 via-emerald-500 to-blue-500 bg-clip-text text-transparent animate-gradient">FOR PROFIT.</span>
      </h1>
      
      <p className="text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
        Transforming industrial waste into a high-value resource. We empower <span className="text-white font-bold">MSMEs in Ghaziabad</span> through AI-driven material matching and transparent supply chains.
      </p>

      <div className="flex flex-wrap gap-6 justify-center">
        <Link to="/scanner" className="px-10 py-4 bg-green-500 text-black font-black rounded-full hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all uppercase tracking-widest active:scale-95">
          Scan Waste
        </Link>
        <Link to="/marketplace" className="px-10 py-4 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-all active:scale-95">
          View Marketplace
        </Link>
      </div>
    </div>
  );
};

// 🚨 THIS IS THE LINE YOU WERE MISSING!
export default Home;