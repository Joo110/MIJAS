'use client';
import React, { useState, useEffect } from 'react';
import { useMemberData, useUpdateMember } from '../hooks/useUpdateMember';

export default function UpdateMemberShipCard({ userId: propUserId }) {
  const userId = propUserId || localStorage.getItem('userId') || null;

  // استعلام البيانات
  const { data, isLoading: isFetching, error: fetchError } = useMemberData(userId);

  // الميوتاشن لتحديث البيانات
  const updateMemberMutation = useUpdateMember();

  const jordanMajors = [
    'Computer Science','Information Technology','Software Engineering','Electrical Engineering',
    'Mechanical Engineering','Civil Engineering','Industrial Engineering','Architecture',
    'Medicine','Pharmacy','Dentistry','Nursing','Business Administration','Accounting',
    'Economics','Law','Education','Psychology','Biology','Chemistry','Physics','Mathematics',
    'Environmental Science','Agriculture','Tourism and Hospitality','Journalism and Media',
    'Political Science','Public Administration','Graphic Design','Fine Arts','Biotechnology',
    'Chemical Engineering','Petroleum Engineering','Other',
  ];

  const [formData, setFormData] = useState({
    id: '',
    phoneNumber: '',
    city: '',
    addressDetails: '',
    gender: '',
    major: '',
  });

  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || userId || '',
        phoneNumber: data.phoneNumber || data.mobile || '',
        city: data.city || data.town || '',
        addressDetails: data.addressDetails || data.address || '',
        gender: data.gender || data.sex || '',
        major: data.major || jordanMajors[0],
      });
    }
  }, [data, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');

    if (!formData.gender) {
      setServerError('الرجاء اختيار النوع (Gender).');
      return;
    }

    try {
      await updateMemberMutation.mutateAsync(formData);
      setSuccessMsg('✅Update Successful');
    } catch (err) {
      const msg =
        err?.fetchError ||
  
        'Update Not Successful';
      setServerError(msg);
    }
  };

  if (isFetching) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h4 className="mb-4 text-center" style={{ color: '#4C9A9A' }}>
          Update Personal Information
        </h4>

        {fetchError && (
          <div className="alert alert-warning">
            {fetchError?.response?.data?.message || fetchError.message || 'Failed to load user data.'}
          </div>
        )}

        {serverError && (
          <div className="alert alert-danger text-start">{serverError}</div>
        )}

        {successMsg && (
          <div className="alert alert-success text-start">{successMsg}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address Details</label>
            <input
              type="text"
              name="addressDetails"
              className="form-control"
              value={formData.addressDetails}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Choose gender</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Major</label>
            <select
              className="form-select"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
            >
              {jordanMajors.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            style={{ backgroundColor: '#96B7A0', fontSize: '18px' }}
            disabled={updateMemberMutation.isLoading}
          >
            {updateMemberMutation.isLoading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
}
