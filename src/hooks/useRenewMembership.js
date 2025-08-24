import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';

export function useRenewMembership() {
  const renewMembershipMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.put(
        '/api/v1/Admin/members/renew-membership',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return data;
    },
  });

  return { renewMembershipMutation };
}
