import React, { useState, useEffect } from 'react';
import { useAdminInfo } from '../hooks/useAdminInfo';

function AdminInfoForm() {
  const { adminInfoQuery, updateAdminInfo } = useAdminInfo();

  const [formData, setFormData] = useState({
    phoneNumber: '',
    city: '',
    addressDetails: '',
    major: '',
  });

  // تحديث formData لما البيانات ترجع من السيرفر
  useEffect(() => {
    if (adminInfoQuery.data) {
      setFormData({
        phoneNumber: adminInfoQuery.data.phoneNumber || '',
        city: adminInfoQuery.data.city || '',
        addressDetails: adminInfoQuery.data.addressDetails || '',
        major: adminInfoQuery.data.major || '',
      });
    }
  }, [adminInfoQuery.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdminInfo.mutate(formData);
  };

  const labels = {
    phoneNumber: 'Phone Number',
    city: 'City',
    addressDetails: 'Address Details',
    major: 'Major',
  };

  if (adminInfoQuery.isLoading) {
    return <div>Loading admin info...</div>;
  }

  if (adminInfoQuery.isError) {
    return <div className="text-danger">❌ Failed to load admin info</div>;
  }

  return (
    <div className="container mt-4 p-4 border rounded shadow" style={{ maxWidth: '600px' }}>
      <h4 className="mb-3">Edit Admin Information</h4>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{labels[field]}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={updateAdminInfo.isLoading}>
          {updateAdminInfo.isLoading ? 'Saving...' : 'Save Changes'}
        </button>

        {updateAdminInfo.isSuccess && (
          <div className="mt-3 alert alert-success">✅ Updated successfully</div>
        )}
        {updateAdminInfo.isError && (
          <div className="mt-3 alert alert-danger">❌ Failed to update</div>
        )}
      </form>
    </div>
  );
}

export default AdminInfoForm;
