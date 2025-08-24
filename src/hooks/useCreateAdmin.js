import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';

export function useCreateAdmin() {
  const createAdminMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/api/v1/RootAdmin/admins', formData);
      return data;
    },
  });

  return {
    createAdminMutation,
  };
}
