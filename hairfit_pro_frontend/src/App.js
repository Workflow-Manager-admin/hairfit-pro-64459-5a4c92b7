import React from 'react';
import Homepage from './Homepage';
import ProfileQuiz from './ProfileQuiz';
import RoutinePlanner from './RoutinePlanner';
import Journal from './Journal';
import Blog from './Blog';
import BlogDetail from './BlogDetail';
import CommunityQA from './CommunityQA';
import AboutAndContact from './AboutAndContact';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import './App.css';

// Responsive Navbar as a component
function Navbar() {
  // Highlight route, close mobile nav if desired, etc.
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // List of nav items: label, route
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Profile", to: "/profile" },
    { label: "Routine", to: "/routine" },
    { label: "Blog", to: "/blog" },
    { label: "Community", to: "/community" },
    { label: "Journal", to: "/journal" },
    { label: "About/Contact", to: "/about" },
  ];

  // When route changes, close mobile nav
  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar" style={{padding: 0, minHeight: 0}}>
      <div
        className="container"
        style={{
          width: "100%",
          padding: 0,
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 56,
        }}
      >
        <Link to="/" className="logo" style={{ textDecoration: "none", color: "#4A90E2", fontWeight: 600, fontSize: "1.28rem", display: "flex", alignItems: "center" }}>
          <span className="logo-symbol" style={{ color: "#50E3C2", fontWeight: 900, fontSize: "1.45em", marginRight: 7 }}>*</span>
          Hairfit
        </Link>
        {/* Desktop nav */}
        <ul className="nav-menu-desktop"
            style={{
              display: "flex",
              gap: 22,
              alignItems: "center",
              listStyle: "none",
              margin: 0,
              padding: 0
            }}>
          {navItems.map(item => (
            <li key={item.to} style={{margin: 0, padding: 0}}>
              <Link to={item.to}
                style={{
                  textDecoration: "none",
                  color:
                    location.pathname === item.to
                      || (item.to === "/" && location.pathname === "/")
                        ? "#F5A623" : "#fff",
                  fontWeight: location.pathname === item.to ? 900 : 500,
                  fontSize: "1.08rem",
                  borderBottom: location.pathname === item.to ? "2.2px solid #F5A623" : "2.2px solid transparent",
                  padding: "3px 0",
                  transition: "color 0.13s, border 0.18s"
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Hamburger icon, only show on mobile */}
        <button
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="nav-mobile-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 29,
            marginLeft: 15,
            zIndex: 102,
            cursor: "pointer"
          }}
          onClick={() => setMobileOpen(m => !m)}
        >
          <span role="img" aria-label="Menu">
            {mobileOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>
      {/* Mobile nav drawer */}
      <div
        className="nav-drawer"
        style={{
          display: mobileOpen ? "flex" : "none",
          flexDirection: "column",
          position: "fixed",
          top: 0, left: 0, right: 0,
          background: "#0a1628d8",
          zIndex: 101,
          paddingTop: 70,
          paddingBottom: 16,
        }}
      >
        <ul style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 0
        }}>
          {navItems.map(item => (
            <li key={item.to}
                style={{
                  width: "100%",
                  margin: 0
                }}>
              <Link
                to={item.to}
                style={{
                  display: "block",
                  padding: "19px 25px",
                  textDecoration: "none",
                  fontSize: "1.21rem",
                  color: location.pathname === item.to
                    ? "#F5A623"
                    : "#fff",
                  fontWeight: location.pathname === item.to ? 900 : 500,
                  background:
                    location.pathname === item.to
                      ? "#1a333b"
                      : "none",
                  borderBottom: "1px solid #282f3c",
                  transition: "background .13s"
                }}
              >{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Responsive styles within component to override default */}
      <style>
        {`
        @media (max-width: 850px) {
          .nav-menu-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 851px) {
          .nav-mobile-btn { display: none !important; }
          .nav-drawer { display: none !important; }
        }
        `}
      </style>
    </nav>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div className="app" style={{minHeight: "100vh", background: "var(--base-dark, #00008b)"}}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<ProfileQuiz />} />
            <Route path="/routine" element={<RoutinePlanner />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/community" element={<CommunityQA />} />
            <Route path="/about" element={<AboutAndContact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
