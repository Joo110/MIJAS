import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateMember() {
  const location = useLocation();
  const navigate = useNavigate();
  const { member } = location.state || {};

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    nationality: '',
    country: '',
    city: '',
    addressDetails: '',
    major: '',
    dateOfBirth: '',
    isActive: false
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
        nationality: member.nationality || '',
        country: member.country || '',
        city: member.city || '',
        addressDetails: member.addressDetails || '',
        major: member.major || '',
        dateOfBirth: member.dateOfBirth || '',
        isActive: member.isActive || false
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
        {Object.keys(formData).map(
          (key) =>
            key !== 'isActive' && (
              <div className="mb-3" key={key}>
                <label className="form-label">{key}</label>
                <input
                  type={key === 'dateOfBirth' ? 'date' : 'text'}
                  className="form-control"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            )
        )}

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
