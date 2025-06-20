import React from 'react';
import './App.css';
import Homepage from './Homepage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function Profile() {
  // Placeholder for Profile page
  return (
    <div style={{ paddingTop: '120px', textAlign: 'center' }}>
      <h2 style={{ color: "#4A90E2" }}>Profile Page</h2>
      <p>This is where users find their hair type.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo" style={{ color: "#4A90E2" }}>
                <span className="logo-symbol" style={{ color: "#50E3C2" }}>*</span> Hairfit
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;