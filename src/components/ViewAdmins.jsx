import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDetailsCard from './AdminDetailsCard';
import './ViewAdmins.css'; // 🟡 ضيفنا ملف التنسيقات ده عشان التلت نقط

function ViewAdmins() {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [search, setSearch] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, adminId: null });
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const params = { pageNumber, pageSize };
        if (searchBy && search.trim() !== '') params[searchBy] = search;

        const response = await axios.get(`https://localhost:63478/api/v1/RootAdmin/admins`, { params });
        setAdmins(response.data.admins || response.data.data || []);
        setTotalCount(response.data.totalCount || 0);
      } catch (error) {
        console.error('❌ Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, [pageNumber, pageSize, searchBy, search]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleRightClick = (e, id) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, adminId: id });
  };

  const handleOptionsClick = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({ visible: true, x: rect.left, y: rect.bottom + window.scrollY, adminId: id });
  };

  const handleCloseMenu = () => setContextMenu({ ...contextMenu, visible: false });

  const handleDelete = async (id) => {
    if (!window.confirm('❗Do you want to delete this user?')) return;

    try {
      await axios.delete(`https://localhost:63478/api/v1/RootAdmin/admins/${id}`);
      setAdmins(admins.filter((admin) => admin.id !== id));
      alert('✅ Admin deleted successfully');
    } catch (error) {
      console.error('❌ Failed to delete the admin:', error);
      alert('⚠️ An error occurred while trying to delete the admin.');
    } finally {
      handleCloseMenu();
    }
  };

  const handleUpdate = (id) => {
    const selectedAdmin = admins.find((a) => a.id === id);
    if (selectedAdmin) {
      navigate('/update-admin', { state: { admin: selectedAdmin } });
    }
  };

  const handleViewDetails = (id) => {
    setSelectedAdminId(id);
    handleCloseMenu();
  };

  const handleActivate = async (id) => {
    try {
      await axios.put(`https://localhost:63478/api/v1/RootAdmin/admins/${id}/activate`);
      alert('✅ Admin activated successfully');
      setAdmins(prev => prev.map(a => a.id === id ? { ...a, isActive: true } : a));
    } catch (error) {
      console.error('❌ Failed to activate admin:', error);
      alert('⚠️ Failed to activate this admin.');
    } finally {
      handleCloseMenu();
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.put(`https://localhost:63478/api/v1/RootAdmin/admins/${id}/deactivate`);
      alert('🛑 Admin deactivated successfully');
      setAdmins(prev => prev.map(a => a.id === id ? { ...a, isActive: false } : a));
    } catch (error) {
      console.error('❌ Failed to deactivate admin:', error);
      alert('⚠️ Failed to deactivate this admin.');
    } finally {
      handleCloseMenu();
    }
  };

  return (
    <div className="container mt-5" onClick={handleCloseMenu}>
      <h3 className="mb-4 text-center">View Admins</h3>

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

      {admins.length === 0 ? (
        <p className="text-center text-muted">🚫 No admins found.</p>
      ) : (
        <table className="table table-bordered shadow">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="d-md-none text-center">⋮</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.id} onContextMenu={(e) => handleRightClick(e, admin.id)}>
                <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                <td>{admin.username}</td>
                <td>{admin.firstName} {admin.lastName}</td>
                <td>{admin.email}</td>
                <td>
                  {admin.isActive ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </td>
                <td className="d-md-none text-center">
                  <button
                    className="table-options-btn"
                    onClick={(e) => handleOptionsClick(admin.id, e)}
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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

      {/* Context Menu */}
      {contextMenu.visible && (
        <ul
          className="custom-context-menu bg-white border rounded shadow"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: 'absolute',
            zIndex: 1000,
            listStyle: 'none',
            padding: 0,
            width: '180px'
          }}
        >
          <li className="px-3 py-2" onClick={() => handleViewDetails(contextMenu.adminId)}>View Details</li>
          <li className="px-3 py-2" onClick={() => handleUpdate(contextMenu.adminId)}>Update Admin</li>
          <li className="px-3 py-2 text-danger" onClick={() => handleDelete(contextMenu.adminId)}>Delete Admin</li>
          {!admins.find(a => a.id === contextMenu.adminId)?.isActive && (
            <li className="px-3 py-2 text-success" onClick={() => handleActivate(contextMenu.adminId)}>Activate Admin</li>
          )}
          {admins.find(a => a.id === contextMenu.adminId)?.isActive && (
            <li className="px-3 py-2 text-dark" onClick={() => handleDeactivate(contextMenu.adminId)}>Deactivate Admin</li>
          )}
        </ul>
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

export default ViewAdmins;
