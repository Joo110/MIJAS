import { useState } from 'react';
import axios from 'axios';

function ForgotPasswordForm({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token'); // لو انت مخزن التوكن
      await axios.post(
        'http://localhost:9090/api/v1/User/forgot-password',
        { email },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Reset link sent successfully! Check your email.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send reset link. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-4 bg-white p-4 shadow rounded">
          <div className="text-center mb-4">
            <img src="/public/طط.webp" alt="MIJAS Logo" style={{ width: '200px' }} />
          </div>

          <form onSubmit={handleReset}>
            <div className="form-group mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white mb-2"
              style={{ backgroundColor: '#96B7A0' }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {message && <p className="text-center mt-2">{message}</p>}

          <button
            type="button"
            className="btn btn-outline-secondary w-100 mb-2"
            onClick={() => onNavigate('reset-code')}
          >
            Go to Reset Code Screen
          </button>

          <div className="text-center mt-2">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => onNavigate('login')}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
