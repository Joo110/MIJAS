import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export function useAdminInfo() {
  const queryClient = useQueryClient();

  const token = localStorage.getItem('token');

  // Query لجلب بيانات الـ admin اللي عامل login
  const adminInfoQuery = useQuery({
    queryKey: ['adminInfo'],
    queryFn: async () => {
      if (!token) throw new Error('❌ No auth token found in localStorage');

      try {
        const { data } = await api.get('/api/v1/Admin/admins', {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        });
        return data;
      } catch (err) {
        console.error(
          'Error fetching admin info:',
          err.response?.status,
          err.response?.data || err.message
        );
        throw new Error('❌ Failed to fetch admin info. Check token.');
      }
    },
    enabled: !!token,
  });

  // Mutation لتحديث بيانات الـ admin
  const updateAdminInfo = useMutation({
    mutationFn: async (formData) => {
      if (!token) throw new Error('❌ No auth token found in localStorage');
      await api.put('/api/v1/Admin/admin-info', formData, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminInfo']);
    },
    onError: (err) => {
      console.error(
        'Error updating admin info:',
        err.response?.status,
        err.response?.data || err.message
      );
    },
  });

  return {
    adminInfoQuery,
    updateAdminInfo,
  };
}
