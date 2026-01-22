import { useState } from 'react'
import axios from 'axios'
import { Upload, CheckCircle, MapPin, DollarSign, AlertTriangle, Leaf, Recycle } from 'lucide-react'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null) // New error state

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult(null) 
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', formData)
      console.log("Backend Response:", response.data) // <--- CHECK THIS IN CONSOLE
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
          <button className="bg-eco-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium text-sm">
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
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-10 h-10 text-eco-green mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-700">Drop your industrial sample here</p>
          </div>

          {file && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <span className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                {file.name}
              </span>
              <button 
                onClick={handleUpload} 
                disabled={loading}
                className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 font-semibold shadow-lg shadow-gray-200"
              >
                {loading ? "Analyzing..." : "Run AI Analysis"}
              </button>
            </div>
          )}
          
          {/* Error Message Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* SAFE RESULT RENDERING */}
        {result && result.analysis && (
          <div className="mt-10 animate-fade-in space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gray-900 text-white p-4 px-6 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="text-green-400">●</span> AI Audit Report
                </h3>
              </div>
              
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Detected Material</p>
                  {/* The ? prevents crashing if analysis is missing */}
                  <p className="text-2xl font-black text-gray-900 leading-tight">
                    {result?.analysis?.material || "Unknown Material"}
                  </p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Confidence: {((result?.analysis?.confidence || 0) * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="font-bold text-gray-900">Hazard Level</p>
                      <p className="text-gray-500">{result?.analysis?.hazard_level || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Leaf className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="font-bold text-gray-900">Est. Carbon Saved</p>
                      <p className="text-gray-500">{result?.analysis?.carbon_saved || "N/A"}</p>
                    </div>
                  </div>
                   <div className="flex items-center gap-3 text-sm">
                    <Recycle className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="font-bold text-gray-900">Recycling Method</p>
                      <p className="text-gray-500 line-clamp-1">{result?.analysis?.recycling_process || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
               <h4 className="text-lg font-bold text-gray-900 mb-4">Matched Buyers</h4>
               <div className="grid md:grid-cols-2 gap-4">
                {/* Safe Map: Checks if recommended_buyers exists first */}
                {result?.recommended_buyers?.map((buyer, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-bold text-gray-900">{buyer.name}</h5>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">
                        ₹{buyer.price}/kg
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" /> {buyer.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App