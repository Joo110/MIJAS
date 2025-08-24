'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberDetailsCard from './MemberDetailsCard';
import RenewMembershipForm from './RenewMembershipForm';
import { useDeactivateMembership } from '../hooks/useDeactivateMembership';
import './ViewMembers.css';
import {
  useMembers,
  useToggleMemberStatus
} from '../hooks/useMembers';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import { useRenewMembership } from '../hooks/useRenewMembership';

export default function ViewMembers() {
  const navigate = useNavigate();

  // Filters & paging
  const [searchBy, setSearchBy] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // UI state
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, memberId: null });
  const [viewedMember, setViewedMember] = useState(null);
  const [renewMemberId, setRenewMemberId] = useState(null);

  // Backend hooks
  const membersPerPage = 10;
  const { data, isLoading } = useMembers({
    pageNumber: currentPage,
    pageSize: membersPerPage,
    searchBy,
    search
  });
  const { activate, deactivate } = useToggleMemberStatus();
  const { deactivateMutation } = useDeactivateMembership();
  const verifyEmail = useVerifyEmail();
  const { renewMembershipMutation } = useRenewMembership();

  const members = data?.members || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / membersPerPage);

  // Context menu handlers
  const handleRightClick = (e, memberId) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, memberId });
  };

  const handleOptionsClick = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      visible: true,
      x: rect.left,
      y: rect.bottom + window.scrollY,
      memberId: id
    });
  };

  const handleCloseMenu = () =>
    setContextMenu(prev => ({ ...prev, visible: false }));

  // Row actions
  const handleUpdate = (memberId) => {
    const m = members.find(mm => mm.id === memberId);
    if (m) navigate('/update-member', { state: { member: m } });
    handleCloseMenu();
  };

  const handleViewDetails = (memberId) => {
    setViewedMember(members.find(m => m.id === memberId) || null);
    handleCloseMenu();
  };

  const handleRenewMembership = (memberId) => {
    setRenewMemberId(memberId);
    handleCloseMenu();
  };

  const submitRenewal = ({ memberId, numberOfDays, amount }) => {
    renewMembershipMutation.mutate(
      { memberId, numberOfDays, amount },
      {
        onSuccess: () => {
          alert('✅ Membership renewed successfully');
          setRenewMemberId(null);
        },
        onError: () => alert('❌ Failed to renew membership')
      }
    );
  };

  const handleActivate = (memberId) => {
    activate.mutate(memberId, {
      onSuccess: () => alert('✅ Activated'),
      onError: () => alert('❌ Failed')
    });
    handleCloseMenu();
  };

  const handleDeactivate = (memberId) => {
    deactivate.mutate(memberId, {
      onSuccess: () => alert('✅ Deactivated'),
      onError: () => alert('❌ Failed')
    });
    handleCloseMenu();
  };

  const handleDeactivateMembership = (memberId) => {
    deactivateMutation.mutate(
      { memberId },
      {
        onSuccess: () => alert('✅ Membership deactivated'),
        onError: () => alert('❌ Failed to deactivate membership')
      }
    );
    handleCloseMenu();
  };

  const handleVerifyEmail = (memberId) => {
    verifyEmail.mutate(memberId, {
      onSuccess: () => alert('📧 Verification email sent!'),
      onError: () => alert('❌ Failed to send email')
    });
    handleCloseMenu();
  };

  if (isLoading) return <p className="text-center mt-5">Loading members...</p>;

  return (
    <div className="container mt-5" onClick={handleCloseMenu}>
      <h3 className="mb-4 text-center">View Members</h3>

      {/* Search */}
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={searchBy}
            onChange={e => setSearchBy(e.target.value)}
          >
            <option value="">Search By...</option>
            <option value="username">Username</option>
            <option value="fullName">Full Name</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder={`Enter ${searchBy || 'value'}`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            disabled={!searchBy}
          />
        </div>
      </div>

      {/* Table */}
      {members.length === 0 ? (
        <p className="text-center text-muted">🚫 No members found.</p>
      ) : (
        <table className="table table-bordered shadow">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Is Active User</th>
              <th>Email Verified</th>
              <th className="d-md-none text-center">⋮</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, i) => (
              <tr
                key={member.id}
                onContextMenu={e => handleRightClick(e, member.id)}
              >
                <td>{i + 1 + (currentPage - 1) * membersPerPage}</td>
                <td>{member.username}</td>
                <td>{member.fullName}</td>
                <td>{member.phone}</td>

                <td className={member.isActiveUser ? 'text-success' : 'text-danger'}>
                  {member.isActiveUser ? 'Yes' : 'No'}
                </td>

                <td className={member.emailIsVerified ? 'text-success' : 'text-danger'}>
                  {member.emailIsVerified ? 'Yes' : 'No'}
                </td>

                <td className="d-md-none text-center">
                  <button
                    className="table-options-btn"
                    onClick={e => handleOptionsClick(member.id, e)}
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <li key={p} className={`page-item ${currentPage === p ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(p)}>
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Context Menu */}
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
            padding: 0,
            width: '220px',
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px'
          }}
        >
          <li className="px-3 py-2" onClick={() => handleViewDetails(contextMenu.memberId)}>
            View Details
          </li>
          <li className="px-3 py-2" onClick={() => handleUpdate(contextMenu.memberId)}>
            Update Member
          </li>      
          <li
            className="px-3 py-2 text-primary fw-bold"
            onClick={() => handleRenewMembership(contextMenu.memberId)}
          >
            Renew Membership
          </li>
          <li
            className="px-3 py-2 text-warning fw-bold"
            onClick={() => handleDeactivateMembership(contextMenu.memberId)}
          >
            Deactivate Membership
          </li>

          {!members.find(m => m.id === contextMenu.memberId)?.emailIsVerified && (
            <li
              className="px-3 py-2 text-info fw-bold"
              onClick={() => handleVerifyEmail(contextMenu.memberId)}
            >
              Verify Email
            </li>
          )}

          {!members.find(m => m.id === contextMenu.memberId)?.isActiveUser ? (
            <li
              className="px-3 py-2 text-success fw-bold"
              onClick={() => handleActivate(contextMenu.memberId)}
            >
              Activate Member
            </li>
          ) : (
            <li
              className="px-3 py-2 text-danger fw-bold"
              onClick={() => handleDeactivate(contextMenu.memberId)}
            >
              Deactivate Member
            </li>
          )}
        </ul>
      )}

      {/* Dialogs */}
      {renewMemberId && (
        <RenewMembershipForm
          memberId={renewMemberId}
          onSubmit={submitRenewal}
          onCancel={() => setRenewMemberId(null)}
        />
      )}
      {viewedMember && (
        <MemberDetailsCard
          member={viewedMember}
          onClose={() => setViewedMember(null)}
        />
      )}
    </div>
  );
}
