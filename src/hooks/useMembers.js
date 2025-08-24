import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

// Hook لجلب الأعضاء مع البحث والصفحة
export function useMembers({ pageNumber, pageSize, searchBy, search }) {
  return useQuery({
    queryKey: ['members', { pageNumber, pageSize, searchBy, search }],
    queryFn: async () => {
      const params = { pageNumber, pageSize };
      if (searchBy && search?.trim() && searchBy !== 'fullName') {
        params[searchBy] = search;
      }

      const { data } = await api.get('/api/v1/Admin/members', { params });

      let members = data.members || [];
      if (searchBy === 'fullName' && search?.trim()) {
        members = members.filter(m =>
          `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
        );
      }

      return {
        members: members.map(m => ({
          id: m.id,
          username: m.username,
          fullName: `${m.firstName} ${m.lastName}`,
          firstName: m.firstName,
          lastName: m.lastName,
          email: m.email,
          phone: m.phoneNumber || 'N/A',
          isActiveUser: m.isActiveUser,          // ✅ من API
          hasActiveMembership: m.hasActiveMembership, // ✅ من API
          emailIsVerified: m.emailIsVerified,    // ✅ من API
          createdAt: m.createdAt || 'N/A'
        })),
        totalCount: data.totalCount || members.length
      };
    },
    keepPreviousData: true
  });
}

// Hook لحذف العضو
export function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await api.delete(`/api/v1/Admin/members/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] })
  });
}

// Hook لتفعيل / تعطيل العضو
export function useToggleMemberStatus() {
  const queryClient = useQueryClient();

  const activate = useMutation({
    mutationFn: async (id) => await api.put(`/api/v1/Admin/members/${id}/activate`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] })
  });

  const deactivate = useMutation({
    mutationFn: async (id) => await api.put(`/api/v1/Admin/members/${id}/deactivate`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] })
  });

  return { activate, deactivate };
}

