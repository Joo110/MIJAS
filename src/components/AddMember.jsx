import React, { useState } from 'react';
import { useAddMember } from '../hooks/useAddMember';

function AddMember() {
  // قائمة التخصصات (Majors) الشائعة بالجامعات الأردنية — عدّلها لو حبيت
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
  ];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '', // 'male' or 'female'
    nationality: '',
    // country removed
    city: '',
    addressDetails: '',
    major: '',
    dateOfBirth: ''
  });

  const { mutate, isLoading, isError, error, isSuccess } = useAddMember();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا ممكن تعمل تحقق بسيط قبل الارسال لو حابب
    mutate(formData, {
      onSuccess: () => {
        setFormData({
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
          dateOfBirth: ''
        });
      }
    });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="mb-4 text-center">Add Member</h3>

      {isSuccess && <div className="alert alert-success">✅ Member added successfully!</div>}
      {isError && <div className="alert alert-danger">{error?.message ?? 'Something went wrong'}</div>}

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
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

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
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
            <option value="male">M</option>
            <option value="female">F</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            className="form-control"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address Details</label>
          <input
            type="text"
            className="form-control"
            name="addressDetails"
            value={formData.addressDetails}
            onChange={handleChange}
            required
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

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn text-white w-100"
          style={{ backgroundColor: '#96B7A0' }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
}

export default AddMember;
