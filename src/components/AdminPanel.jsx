import React from 'react';
import ViewMembers from './ViewMembers';
import AddMember from './AddMember';
import AdminInfoForm from './AdminInfoForm';
import MemberShipHistory from './MemberShipHistory';
import MemberHistory from './MemberHistory';
import { useAdminPanelNavigation } from '../hooks/useAdminPanelNavigation';

function AdminPanel() {
  const {
    activePage,
    isNavbarOpen,
    toggleNavbar,
    goToPage,
  } = useAdminPanelNavigation();

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

  return (
    <>
      <nav 
  className="navbar navbar-expand-lg navbar-light shadow-sm"
  style={{ backgroundColor: "hsla(120, 36%, 72%, 1.00)" }}
>
  <div className="container">
    <a className="navbar-brand fw-bold" href="#">
      <img src="/logo-03-05.png" alt="Logo" width="160" className="me-2" /> Admin Panel
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
              {[
                { key: 'view', label: 'View Members' },
                { key: 'add', label: 'Add Member' },
                { key: 'editAdmin', label: 'Edit Admin Info' },
                { key: 'membershipHistory', label: 'MemberShip History' },
                { key: 'memberHistory', label: 'Member History' },
              ].map((item) => (
                <li className="nav-item" key={item.key}>
                  <button
                    className="nav-link btn btn-link fw-bold"
                    onClick={() => goToPage(item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
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
