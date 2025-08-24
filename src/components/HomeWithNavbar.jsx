import { useState, useEffect } from 'react';
import MembershipPage from './MembershipPage';
import LandingSection from './LandingSection';
import UpdateMemberShipCard from './UpdateMemberShipCard';
import { useNavigate } from 'react-router-dom';

function HomeWithNavbar() {
const [screen, setScreen] = useState(
  localStorage.getItem('token') ? 'membership' : 'home'
);
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const getLinkStyle = (page) => ({
    fontSize: '18px',
    marginLeft: '25px',
    fontWeight: 'bold',
    color: screen === page ? 'white' : 'black',
    transition: 'color 0.3s',
    cursor: 'pointer',
  });

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
    closeNavbar();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{ backgroundColor: 'hsla(120, 24%, 64%, 1.00)' }}
      >
        <div className="container">
          <a className="navbar-brand text-white fw-bold" href="#">
            <img src="/logo-03-05.png" alt="Logo" width="180" />
          </a>

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

          <div
            className={`collapse navbar-collapse ${
              isNavbarOpen ? 'show' : ''
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      style={getLinkStyle('home')}
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
                      className="nav-link"
                      href="#"
                      style={getLinkStyle('membership')}
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
                      className="nav-link"
                      href="#"
                      style={getLinkStyle('update')}
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
                    <button
                      className="nav-link login-link btn btn-link"
                      style={{
                        ...getLinkStyle('auth'),
                        textDecoration: 'none',
                      }}
                      onClick={handleAuthClick}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      style={getLinkStyle('login')}
                      onClick={handleAuthClick}
                      onMouseEnter={(e) => (e.target.style.color = 'white')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                    >
                      Login
                    </button>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#join"
                      style={getLinkStyle('join')}
                      onMouseEnter={(e) => (e.target.style.color = 'white')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                      onClick={(e) => {
                        e.preventDefault();
                        setScreen("home");
                        closeNavbar();
                        setTimeout(() => {
                          document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
                        }, 200);
                      }}
                    >
                      Join
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      style={getLinkStyle('partners')}
                      onClick={(e) => {
                        e.preventDefault();
                        setScreen('home');
                        setTimeout(() => {
                          document.getElementById("partners")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                        closeNavbar();
                      }}
                      onMouseEnter={(e) => (e.target.style.color = 'white')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                    >
                      Partners
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      
      {/* تم تحريك LandingSection هنا خارج الـ div الخاص بالـ container */}
      {screen === 'home' && <LandingSection />}

        {screen === 'membership' && <MembershipPage />}
        {screen === 'update' && <UpdateMemberShipCard />}

    </>
  );
}

export default HomeWithNavbar;