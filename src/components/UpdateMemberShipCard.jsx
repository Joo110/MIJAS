import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateMemberShipCard() {
  const [formData, setFormData] = useState({
    id: '',
    phoneNumber: '',
    country: '',
    city: '',
    addressDetails: '',
    major: ''
  });

  const [loading, setLoading] = useState(true);

  // ✅ استخدم ID ثابت للتجريب
  const testUserId = '123456'; // ← غيره بـ ID حقيقي موجود في الـ DB عندك

  // جلب بيانات العضو
  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`https://localhost:63478/api/v1/Admin/members/${id}`);
      const data = response.data;
      setFormData({
        id: data.id,
        phoneNumber: data.phoneNumber || '',
        country: data.country || '',
        city: data.city || '',
        addressDetails: data.addressDetails || '',
        major: data.major || ''
      });
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
      alert('❌ Failed to fetch member data');
    } finally {
      setLoading(false);
    }
  };

  // تحميل البيانات أول ما الصفحة تفتح
  useEffect(() => {
    fetchUserData(testUserId);
  }, []);

  // إرسال البيانات للتحديث
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://localhost:63478/api/v1/Member', formData);
      alert('✅ Information updated successfully');
    } catch (error) {
      console.error('❌ Error updating member info:', error);
      alert('❌ Failed to update information');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h4 className="mb-4 text-center" style={{ color: '#4C9A9A' }}>Update Personal Information</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="text" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Address Details</label>
            <input type="text" name="addressDetails" className="form-control" value={formData.addressDetails} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Major</label>
            <input type="text" name="major" className="form-control" value={formData.major} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMemberShipCard;
