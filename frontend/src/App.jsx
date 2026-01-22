import { useState } from 'react'
import axios from 'axios'
import { Upload, CheckCircle, MapPin, DollarSign } from 'lucide-react'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      // Connects to your Python Backend
      const response = await axios.post('http://127.0.0.1:8000/predict', formData)
      setResult(response.data)
    } catch (error) {
      console.error("Backend error:", error)
      alert("Error connecting to backend. Is python backend.py running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-eco-dark flex items-center gap-2">
            ♻️ Symbiosis AI
          </h1>
          <button className="bg-eco-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto mt-10 p-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Turn Waste into Revenue</h2>
          <p className="text-gray-500">Upload your industrial scrap. AI finds the buyers.</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 hover:bg-gray-50 transition cursor-pointer relative">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-12 h-12 text-eco-green mx-auto mb-4" />
            <p className="text-lg font-medium">Click to upload or drag image here</p>
            <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG</p>
          </div>

          {file && (
            <div className="mt-4 flex justify-center items-center gap-4">
              <span className="text-sm font-semibold">{file.name}</span>
              <button 
                onClick={handleUpload} 
                disabled={loading}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Waste"}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-10 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Analysis Results</h3>
            
            {/* AI Diagnosis */}
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl mb-6 flex items-start gap-4">
              <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg text-green-900">Material Detected: {result.analysis.material}</h4>
                <p className="text-green-700">AI Confidence: {(result.analysis.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>

            {/* Buyer Matches */}
            <h4 className="text-xl font-bold mb-4">Matched Buyers Nearby</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommended_buyers.map((buyer, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-bold text-lg">{buyer.name}</h5>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Verified</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {buyer.location}
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-black">
                      <DollarSign className="w-4 h-4" /> Price: ₹{buyer.price}/kg
                    </div>
                  </div>
                  <button className="w-full mt-4 border border-black text-black py-2 rounded-lg hover:bg-black hover:text-white transition">
                    Contact Buyer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App