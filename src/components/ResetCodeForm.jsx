import { useState } from 'react';

function ResetCodeForm({ onNavigate }) {
  const [code, setCode] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();

    // Fake validation
    if (code === '123456') {
      alert('Code verified successfully!');
      onNavigate('reset-password');
    } else {
      alert('Invalid code. Please try again.');
    }
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
          <h4 className="text-center fw-bold mb-4">Enter Reset Code</h4>

          {/* Form */}
          <form onSubmit={handleVerify}>
            <div className="form-group mb-3">
              <label className="form-label">Reset Code</label>
              <input
                type="text"
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: '#96B7A0' }}
            >
              Verify Code
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onNavigate('reset-password')}
              >
                Go to Reset Password
              </button>
            </div>

            <div className="text-center mt-2">
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

export default ResetCodeForm;
