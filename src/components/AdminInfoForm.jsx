import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminInfoForm() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    country: '',
    city: '',
    addressDetails: '',
    major: '',
  });

  const [status, setStatus] = useState(null);
  const apiUrl = 'https://localhost:63478/api/v1/Admin/admin-info';

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      setFormData(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatus('✅ Admin info updated successfully');
    } catch (error) {
      if (error.response?.status === 400) {
        setStatus('⚠️ Invalid input data');
      } else if (error.response?.status === 404) {
        setStatus('❌ Admin not found');
      } else {
        setStatus('❌ Unexpected server error');
      }
    }
  };

  const labels = {
    phoneNumber: 'Phone Number',
    country: 'Country',
    city: 'City',
    addressDetails: 'Address Details',
    major: 'Major',
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow" style={{ maxWidth: '600px' }}>
      <h4 className="mb-3">Edit Admin Information</h4>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field, index) => (
          <div className="mb-3" key={index}>
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

        <button type="submit" className="btn btn-primary">Save Changes</button>
        {status && <div className="mt-3 alert alert-info">{status}</div>}
      </form>
    </div>
  );
}

export default AdminInfoForm;
