import { useState, useEffect } from "react";
import api from '../lib/api';

export function useMembershipRenewalDetails(renewalActionId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!renewalActionId) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/api/v1/Admin/members/${renewalActionId}/membership-renewal-details`
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [renewalActionId]);

  return { data, loading, error };
}
