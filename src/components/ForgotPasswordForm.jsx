import { useState } from 'react';

function ForgotPasswordForm({ onNavigate }) {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    alert(`A reset link has been sent to ${email}`);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-4 bg-white p-4 shadow rounded">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src="/public/طط.webp" alt="MIJAS Logo" style={{ width: '200px' }} />
          </div>

          {/* Form */}
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

            {/* Send Button */}
            <button
              type="submit"
              className="btn w-100 text-white mb-2"
              style={{ backgroundColor: '#96B7A0' }}
            >
              Send Reset Link
            </button>
          </form>

          <button
            type="button"
            className="btn btn-outline-secondary w-100 mb-2"
            onClick={() => onNavigate('reset-code')}
          >
            Go to Reset Code Screen
          </button>

          {/* Back to Login */}
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
