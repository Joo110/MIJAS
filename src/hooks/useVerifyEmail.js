import { useMutation } from "@tanstack/react-query";
import api from '../lib/api';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (userId) => {
      const { data } = await api.post("/api/v1/User/send-verfication-email", {
        userId,
      });
      return data;
    },
  });
}