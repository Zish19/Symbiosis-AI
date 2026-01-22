import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas' 
import { Upload, MapPin, AlertTriangle, Leaf, Download, Share2, Award } from 'lucide-react'

// --- 1. CERTIFICATE COMPONENT (Fixed Layout & Name) ---
const CertificatePopup = ({ data, onClose }) => {
  const certRef = useRef(null);

  const handleDownload = async () => {
    if (certRef.current) {
      try {
        // High Quality Capture
        const canvas = await html2canvas(certRef.current, { 
          useCORS: true, 
          scale: 3, // Higher scale for crisp text
          backgroundColor: '#FDFBF7' // Ensure paper color matches
        });
        const link = document.createElement('a');
        link.download = `Certificate_Shivam_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error("Download Error:", err);
        alert("Download failed. Make sure 'html2canvas' is installed!");
      }
    }
  };

  return (
    // DARK OVERLAY
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.85)',
      zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      
      {/* MAIN CONTAINER */}
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 z-50 font-bold bg-white rounded-full p-2 shadow-md transition"
        >
          ✕ Close
        </button>

        {/* LEFT PANEL: Actions (White) */}
        <div className="bg-white p-8 md:w-1/3 border-r border-gray-100 flex flex-col justify-center gap-6 z-10">
          <div>
            <h3 className="font-bold text-2xl text-gray-900">Your Impact</h3>
            <p className="text-sm text-gray-500 mt-2">
              Great job, Shivam! This document certifies your contribution to a greener planet.
            </p>
          </div>
          
          <div className="space-y-3">
            <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg hover:shadow-green-200">
              <Download size={20} /> Download Certificate
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
              <Share2 size={20} /> Share
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: The Certificate Paper (Ivory Background) */}
        <div className="p-6 md:w-2/3 bg-gray-100 flex items-center justify-center overflow-auto">
          
          {/* THE ACTUAL CERTIFICATE (Referenced for Screenshot) */}
          <div 
            ref={certRef} 
            className="w-full max-w-[600px] aspect-[1/1.4] md:aspect-[4/3] relative flex flex-col items-center text-center shadow-xl p-8 md:p-12"
            style={{ 
              backgroundColor: '#FDFBF7', // Ivory Paper Color
              border: '12px double #15803d' // Thick Green Border
            }}
          >
            
            {/* CORNER DECORATIONS */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-green-700 opacity-30"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-green-700 opacity-30"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-green-700 opacity-30"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-green-700 opacity-30"></div>

            {/* CONTENT STACK */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full z-10">
              
              {/* Badge */}
              <div className="bg-green-100 text-green-700 p-4 rounded-full mb-2">
                <Award size={48} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-wider uppercase mb-2">Certificate</h1>
                <div className="h-1 w-24 bg-green-600 mx-auto"></div>
                <h2 className="text-sm font-bold text-green-700 tracking-[0.3em] uppercase mt-3">of Sustainability</h2>
              </div>

              {/* Presented To */}
              <div className="w-full">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Presented To</p>
                <p className="text-2xl md:text-3xl font-serif font-bold text-gray-800 border-b border-gray-300 pb-2 inline-block px-10">
                  Shivam
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-8 w-full mt-4">
                <div className="bg-white/50 p-3 rounded-lg border border-green-100">
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Carbon Offset</p>
                  <p className="font-bold text-2xl text-gray-900">{data?.analysis?.carbon_saved || "1.5 kg"}</p>
                </div>
                <div className="bg-white/50 p-3 rounded-lg border border-green-100">
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Material Saved</p>
                  <p className="font-bold text-lg text-gray-900 leading-tight">
                    {data?.analysis?.material || "Recycled Paper"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between items-end mt-8 pt-4 border-t border-gray-200">
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase">Date</p>
                <p className="text-xs font-bold text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
              
              {/* Fake Signature */}
              <div className="text-right">
                <p className="font-cursive text-xl text-green-800 opacity-80" style={{ fontFamily: 'cursive' }}>Symbiosis AI</p>
                <p className="text-[10px] text-gray-400 uppercase border-t border-gray-300 pt-1 mt-1">Verified By</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// --- 2. MAIN APP COMPONENT ---
function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [showCert, setShowCert] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult(null) 
    setError(null)
    setShowCert(false)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', formData)
      console.log("Backend Response:", response.data)
      setResult(response.data)
    } catch (err) {
      console.error("Full Error:", err)
      setError("Failed to analyze image. Check backend terminal.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <h1 className="text-xl font-bold text-eco-dark tracking-tight">Symbiosis AI</h1>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm">
            Connect Wallet
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto mt-10 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Industrial Audit Engine</h2>
          <p className="text-gray-500 mt-2">Upload waste sample for AI-powered composition & value analysis.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50 hover:bg-green-50/50 transition cursor-pointer relative group">
            <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <Upload className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-700">Drop your industrial sample here</p>
            <p className="text-sm text-gray-400 mt-1">{file ? file.name : "Supports JPG, PNG"}</p>
          </div>

          {file && (
             <div className="mt-6">
              <button 
                onClick={handleUpload} 
                disabled={loading}
                className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 font-semibold shadow-lg w-full md:w-auto"
              >
                {loading ? "Analyzing..." : "Run AI Analysis"}
              </button>
            </div>
          )}
          
          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
        </div>

        {/* RESULTS SECTION */}
        {result && result.analysis && (
          <div className="mt-10 animate-fade-in space-y-6">
            
            {/* AI Report Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gray-900 text-white p-4 px-6 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2"><span className="text-green-400">●</span> AI Audit Report</h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Detected Material</p>
                  <p className="text-2xl font-black text-gray-900 leading-tight">{result.analysis.material}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">Confidence: {(result.analysis.confidence * 100).toFixed(1)}%</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <div><p className="font-bold text-gray-900">Hazard Level</p><p className="text-gray-500">{result.analysis.hazard_level}</p></div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Leaf className="w-4 h-4 text-blue-500" />
                    <div><p className="font-bold text-gray-900">Carbon Saved</p><p className="text-gray-500">{result.analysis.carbon_saved}</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* CLAIM CERTIFICATE BUTTON */}
            <button 
              onClick={() => {
                console.log("Opening Certificate...");
                setShowCert(true);
              }}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.02]"
            >
              <Award className="w-5 h-5" /> Claim Green Certificate
            </button>

            {/* Matched Buyers */}
            <div>
               <h4 className="text-lg font-bold text-gray-900 mb-4">Matched Buyers</h4>
               <div className="grid md:grid-cols-2 gap-4">
                {result.recommended_buyers.map((buyer, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-green-500 transition">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-bold text-gray-900">{buyer.name}</h5>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">₹{buyer.price}/kg</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> {buyer.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- POPUP RENDER --- */}
        {showCert && (
            <CertificatePopup data={result} onClose={() => setShowCert(false)} />
        )}

      </main>
    </div>
  )
}

export default App