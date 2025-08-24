import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || searchParams.get('key') || '';
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) setErr('❌ Missing token.');
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');

    if (!password || password.length < 6) {
      return setErr('⚠️ Password must be at least 6 characters.');
    }
    if (password !== confirm) {
      return setErr('⚠️ Passwords do not match.');
    }

    try {
      setLoading(true);
      const res = await api.post('/api/v1/User/reset-password', {
        newPassword: password,
        confirmPassword: confirm,
        resetToken: token,
      });

      setSuccess(res?.data?.message || '✅ Password reset successful.');

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error(error.response?.data);
      setErr(error?.response?.data?.message || '❌ Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      {err && <div className="alert alert-danger">{err}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="form-control mb-2"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm password"
          className="form-control mb-2"
        />
        <button
          className="btn btn-primary w-100"
          disabled={loading || !token}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
