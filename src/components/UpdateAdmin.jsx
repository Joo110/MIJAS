import React, { useState } from 'react';
import { useAdminInfo } from '../hooks/useAdminInfo';

function UpdateAdmin() {
  const { updateAdminInfo } = useAdminInfo();

  // الفورم للحقول اللي عايزين نعدلها
  const [formData, setFormData] = useState({
    phoneNumber: '',
    city: '',
    addressDetails: '',
    major: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdminInfo.mutate(formData);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold">Edit Admin Information</h3>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <div className="form-group mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Address Details</label>
          <input
            type="text"
            className="form-control"
            name="addressDetails"
            value={formData.addressDetails}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Major</label>
          <input
            type="text"
            className="form-control"
            name="major"
            value={formData.major}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn text-white fw-bold px-4"
          style={{ backgroundColor: 'hsla(120, 36%, 72%, 1.00)' }}
          disabled={updateAdminInfo.isLoading}
        >
          {updateAdminInfo.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {updateAdminInfo.isSuccess && (
        <div className="alert alert-success mt-3">✅ Info updated successfully</div>
      )}
      {updateAdminInfo.isError && (
        <div className="alert alert-danger mt-3">❌ Failed to update info</div>
      )}
    </div>
  );
}

export default UpdateAdmin;
