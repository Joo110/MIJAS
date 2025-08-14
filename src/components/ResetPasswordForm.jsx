import { useState } from 'react';

function ResetPasswordForm({ onNavigate }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }


    alert('Password has been reset successfully!');
    onNavigate('login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-4 bg-white p-4 shadow rounded">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src="/public/طط.webp" alt="MIJAS Logo" style={{ width: '200px' }} />
          </div>

          {/* Title */}
          <h4 className="text-center fw-bold mb-4">Set New Password</h4>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label d-flex justify-content-between">
                New Password
                <span style={{ cursor: 'pointer' }} onClick={() => setShowPassword((prev) => !prev)}>
                  👁️
                </span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: '#96B7A0' }}
            >
              Reset Password
            </button>

            {/* Back to Login */}
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => onNavigate('login')}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
