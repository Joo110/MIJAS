import React, { useState } from 'react';
import { useCreateAdmin } from '../hooks/useCreateAdmin';

function CreateAdminForm() {
    const majorsList = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Industrial Engineering',
    'Architecture',
    'Medicine',
    'Pharmacy',
    'Dentistry',
    'Nursing',
    'Business Administration',
    'Accounting',
    'Economics',
    'Law',
    'Education',
    'Psychology',
    'Biology',
    'Chemistry',
    'Physics',
    'Mathematics',
    'Environmental Science',
    'Agriculture',
    'Tourism and Hospitality',
    'Journalism and Media',
    'Political Science',
    'Public Administration',
    'Graphic Design',
    'Fine Arts',
    'Biotechnology',
    'Chemical Engineering',
    'Petroleum Engineering',
    'Other',
  ];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    nationality: '',
    city: '',
    addressDetails: '',
    major: '',
    dateOfBirth: '',
  });

  const { createAdminMutation } = useCreateAdmin();

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    createAdminMutation.mutate(formData);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="text-center mb-4">Create Admin</h3>
      <div className="bg-white p-4 shadow rounded">
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
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
              required
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

          {/* GENDER as dropdown */}
<div className="mb-3">
  <label className="form-label">Gender</label>
  <select
    className="form-select"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Choose gender</option>
    <option value="M">M</option>
    <option value="F">F</option>
  </select>
</div>


          {/* Nationality */}
          <div className="mb-3">
            <label className="form-label">Nationality</label>
            <input
              type="text"
              className="form-control"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
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

         {/* MAJOR as dropdown populated from majorsList */}
        <div className="mb-3">
          <label className="form-label">Major</label>
          <select
            className="form-select"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Choose major</option>
            {majorsList.map((m) => (
              <option key={m} value={m}>{m}</option>
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

          {/* Submit */}
          <button
            type="submit"
            className="btn text-white w-100"
            style={{ backgroundColor: '#96B7A0' }}
            disabled={createAdminMutation.isLoading}
          >
            {createAdminMutation.isLoading ? 'Creating...' : 'Create Admin'}
          </button>
        </form>

        {/* Error Message */}
        {createAdminMutation.isError && (
          <div className="alert alert-danger mt-3">
            {createAdminMutation.error?.response?.data?.[0]?.description ||
              'Something went wrong'}
          </div>
        )}

        {/* Success Message */}
        {createAdminMutation.isSuccess && (
          <div className="alert alert-success mt-3">
            Admin created successfully
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAdminForm;
