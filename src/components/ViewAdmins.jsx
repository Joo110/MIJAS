'use client';
import React, { useState } from 'react';
import AdminDetailsCard from './AdminDetailsCard';
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { useAdmins, useToggleAdminStatus } from '../hooks/useAdmins';
import './ViewAdmins.css';

export default function ViewAdmins() {
  const [searchBy, setSearchBy] = useState('');
  const [search, setSearch] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, adminId: null });
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useAdmins({ pageNumber, pageSize });
  const { activate, deactivate } = useToggleAdminStatus();
  const verifyEmail = useVerifyEmail();

  const [localAdmins, setLocalAdmins] = useState([]);
  const admins = localAdmins.length ? localAdmins : (data?.admins || []);

  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  React.useEffect(() => {
    if (data?.admins) setLocalAdmins(data.admins);
  }, [data]);

  // فلترة حسب البحث (client-side)
  const filteredAdmins = admins.filter((admin) => {
    if (!searchBy || !search) return true;
    const value = (admin[searchBy] || '').toString().toLowerCase();
    return value.includes(search.toLowerCase());
  });

  // نعرض القائمة (مركزيًا) بدل إحداثيات الماوس
  const openContextMenuCentered = (id) => {
    setContextMenu({ visible: true, adminId: id });
  };

  const handleRightClick = (e, id) => {
    e.preventDefault();
    openContextMenuCentered(id);
  };

  const handleOptionsClick = (id, e) => {
    e?.stopPropagation();
    openContextMenuCentered(id);
  };

  const handleCloseMenu = () => setContextMenu({ visible: false, adminId: null });

  const handleActivate = (id) => {
    activate.mutate(id, {
      onSuccess: () => {
        alert('✅ Admin activated successfully');
        setLocalAdmins(prev =>
          prev.map(a => a.id === id ? { ...a, isActiveUser: true } : a)
        );
      },
      onError: () => alert('⚠️ Failed to activate admin')
    });
    handleCloseMenu();
  };

  const handleDeactivate = (id) => {
    deactivate.mutate(id, {
      onSuccess: () => {
        alert('🛑 Admin deactivated successfully');
        setLocalAdmins(prev =>
          prev.map(a => a.id === id ? { ...a, isActiveUser: false } : a)
        );
      },
      onError: () => alert('⚠️ Failed to deactivate admin')
    });
    handleCloseMenu();
  };

  const handleViewDetails = (id) => {
    setSelectedAdminId(id);
    handleCloseMenu();
  };

  const handleVerifyEmail = (id) => {
    verifyEmail.mutate(id, {
      onSuccess: () => {
        alert("📧 Verification email sent successfully!");
        setLocalAdmins(prev =>
          prev.map(a => a.id === id ? { ...a, emailIsVerified: true } : a)
        );
      },
      onError: () => alert("⚠️ Failed to send verification email"),
    });
    handleCloseMenu();
  };

  if (isLoading) return <p className="text-center mt-5">Loading admins...</p>;



  return (
    <div className="container mt-5" onClick={handleCloseMenu}>
      <h3 className="mb-4 text-center">View Admins</h3>

      {/* Search */}
      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
            <option value="">Search By...</option>
            <option value="id">ID</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${searchBy || '...'}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!searchBy}
          />
        </div>
      </div>

      {/* Table */}
      {filteredAdmins.length === 0 ? (
  <p className="text-center text-muted">🚫 No admins found.</p>
) : (
  <div style={{ overflowX: 'auto' }}>
    <table className="table table-bordered shadow">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Email Verified</th>
          <th>Status</th>
          {/* عمود الخيارات يظهر بس في الموبايل */}
          <th className="d-table-cell d-md-none text-center">Options</th>
        </tr>
      </thead>
      <tbody>
        {filteredAdmins.map((admin, index) => (
          <tr key={admin.id} onContextMenu={(e) => handleRightClick(e, admin.id)}>
            <td>{(pageNumber - 1) * pageSize + index + 1}</td>
            <td>{admin.username}</td>
            <td>{admin.firstName} {admin.lastName}</td>
            <td>{admin.email}</td>
            <td>
              {admin.emailIsVerified ? (
                <span className="badge bg-success">Verified</span>
              ) : (
                <span className="badge bg-warning">Not Verified</span>
              )}
            </td>
            <td>
              {admin.isActiveUser
                ? <span className="badge bg-success">Active</span>
                : <span className="badge bg-secondary">Inactive</span>}
            </td>
            {/* عمود الزرار ⋮ يظهر بس في الموبايل */}
            <td className="text-center d-table-cell d-md-none">
              <button
                className="table-options-btn"
                style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}
                onClick={(e) => handleOptionsClick(admin.id, e)}
                aria-label="Options"
              >
                ⋮
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <li key={i + 1} className={`page-item ${pageNumber === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPageNumber(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Context Menu centered */}
{contextMenu.visible && (
  <>
    {/* Overlay */}
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.1)',
        zIndex: 999,
      }}
      onClick={handleCloseMenu}
    />

    {/* Menu */}
    <ul
      className="custom-context-menu bg-white border rounded shadow"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        listStyle: 'none',
        padding: 0,
        width: '220px',
        background: '#ffffffff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '8px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <li
        className="px-3 py-2"
        onClick={() => handleViewDetails(contextMenu.adminId)}
      >
        View Details
      </li>

      {!admins.find(a => a.id === contextMenu.adminId)?.emailIsVerified && (
        <li
          className="px-3 py-2 text-info fw-bold"
          onClick={() => handleVerifyEmail(contextMenu.adminId)}
        >
          Verify Email
        </li>
      )}

      {!admins.find(a => a.id === contextMenu.adminId)?.isActiveUser ? (
        <li
          className="px-3 py-2 text-success fw-bold"
          onClick={() => handleActivate(contextMenu.adminId)}
        >
          Activate Admin
        </li>
      ) : (
        <li
          className="px-3 py-2 text-warning fw-bold"
          onClick={() => handleDeactivate(contextMenu.adminId)}
        >
          Deactivate Admin
        </li>
      )}
    </ul>
  </>
)}

      {selectedAdminId && (
        <AdminDetailsCard
          adminId={selectedAdminId}
          onClose={() => setSelectedAdminId(null)}
        />
      )}
    </div>
  );
}
