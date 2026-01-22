import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LiveBg from './components/LiveBg'; 
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import AIScanner from './pages/AIScanner';
import Login from './pages/Login';
import Profile from './pages/Profile'; // 🚨 IMPORT THE NEW PAGE

function App() {
  return (
    <Router>
      <div className="relative min-h-screen font-sans selection:bg-green-500/30 overflow-x-hidden">
        
        {/* 1. The Recycling-Themed Background */}
        <LiveBg /> 

        {/* 2. The Smart Navigation */}
        <Navbar />

        {/* 3. The Page Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scanner" element={<AIScanner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} /> {/* 🚨 ROUTE ADDED */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;