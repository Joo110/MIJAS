import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useMemberHistory(username, pageNumber = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['memberHistory', username, pageNumber, pageSize],
    queryFn: async () => {
      if (!username.trim()) return { memberHistories: [], totalCount: 0 };

      const { data } = await api.get('/api/v1/Admin/members/member-history', {
        params: { username, pageNumber, pageSize },
      });

      return {
        memberHistories: data.memberHistories || data.data || [],
        totalCount: data.totalCount || 0,
      };
    },
    enabled: !!username.trim(),
    keepPreviousData: true,
  });
}