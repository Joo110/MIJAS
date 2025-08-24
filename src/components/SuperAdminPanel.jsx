import React, { useState } from 'react';
import ViewAdmins from './ViewAdmins';
import CreateAdminForm from './CreateAdminForm';
import './SuperAdminPanel.css';

function SuperAdminPanel() {
  const [activePage, setActivePage] = useState('view-admins');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  

  const renderPage = () => {
    switch (activePage) {
      case 'view-admins':
        return (
          <div className="table-responsive">
            <ViewAdmins />
          </div>
        );
      case 'create-admin':
        return <CreateAdminForm />;
      default:
        return <ViewAdmins />;
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <>
      <nav 
  className="navbar navbar-expand-lg shadow-sm" 
  style={{ backgroundColor: "hsla(120, 36%, 72%, 1.00)" }}
>
  <div className="container-fluid">
    <a className="navbar-brand fw-bold" href="#">
            <img src="/logo-03-05.png" alt="Logo" width="140" />
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

          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="nav-link btn fw-bold"
                  onClick={() => {
                    setActivePage('view-admins');
                    closeNavbar();
                  }}
                >
                  View Admins
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn fw-bold"
                  onClick={() => {
                    setActivePage('create-admin');
                    closeNavbar();
                  }}
                >
                  Create New Admin
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        {renderPage()}
      </div>
    </>
  );
}

export default SuperAdminPanel;
