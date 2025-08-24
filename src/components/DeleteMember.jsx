'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { useDeleteMember } from '../hooks/useDeleteMember';

export default function DeleteMember() {
  const queryClient = useQueryClient();

  // جلب الأعضاء
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/Admin/members');
      return data;
    },
  });

  // hook للحذف
  const deleteMemberMutation = useDeleteMember();

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this member?');
    if (!confirm) return;

    deleteMemberMutation.mutate(id, {
      onSuccess: (deletedId) => {
        // تحديث البيانات في الـ cache بدون إعادة تحميل
        queryClient.setQueryData(['members'], (old = []) =>
          old.filter(member => member.id !== deletedId)
        );
        alert('✅ Member deleted successfully.');
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <div className="container mt-5">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-center mb-4" style={{ color: '#96B7A0' }}>
          Delete Member
        </h2>

        {isLoading ? (
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
                        disabled={deleteMemberMutation.isLoading}
                      >
                        {deleteMemberMutation.isLoading ? 'Deleting...' : 'Delete'}
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
