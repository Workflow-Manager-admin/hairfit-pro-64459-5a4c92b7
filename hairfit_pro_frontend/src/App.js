import React from 'react';
import Homepage from './Homepage';
import ProfileQuiz from './ProfileQuiz';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// PUBLIC_INTERFACE
import RoutinePlanner from './RoutinePlanner';
import Journal from './Journal';
import Blog from './Blog';
import BlogDetail from './BlogDetail';
import CommunityQA from './CommunityQA';
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
            <Route path="/profile" element={<ProfileQuiz />} />
            <Route path="/routine" element={<RoutinePlanner />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/community" element={<CommunityQA />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
