// src/components/DeleteAdmin.jsx
import { useState } from 'react';

function DeleteAdmin() {
  // بيانات تجريبية (ممكن تجيبهم من API لاحقًا)
  const [admins, setAdmins] = useState([
    { id: 1, username: 'admin1', fullName: 'Admin One' },
    { id: 2, username: 'admin2', fullName: 'Admin Two' },
    { id: 3, username: 'admin3', fullName: 'Admin Three' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      const updatedAdmins = admins.filter((admin) => admin.id !== id);
      setAdmins(updatedAdmins);
    }
  };

  return (
    <div className="container mt-5">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-center mb-4" style={{ color: '#96B7A0' }}>
          Delete Admin
        </h2>

        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.username}</td>
                  <td>{admin.fullName}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No admins available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeleteAdmin;
