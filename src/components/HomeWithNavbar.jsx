import { useState } from 'react';
import MembershipPage from './MembershipPage';
import LandingSection from './LandingSection';
import UpdateMemberShipCard from './UpdateMemberShipCard';
import { useNavigate } from 'react-router-dom';

function HomeWithNavbar() {
  const [screen, setScreen] = useState('home');
  const navigate = useNavigate();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // ✅ toggle state

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/طط.webp" alt="Logo" width="180" />
          </a>

          {/* ✅ Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isNavbarOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* ✅ Conditional collapse class */}
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setScreen('home');
                    closeNavbar();
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setScreen('membership');
                    closeNavbar();
                  }}
                >
                  Membership
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setScreen('update');
                    closeNavbar();
                  }}
                >
                  Update Information
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-bold login-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    navigate('/login');
                    closeNavbar();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        {screen === 'home' && <LandingSection />}
        {screen === 'membership' && <MembershipPage />}
        {screen === 'update' && <UpdateMemberShipCard />}
      </div>
    </>
  );
}

export default HomeWithNavbar;
