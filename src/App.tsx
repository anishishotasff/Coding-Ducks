import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dojo from './pages/Dojo';
import Duels from './pages/Duels';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import ParticleBackground from './components/ParticleBackground';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ParticleBackground />
        <KeyboardShortcuts />
        <nav className="navbar">
          <div className="nav-brand">
            <span className="duck-icon">🦆</span>
            <h1>Coding Ducks</h1>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dojo">Dojo</Link>
            <Link to="/duels">Duels</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dojo" element={<Dojo />} />
          <Route path="/duels" element={<Duels />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
