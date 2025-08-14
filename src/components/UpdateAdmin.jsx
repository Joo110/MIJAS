import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin } = location.state || {};

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: ''
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        username: admin.username || '',
        fullName: admin.fullName || '',
        email: admin.email || ''
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    console.log('Updated admin:', formData);
    alert('Admin updated successfully!');
    navigate('/view-admins');
  };

  if (!admin) {
    return <div className="container mt-5">No admin data found.</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4">Update Admin</h3>
      <div className="bg-white p-4 shadow rounded">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button className="btn w-100 text-white" style={{ backgroundColor: '#96B7A0' }} onClick={handleUpdate}>
          Update Admin
        </button>
      </div>
    </div>
  );
}

export default UpdateAdmin;
