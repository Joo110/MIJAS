import { useState } from 'react';

function CreateAdminForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: 'M',
    nationality: '',
    country: '',
    city: '',
    addressDetails: '',
    major: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');

    try {
      const response = await fetch('https://localhost:63478/api/v1/RootAdmin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Admin created successfully');
        setFormData({
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          gender: 'M',
          nationality: '',
          country: '',
          city: '',
          addressDetails: '',
          major: '',
          dateOfBirth: '',
        });
      } else {
        const data = await response.json();
        setErrors(data);
      }
    } catch (error) {
       console.error('Error:', error);
      setErrors([{ description: 'Network error or server is down' }]);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="text-center mb-4">Create Admin</h3>
      <div className="bg-white p-4 shadow rounded">
        {Object.keys(formData).map((key) => (
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
        ))}

        <button
          className="btn text-white w-100"
          style={{ backgroundColor: '#96B7A0' }}
          onClick={handleSubmit}
        >
          Create Admin
        </button>

        {errors.length > 0 && (
          <div className="alert alert-danger mt-3">
            <ul className="mb-0">
              {errors.map((err, i) => (
                <li key={i}>{err.description}</li>
              ))}
            </ul>
          </div>
        )}

        {success && (
          <div className="alert alert-success mt-3">{success}</div>
        )}
      </div>
    </div>
  );
}

export default CreateAdminForm;
