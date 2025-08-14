import React from 'react';

function MemberDetailsCard({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 2000 }}>
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <button className="btn-close position-absolute top-0 end-0 m-3" onClick={onClose}></button>
        <div className="card-body">
          <h4 className="card-title text-center mb-4" style={{ color: '#96B7A0' }}>
            Member Details
          </h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>ID:</strong> {member.id}</li>
            <li className="list-group-item"><strong>Username:</strong> {member.username}</li>
            <li className="list-group-item"><strong>Email:</strong> {member.email}</li>
            <li className="list-group-item"><strong>Full Name:</strong> {member.firstName} {member.lastName}</li>
            <li className="list-group-item"><strong>Phone:</strong> {member.phoneNumber}</li>
            <li className="list-group-item"><strong>Gender:</strong> {member.gender}</li>
            <li className="list-group-item"><strong>Nationality:</strong> {member.nationality}</li>
            <li className="list-group-item"><strong>Country:</strong> {member.country}</li>
            <li className="list-group-item"><strong>City:</strong> {member.city}</li>
            <li className="list-group-item"><strong>Address:</strong> {member.addressDetails}</li>
            <li className="list-group-item"><strong>Major:</strong> {member.major}</li>
            <li className="list-group-item"><strong>Date of Birth:</strong> {member.dateOfBirth}</li>
            <li className="list-group-item"><strong>Status:</strong> {member.isActive ? 'Active' : 'Inactive'}</li>
            <li className="list-group-item"><strong>Membership:</strong> {member.hasActiveMembership ? 'Active' : 'Inactive'}</li>
            <li className="list-group-item"><strong>Created At:</strong> {new Date(member.createdAt).toLocaleString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsCard;
