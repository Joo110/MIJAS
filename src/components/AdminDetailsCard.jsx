import React from 'react';
import { useAdminDetails } from '../hooks/useAdminDetails';

function AdminDetailsCard({ adminId, onClose }) {
  const { data: admin, isLoading, isError, error } = useAdminDetails(adminId);

  if (!adminId) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 2000 }}
    >
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <button className="btn-close position-absolute top-0 end-0 m-3" onClick={onClose}></button>
        <div className="card-body">
          <h4 className="card-title text-center mb-4" style={{ color: '#96B7A0' }}>
            Admin Details
          </h4>

          {isLoading ? (
            <p className="text-center">⏳ Loading...</p>
          ) : isError ? (
            <p className="text-danger text-center">{error.message || '⚠️ Failed to load admin details.'}</p>
          ) : (
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>ID:</strong> {admin.id}</li>
              <li className="list-group-item"><strong>Username:</strong> {admin.username}</li>
              <li className="list-group-item"><strong>Email:</strong> {admin.email}</li>
              <li className="list-group-item"><strong>Full Name:</strong> {admin.firstName} {admin.lastName}</li>
              <li className="list-group-item"><strong>Phone:</strong> {admin.phoneNumber}</li>
              <li className="list-group-item"><strong>Gender:</strong> {admin.gender}</li>
              <li className="list-group-item"><strong>Nationality:</strong> {admin.nationality}</li>
              <li className="list-group-item"><strong>Country:</strong> {admin.country}</li>
              <li className="list-group-item"><strong>City:</strong> {admin.city}</li>
              <li className="list-group-item"><strong>Address:</strong> {admin.addressDetails}</li>
              <li className="list-group-item"><strong>Major:</strong> {admin.major}</li>
              <li className="list-group-item"><strong>Date of Birth:</strong> {admin.dateOfBirth}</li>
              <li className="list-group-item"><strong>Status:</strong> {admin.isActive ? 'Active' : 'Inactive'}</li>
              <li className="list-group-item"><strong>Created At:</strong> {new Date(admin.createdAt).toLocaleString()}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDetailsCard;
