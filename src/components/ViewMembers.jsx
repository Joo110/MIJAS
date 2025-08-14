import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewMembers.css';
import MemberDetailsCard from './MemberDetailsCard';
import RenewMembershipForm from './RenewMembershipForm';

function ViewMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchBy, setSearchBy] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, memberId: null });
  const [viewedMember, setViewedMember] = useState(null);
  const [renewMemberId, setRenewMemberId] = useState(null);

  const membersPerPage = 10;
  const adminId = "00000000-0000-0000-0000-000000000000"; // Replace with actual adminId from token

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const params = {
          pageNumber: currentPage,
          pageSize: membersPerPage,
        };

        if (searchBy && searchBy !== 'fullName' && search.trim() !== '') {
          params[searchBy] = search;
        }

        const response = await axios.get('https://localhost:57884/api/v1/Admin/members', { params });

        let apiMembers = response.data.members || [];

        if (searchBy === 'fullName' && search.trim() !== '') {
          apiMembers = apiMembers.filter((m) =>
            `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
          );
        }

        const mappedMembers = apiMembers.map((m) => ({
          id: m.id,
          username: m.username,
          fullName: `${m.firstName} ${m.lastName}`,
          firstName: m.firstName,
          lastName: m.lastName,
          email: m.email,
          phone: m.phoneNumber || 'N/A',
          isActive: m.isActiveUser,
          hasActiveMembership: m.isActiveMembership,
          createdAt: m.createdAt || 'N/A',
        }));

        setMembers(mappedMembers);
        setTotalCount(response.data.totalCount || mappedMembers.length);
      } catch (error) {
        console.error('❌ Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [currentPage, searchBy, search]);

  const totalPages = Math.ceil(totalCount / membersPerPage);

  const handleRightClick = (event, memberId) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, memberId });
  };

  const handleOptionsClick = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({ visible: true, x: rect.left, y: rect.bottom + window.scrollY, memberId: id });
  };

  const handleCloseMenu = () => setContextMenu({ ...contextMenu, visible: false });

  const handleUpdate = (memberId) => {
    const selectedMember = members.find((m) => m.id === memberId);
    if (selectedMember) {
      navigate('/update-member', { state: { member: selectedMember } });
    }
    handleCloseMenu();
  };

  const handleDelete = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      await axios.delete(`https://localhost:63478/api/v1/Admin/members/${memberId}`);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      alert('✅ Member deleted successfully.');
    } catch (error) {
      console.error('❌ Error deleting member:', error);
      alert('❌ Failed to delete member.');
    } finally {
      handleCloseMenu();
    }
  };

  const handleViewDetails = async (memberId) => {
    try {
      const response = await axios.get(`https://localhost:57884/api/v1/Admin/members/${memberId}`);
      setViewedMember(response.data);
    } catch (error) {
      console.error('❌ Error fetching member details:', error);
    } finally {
      handleCloseMenu();
    }
  };

  const handleRenewMembership = (memberId) => {
    setRenewMemberId(memberId);
    handleCloseMenu();
  };

  const handleDeactivateMembership = async (memberId) => {
    try {
      await axios.post(`https://localhost:57884/api/v1/Admin/members/deactivate-membership`, {
        memberId,
        currentAdminId: adminId
      });

      alert("✅ Membership deactivated successfully.");
    } catch (error) {
      console.error("❌ Error deactivating membership:", error);
      alert("❌ Failed to deactivate membership.");
    } finally {
      handleCloseMenu();
    }
  };

  const submitRenewal = async ({ memberId, numberOfDays, amount }) => {
    try {
      await axios.post(`https://localhost:63478/api/v1/Admin/members/renew-membership`, {
        memberId,
        currentAdminId: adminId,
        numberOfDays,
        amount
      });

      alert("✅ Membership renewed successfully.");
      setRenewMemberId(null);
    } catch (error) {
      console.error("❌ Error renewing membership:", error);
      alert("❌ Failed to renew membership.");
    }
  };

  // ==== هذا هو التعديل الجديد: اضافة تفعيل وتعطيل العضو ====

  const handleActivate = async (memberId) => {
    try {
      await axios.put(`https://localhost:57884/api/v1/Admin/members/${memberId}/activate`);
      alert("✅ Member activated successfully.");
      // تحديث حالة العضو محلياً بدون تحميل جديد (اختياري)
      setMembers((prev) =>
        prev.map(m => m.id === memberId ? { ...m, isActive: true } : m)
      );
    } catch (error) {
      console.error("❌ Error activating member:", error);
      alert("❌ Failed to activate member.");
    } finally {
      handleCloseMenu();
    }
  };

  const handleDeactivate = async (memberId) => {
    try {
      await axios.put(`https://localhost:57884/api/v1/Admin/members/${memberId}/deactivate`);
      alert("✅ Member deactivated successfully.");
      setMembers((prev) =>
        prev.map(m => m.id === memberId ? { ...m, isActive: false } : m)
      );
    } catch (error) {
      console.error("❌ Error deactivating member:", error);
      alert("❌ Failed to deactivate member.");
    } finally {
      handleCloseMenu();
    }
  };

  // ===============================================

  return (
    <div className="container mt-5" onClick={handleCloseMenu}>
      <h3 className="mb-4 text-center">View Members</h3>

      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
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
            placeholder={`Enter ${searchBy || 'value'} to search`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!searchBy}
          />
        </div>
      </div>

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
              <th>Status</th>
              <th className="d-md-none text-center">⋮</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} onContextMenu={(e) => handleRightClick(e, member.id)}>
                <td>{index + 1 + (currentPage - 1) * membersPerPage}</td>
                <td>{member.username}</td>
                <td>{member.fullName}</td>
                <td>{member.phone}</td>
                <td className={member.isActive ? 'text-success' : 'text-danger'}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </td>
                <td className="d-md-none text-center">
                  <button className="table-options-btn" onClick={(e) => handleOptionsClick(member.id, e)}>
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Context Menu */}
      {contextMenu.visible && (
        <ul
          className="custom-context-menu bg-white border rounded shadow"
          style={{
            top: window.innerWidth <= 768 ? '50%' : contextMenu.y,
            left: window.innerWidth <= 768 ? 'unset' : contextMenu.x,
            right: window.innerWidth <= 768 ? '10px' : 'unset',
            transform: window.innerWidth <= 768 ? 'translateY(-50%)' : 'none',
            position: 'absolute',
            zIndex: 1000,
            listStyle: 'none',
            padding: 0,
            width: '200px'
          }}
        >
          <li className="px-3 py-2" onClick={() => handleViewDetails(contextMenu.memberId)}>View Details</li>
          <li className="px-3 py-2" onClick={() => handleUpdate(contextMenu.memberId)}>Update Member</li>
          <li className="px-3 py-2 text-danger" onClick={() => handleDelete(contextMenu.memberId)}>Delete Member</li>
          <li className="px-3 py-2 text-primary fw-bold" onClick={() => handleRenewMembership(contextMenu.memberId)}>Renew Membership</li>
          <li className="px-3 py-2 text-warning fw-bold" onClick={() => handleDeactivateMembership(contextMenu.memberId)}>Deactivate Membership</li>

          {/* زر تفعيل / تعطيل العضو حسب الحالة */}
          {!members.find(m => m.id === contextMenu.memberId)?.isActive ? (
            <li className="px-3 py-2 text-success fw-bold" onClick={() => handleActivate(contextMenu.memberId)}>
              Activate Member
            </li>
          ) : (
            <li className="px-3 py-2 text-danger fw-bold" onClick={() => handleDeactivate(contextMenu.memberId)}>
              Deactivate Member
            </li>
          )}

        </ul>
      )}

      {renewMemberId && (
        <RenewMembershipForm
          memberId={renewMemberId}
          onSubmit={submitRenewal}
          onCancel={() => setRenewMemberId(null)}
        />
      )}

      {viewedMember && <MemberDetailsCard member={viewedMember} onClose={() => setViewedMember(null)} />}
    </div>
  );
}

export default ViewMembers;
