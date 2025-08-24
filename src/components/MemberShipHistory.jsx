'use client';
import React, { useState } from 'react';
import { useMembershipHistory } from '../hooks/useMembershipHistory';
import MembershipRenewalCard from './MembershipRenewalCard';

export default function MemberShipHistory() {
  const [username, setUsername] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useMembershipHistory(username, pageNumber, pageSize);

  const membershipActions = data?.membershipActions || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    expiryTime: null,
    renewalId: null,
  });

  const [selectedRenewalId, setSelectedRenewalId] = useState(null);

  const getActionTypeLabel = (type) => {
    switch (type) {
      case 0: return 'Renewal';
      case 1: return 'Deactivation';
      default: return 'Unknown';
    }
  };

  const handleRightClick = (e, action) => {
    e.preventDefault();

    // لو نوع الأكشن Deactivation (1) ما يفتحش المينيو
    if (action.actionType === 1) return;

    setContextMenu({
      visible: true,
      expiryTime: action.expiryTime ? new Date(action.expiryTime).toLocaleString() : 'N/A',
      renewalId: action.renewalId || null,
    });
  };

  const handleCloseMenu = () =>
    setContextMenu({ visible: false, expiryTime: null, renewalId: null });

  const handleClickExpiry = () => {
    if (contextMenu.renewalId) {
      setSelectedRenewalId(contextMenu.renewalId);
    }
    handleCloseMenu();
  };

  return (
    <div className="container mt-5" onClick={handleCloseMenu}>
      <h3 className="mb-4 text-center">Membership History</h3>

      {/* Username input */}
      <div className="mb-3 row justify-content-center">
        <label htmlFor="usernameInput" className="col-sm-2 col-form-label fw-bold">
          Username:
        </label>
        <div className="col-sm-6">
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setPageNumber(1);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-danger text-center">{error.message || 'Failed to fetch membership history.'}</p>
      ) : membershipActions.length === 0 ? (
        username && <p className="text-center text-muted">No membership history found.</p>
      ) : (
        <>
          {/* Table */}
          <table className="table table-bordered shadow">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Action ID</th>
                <th>Made By</th>
                <th>Date</th>
                <th>Action Type</th>
                <th className="d-md-none text-center">⋮</th>
              </tr>
            </thead>
            <tbody>
              {membershipActions.map((action, index) => (
                <tr key={action.actionId} onContextMenu={(e) => handleRightClick(e, action)}>
                  <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                  <td>{action.actionId}</td>
                  <td>{action.madeByUserName || 'N/A'}</td>
                  <td>{new Date(action.createdAt).toLocaleString()}</td>
                  <td>{getActionTypeLabel(action.actionType)}</td>
                  <td className="d-md-none text-center">
                    <button
                      className="table-options-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRightClick(e, action);
                      }}
                    >
                      ⋮
                    </button>
                  </td>
                  {/* hidden renewalId */}
                  <td style={{ display: 'none' }}>{action.renewalId}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li key={i + 1} className={`page-item ${pageNumber === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPageNumber(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Context Menu (متمركز في نص الشاشة) */}
          {contextMenu.visible && (
            <ul
              className="custom-context-menu bg-white border rounded shadow"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                listStyle: 'none',
                padding: '10px',
                width: '220px',
                background: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <li className="px-3 py-2" style={{ cursor: 'pointer' }} onClick={handleClickExpiry}>
                More Details
              </li>
            </ul>
          )}

          {/* Renewal Details Card */}
          {selectedRenewalId && (
            <MembershipRenewalCard
              renewalActionId={selectedRenewalId}
              onClose={() => setSelectedRenewalId(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
