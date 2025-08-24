import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';

export function useAddMember() {
  return useMutation({
    mutationFn: async (formData) => {
  try {
    const { data } = await api.post('/api/v1/Admin/members', formData);
    console.log("✅ API Response:", data);  // شوف بيرجع إيه
    return data;
  } catch (error) {
    console.log("❌ API Error:", error); // اطبع كل تفاصيل الخطأ
    console.log("❌ API Error Response:", error.response?.data);
    if (error.response?.data?.length) {
      throw new Error(error.response.data[0].description);
    }
    throw new Error('❌ An unexpected error occurred.');
  }
},

  });
}