import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      try {
        await api.delete(`/api/v1/Admin/members/${id}`);
        return id;
      } catch (error) {
        if (error.response?.data?.length) {
          throw new Error(error.response.data[0].description);
        }
        throw new Error('❌ An unexpected error occurred.');
      }
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['members'] }); // إعادة تحميل قائمة الأعضاء
      alert(`✅ Member with ID ${id} deleted successfully`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}