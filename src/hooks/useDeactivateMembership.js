import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export function useDeactivateMembership() {
  const queryClient = useQueryClient();

  const deactivateMutation = useMutation({
    mutationFn: async ({ memberId }) => {
      const { data } = await api.put('/api/v1/Admin/members/deactivate-membership', 
        { memberId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
  });

  return { deactivateMutation };
}