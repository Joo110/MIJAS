import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../lib/api";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    setErr("");
    if (!emailOrUsername || !password) {
      return setErr("⚠️ Please enter email/username and password");
    }

    try {
      setLoading(true);
      const res = await api.post("/api/v1/User/login", {
        emailOrUsername,
        password,
      });

      const data = res.data;
      console.log("Login response:", data);

      // ✅ فك التوكن
      const decoded = jwtDecode(data.token);
      console.log("🔍 Decoded token:", decoded);

      // ✅ خزن التوكن والـ id
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userId", decoded.sub);

      // ✅ خزّن بيانات الـ user
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: decoded.sub,
          username: decoded.preferred_username,
          email: decoded.email,
          roles: decoded.realm_access?.roles || [],
        })
      );

      // ✅ شوف لو فيه redirect جاي من الـ URL
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");

      if (redirect) {
        navigate(redirect, { replace: true });
      } else if (decoded.realm_access?.roles?.includes("mijas-root-admin")) {
        navigate("/superadmin");
      } else if (decoded.realm_access?.roles?.includes("mijas-admin")) {
        navigate("/admin");
      } else if (decoded.realm_access?.roles?.includes("mijas-member")) {
        navigate("/");
      } else {
        setErr("❌ Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error(error.response?.data);
      setErr(error?.response?.data?.message || "❌ Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-4 bg-white p-4 shadow rounded">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src="/طط.webp" alt="MIJAS Logo" style={{ width: "200px" }} />
          </div>

          {/* Title */}
          <h4 className="text-center fw-bold">Hi !</h4>
          <h5 className="text-center mb-4 fw-bold">Welcome Back,</h5>

          {/* Error */}
          {err && <div className="alert alert-danger">{err}</div>}

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-3">
              <label className="form-label">
                Username, Email or Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label d-flex justify-content-between">
                Password
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  👁️
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>

            {/* 🔵 LOGIN Button */}
            <button
              type="button"
              className="btn w-100 text-white fw-bold fs-5"
              style={{ backgroundColor: "hsla(120, 36%, 72%, 1.00)" }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            {/* Forgot Password */}
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => navigate("/forgot")}
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
