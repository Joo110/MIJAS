import React from 'react';

function MembershipPage({ user }) {
  const userData = user || {
    username: 'string',
    memberFullName: 'string',
    isActive: true,
    expiryDate: '2025-08-06T08:20:49.177Z',
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4" style={{ color: '#96B7A0' }}>
            Membership Information
          </h4>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Username:</strong> {userData.username}
            </li>
            <li className="list-group-item">
              <strong>Full Name:</strong> {userData.memberFullName}
            </li>
            <li className="list-group-item">
              <strong>Status:</strong>{' '}
              <span className={userData.isActive ? 'text-success' : 'text-danger'}>
                {userData.isActive ? 'Active' : 'Inactive'}
              </span>
            </li>
            <li className="list-group-item">
              <strong>Expiry Date:</strong>{' '}
              {new Date(userData.expiryDate).toLocaleDateString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;
