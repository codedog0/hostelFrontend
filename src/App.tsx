
import './App.css'
import LoginForm from './pages/LoginForm.tsx'
import Leaderboards from './pages/Leaderboards.tsx' 
import {  Route, Routes, Link } from 'react-router';
import Dashboard from './pages/DashBoard.tsx';
function App() {

  return (
    <>
            <nav>
              <div>
                
                <ul>
                    <li><Link to="/">Allotment Status</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
              </div>
            </nav>
            <Routes>
                <Route path="/" element={<Leaderboards />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookRoom" element={<Dashboard />} />
            </Routes>
    </>
  )
}

export default App
