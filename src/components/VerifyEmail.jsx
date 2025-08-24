import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../lib/api'; // axios instance with baseURL

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || searchParams.get('key') || ''; // يقبل الاثنين
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMsg('Missing token.');
      return;
    }

    const doVerify = async () => {
      setStatus('loading');
      try {
        const res = await api.post('/api/v1/User/verify-email', { token });
        setStatus('success');
        setMsg(res?.data?.message || 'Email verified.');
        // redirect to reset-password (pass token)
        setTimeout(() => navigate(`/reset-password?token=${encodeURIComponent(token)}`), 800);
      } catch (err) {
        setStatus('error');
        setMsg(err?.response?.data?.message || 'Verification failed.');
      }
    };

    doVerify();
  }, [token, navigate]);

  return (
    <div className="container mt-5">
      {status === 'loading' && <p>Verifying token...</p>}
      {status === 'success' && <div className="alert alert-success">{msg}</div>}
      {status === 'error' && <div className="alert alert-danger">{msg}</div>}
    </div>
  );
}
