import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

// Hook لجلب الأدمنز
export function useAdmins(params) {
  return useQuery({
    queryKey: ['admins', params.pageNumber, params.pageSize, params.searchBy, params.search],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/RootAdmin/admins', { params });

      // لو في بحث بناءً على fullName
      let admins = data.admins || [];
      if (params.searchBy === 'fullName' && params.search?.trim()) {
        admins = admins.filter(a =>
          `${a.firstName} ${a.lastName}`.toLowerCase().includes(params.search.toLowerCase())
        );
      }

      return {
        admins,
        totalCount: data.totalCount || admins.length,
      };
    },
    keepPreviousData: true, // يحافظ على البيانات أثناء التصفح بين الصفحات
  });
}

// Hook لحذف الأدمن
export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await api.delete(`/api/v1/RootAdmin/admins/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'] }),
  });
}

// Hook لتفعيل / تعطيل الأدمن
export function useToggleAdminStatus() {
  const queryClient = useQueryClient();

  const activate = useMutation({
    mutationFn: async (id) => await api.put(`/api/v1/RootAdmin/admins/${id}/activate`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'] }),
  });

  const deactivate = useMutation({
    mutationFn: async (id) => await api.put(`/api/v1/RootAdmin/admins/${id}/deactivate`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'] }),
  });

  return { activate, deactivate };
}
