import { useState } from 'react';
import axios from 'axios';

const AIScanner = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Bhai, upload a photo first!");
    
    setLoading(true);
    setResult(null); 
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 🚨 Aligned with your Uvicorn Port 8000
      const response = await axios.post('http://127.0.0.1:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setResult(response.data);
    } catch (error) {
      console.error("Scanning Failed:", error);
      alert("Backend is not responding. Ensure backend.py is running on http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent uppercase italic tracking-tighter">
          Industrial Waste Auditor
        </h1>
        <p className="text-slate-400 font-medium">Standardize scrap. Track impact. Find verified buyers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* LEFT: Upload Section */}
        <div className="glass p-8 rounded-[40px] border-white/5 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"></div>
          
          <div className="mb-8 p-12 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center group hover:border-green-500/40 transition-all">
             <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">📸</span>
             <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])}
                className="text-xs font-black text-slate-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:bg-green-500 file:text-black cursor-pointer"
             />
             {file && <p className="mt-4 text-green-400 font-bold text-xs uppercase tracking-widest">Ready: {file.name}</p>}
          </div>

          <button 
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-5 bg-green-500 text-black font-black rounded-2xl shadow-xl shadow-green-900/20 hover:bg-green-400 transition-all uppercase tracking-widest disabled:opacity-50 text-lg active:scale-95"
          >
            {loading ? "AI is Auditing..." : "Analyze Material"}
          </button>
        </div>

        {/* RIGHT: Analysis Results */}
        <div className="space-y-6">
          {result ? (
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              {/* 1. Header Card */}
              <div className="glass p-8 rounded-[40px] border-white/5 mb-6 bg-gradient-to-br from-green-500/5 to-transparent">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-4 py-1 bg-green-500/10 text-green-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-500/20">
                    {result.analysis?.category}
                  </span>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confidence</p>
                    <p className="text-2xl font-black text-white">{(result.analysis?.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">{result.analysis?.material}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{result.analysis?.recycling_process}</p>
              </div>

              {/* 2. Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass p-6 rounded-3xl border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Estimated Value</p>
                  <p className="text-xl font-black text-green-400">₹{result.analysis?.estimated_value_inr}/kg</p>
                </div>
                <div className="glass p-6 rounded-3xl border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Carbon Saved</p>
                  <p className="text-xl font-black text-blue-400">{result.analysis?.carbon_saved}</p>
                </div>
              </div>

              {/* 3. Hazard Alert */}
              <div className={`p-6 rounded-3xl border flex items-center gap-4 ${
                result.analysis?.hazard_level === 'Low' ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
              }`}>
                <span className="text-2xl">{result.analysis?.hazard_level === 'Low' ? '✅' : '⚠️'}</span>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hazard Level</p>
                  <p className={`font-black uppercase tracking-tighter ${
                    result.analysis?.hazard_level === 'Low' ? 'text-green-400' : 'text-red-400'
                  }`}>{result.analysis?.hazard_level} Risk</p>
                </div>
              </div>

              {/* 4. Buyers List */}
              <div className="mt-8">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 ml-2">Verified Buyers</h3>
                <div className="space-y-3">
                  {result.recommended_buyers?.map((buyer, i) => (
                    <div key={i} className="glass p-5 rounded-3xl border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors">
                      <div>
                        <p className="text-sm font-black text-white">{buyer.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{buyer.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-green-400 tracking-tighter">₹{buyer.price}/kg</p>
                        <p className="text-[8px] font-black text-slate-600 uppercase">Live Quote</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center glass rounded-[40px] border-dashed border-white/10 p-12 text-center text-slate-600">
               <span className="text-6xl mb-6 opacity-20">🔬</span>
               <p className="text-sm font-bold uppercase tracking-widest">Awaiting Analysis...</p>
               <p className="text-xs mt-2 px-10">Upload a clear photo of the waste material to generate the auditor report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIScanner;