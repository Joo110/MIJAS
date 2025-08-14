import React, { useState } from 'react';
import ViewMembers from './ViewMembers';
import AddMember from './AddMember';
import AdminInfoForm from './AdminInfoForm';
// لو عندك الملفات دول استبدلهم باللي عندك
import MemberShipHistory from './MemberShipHistory';  // لازم تعمل الملف ده
import MemberHistory from './MemberHistory';          // ولازم كمان الملف ده

function AdminPanel() {
  const [activePage, setActivePage] = useState('view');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'view':
        return <ViewMembers />;
      case 'add':
        return <AddMember />;
      case 'editAdmin':
        return <AdminInfoForm />;
      case 'membershipHistory':
        return <MemberShipHistory />;
      case 'memberHistory':
        return <MemberHistory />;
      default:
        return <ViewMembers />;
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <img src="/طط.webp" alt="Logo" width="160" className="me-2" /> Admin Panel
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
                  className="nav-link btn btn-link fw-bold"
                  onClick={() => {
                    setActivePage('view');
                    closeNavbar();
                  }}
                >
                  View Members
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link fw-bold"
                  onClick={() => {
                    setActivePage('add');
                    closeNavbar();
                  }}
                >
                  Add Member
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link fw-bold"
                  onClick={() => {
                    setActivePage('editAdmin');
                    closeNavbar();
                  }}
                >
                  Edit Admin Info
                </button>
              </li>
              {/* الخيارات الجديدة */}
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link fw-bold"
                  onClick={() => {
                    setActivePage('membershipHistory');
                    closeNavbar();
                  }}
                >
                  MemberShip History
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link fw-bold"
                  onClick={() => {
                    setActivePage('memberHistory');
                    closeNavbar();
                  }}
                >
                  Member History
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        {renderPage()}
      </div>
    </>
  );
}

export default AdminPanel;
