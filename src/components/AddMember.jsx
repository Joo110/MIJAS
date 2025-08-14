import React, { useState } from 'react';
import axios from 'axios';

function AddMember() {
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
    dateOfBirth: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:63478/api/v1/Admin/members', formData);
      setMessage('✅ Member added successfully!');
      setFormData({
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
        dateOfBirth: ''
      });
    } catch (error) {
      if (error.response?.data?.length) {
        setMessage(`❌ ${error.response.data[0].description}`);
      } else {
        setMessage('❌ An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="mb-4 text-center">Add Member</h3>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
        {[
          { label: 'Username', name: 'username' },
          { label: 'Email', name: 'email' },
          { label: 'First Name', name: 'firstName' },
          { label: 'Last Name', name: 'lastName' },
          { label: 'Phone Number', name: 'phoneNumber' },
          { label: 'Gender', name: 'gender' },
          { label: 'Nationality', name: 'nationality' },
          { label: 'Country', name: 'country' },
          { label: 'City', name: 'city' },
          { label: 'Address Details', name: 'addressDetails' },
          { label: 'Major', name: 'major' },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type="text"
              className="form-control"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

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

        <button type="submit" className="btn text-white w-100" style={{ backgroundColor: '#96B7A0' }}>
          Add Member
        </button>
      </form>
    </div>
  );
}

export default AddMember;
