import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const emailLower = email.toLowerCase();

    if (emailLower === 'user@gmail.com') {
      navigate('/home');
    } else if (emailLower === 'admin@gmail.com') {
      navigate('/admin');
    } else if (emailLower === 'rootadmin@gmail.com') {
      navigate('/superadmin');
    } else {
      alert('❌ Invalid email!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-4 bg-white p-4 shadow rounded">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src="/طط.webp" alt="MIJAS Logo" style={{ width: '200px' }} />
          </div>

          {/* Title */}
          <h4 className="text-center fw-bold">Hi !</h4>
          <h5 className="text-center mb-4 fw-bold">Welcome Back,</h5>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-3">
              <label className="form-label">Username, Email or Phone Number</label>
              <input
                type="text"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label d-flex justify-content-between">
                Password
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  👁️
                </span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                required
              />
            </div>

            {/* Fake reCAPTCHA */}
            <div className="bg-light border rounded p-2 mb-3 d-flex align-items-center justify-content-between">
              <span>I’m not a robot</span>
              <input type="checkbox" />
            </div>

            {/* Remember Me */}
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>

            {/* 🔵 LOGIN Button (Only one) */}
            <button
              type="button"
              className="btn w-100 text-white fw-bold fs-5"
              style={{ backgroundColor: '#79970b' }}
              onClick={handleLogin}
            >
              LOGIN
            </button>

            {/* Forgot Password */}
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => navigate('/forgot')}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
