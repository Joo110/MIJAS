import { useEffect, useState } from 'react';
import axios from 'axios';

function DeleteMember() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = 'https://localhost:63478/api/v1/Admin/members';

  // جلب الأعضاء من الـ API
  useEffect(() => {
    axios.get(apiUrl)
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // حذف عضو بالـ ID
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this member?');
    if (!confirm) return;

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setMembers(prev => prev.filter(member => member.id !== id));
      alert('✅ Member deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete member.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-center mb-4" style={{ color: '#96B7A0' }}>
          Delete Member
        </h2>

        {loading ? (
          <div className="text-center">Loading members...</div>
        ) : (
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
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.username}</td>
                    <td>{member.fullName}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(member.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No members available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DeleteMember;
