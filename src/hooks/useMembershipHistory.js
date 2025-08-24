import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export function useMembershipHistory(username, pageNumber = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['membershipHistory', { username, pageNumber, pageSize }],
    queryFn: async () => {
      if (!username) return { membershipActions: [], totalCount: 0 };

      const { data } = await api.get('/api/v1/Admin/members/membership-history', {
        params: { 
          Username: username,   // ✅ صح بدل MemberId
          PageNumber: pageNumber,
          PageSize: pageSize 
        },
      });

      return {
        membershipActions: data.membershipActions || [],
        totalCount: data.totalCount || 0,
      };
    },
    enabled: !!username,   // ✅ يتنفذ بس لو في username
    keepPreviousData: true,
  });
}
