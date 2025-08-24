import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateMember() {
  const location = useLocation();
  const navigate = useNavigate();
  const { member } = location.state || {};

  const jordanMajors = [
    'Computer Science',
    'Engineering',
    'Medicine',
    'Law',
    'Business',
    'Pharmacy',
    'Nursing',
    'Education',
    'Information Technology',
    'Architecture',
    'Other',
  ];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    city: '',
    addressDetails: '',
    major: '',
    dateOfBirth: '',
    isActive: false,
  });

  useEffect(() => {
    if (member) {
      setFormData({
        username: member.username || '',
        email: member.email || '',
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        phoneNumber: member.phone || '',
        gender: member.gender || '',
        city: member.city || '',
        addressDetails: member.addressDetails || '',
        major: member.major || jordanMajors[0],
        dateOfBirth: member.dateOfBirth || '',
        isActive: member.isActive || false,
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = () => {
    console.log('Updating with:', formData);
    alert('Member updated successfully');
    navigate('/view-members'); // يرجع لصفحة الأعضاء
  };

  if (!member) {
    return <div className="container mt-5">No member data found.</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="text-center mb-4">Update Member</h3>
      <div className="bg-white p-4 shadow rounded">
        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
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

        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Gender Dropdown */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose gender
            </option>
            <option value="male">M</option>
            <option value="female">F</option>
          </select>
        </div>

        {/* City */}
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* Address Details */}
        <div className="mb-3">
          <label className="form-label">Address Details</label>
          <input
            type="text"
            className="form-control"
            name="addressDetails"
            value={formData.addressDetails}
            onChange={handleChange}
          />
        </div>

        {/* Major Dropdown */}
        <div className="mb-3">
          <label className="form-label">Major</label>
          <select
            className="form-select"
            name="major"
            value={formData.major}
            onChange={handleChange}
          >
            {jordanMajors.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        {/* Active Toggle */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            id="activeSwitch"
          />
          <label className="form-check-label" htmlFor="activeSwitch">
            Active
          </label>
        </div>

        <button
          className="btn text-white w-100"
          style={{ backgroundColor: '#96B7A0' }}
          onClick={handleUpdate}
        >
          Update Member
        </button>
      </div>
    </div>
  );
}

export default UpdateMember;
