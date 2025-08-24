import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useAdminDetails(adminId) {
  return useQuery({
    queryKey: ['adminDetails', adminId],
    queryFn: async () => {
      if (!adminId) return null;
      const { data } = await api.get(`/api/v1/RootAdmin/admins/${adminId}`);
      return data;
    },
    enabled: !!adminId, // يشغل الفتش بس لو فيه adminId
  });
}