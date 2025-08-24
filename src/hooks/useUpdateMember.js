// hooks/useUpdateMember.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

// hooks/useUpdateMember.js
export function useMemberData() {
  return useQuery({
    queryKey: ['member'],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/Member`);
      return data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 2, // 2 دقائق
  });
}


// MUTATION to update member
export function useUpdateMember() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      // هنا الـ payload بيكون زي:
      // { phoneNumber, country, city, addressDetails, major }
      const { data } = await api.put(`/api/v1/Member`, payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(['member']); // حدّث بيانات العضو الحالي
      qc.invalidateQueries(['members']); // لو عندك قائمة أعضاء
    },
  });
}
