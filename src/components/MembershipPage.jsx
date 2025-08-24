import React, { useEffect, useState } from "react";
import { FaIdBadge, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";
import { User } from "lucide-react";
import api from "../lib/api";

/** decodeJwtPayload كما قبل */
function decodeJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function MembershipPage({ user: userProp }) {
  const [userData, setUserData] = useState({
    username: "",
    memberFullName: "",
    isActive: false,
    expiryDate: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function init() {
      setLoading(true);
      setError("");

      if (userProp) {
        setUserData({
          username: userProp.username || "",
          memberFullName: userProp.memberFullName || "",
          isActive: typeof userProp.isActive === "boolean" ? userProp.isActive : true,
          expiryDate: userProp.expiryDate || null,
        });
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        if (mounted) {
          setError("No auth token found. Please login.");
          setLoading(false);
        }
        return;
      }

      const decoded = decodeJwtPayload(token);
      const username = decoded?.preferred_username || decoded?.email || "";
      const memberFullName =
        (decoded?.given_name || decoded?.name || "") +
        (decoded?.family_name ? ` ${decoded.family_name}` : "");
      const expiryFromToken = decoded?.exp ? new Date(decoded.exp * 1000).toISOString() : null;

      if (mounted) {
        setUserData({
          username,
          memberFullName: memberFullName.trim(),
          isActive: true,
          expiryDate: expiryFromToken,
        });
      }

      const userId = decoded?.sub || localStorage.getItem("userId");
      if (!userId) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/api/v1/Member/membership-info", {
          params: { memberId: userId },
        });

        if (!mounted) return;

        setUserData({
          username: data.username || username || data.email || "",
          memberFullName:
            (data.firstName ? data.firstName : "") +
              (data.lastName ? ` ${data.lastName}` : "") ||
            memberFullName ||
            username,
          isActive: typeof data.isActive === "boolean" ? data.isActive : data.isActiveUser ?? true,
          expiryDate: data.expiryDate || data.membershipExpiry || expiryFromToken,
        });
      } catch (err) {
        console.error("Failed to fetch member details full:", err);
        const status = err?.response?.status;
        const respData = err?.response?.data;
        if (mounted) {
          if (status === 401) {
            setError("Unauthorized (401): token missing/invalid. Please login again.");
          } else if (status === 403) {
            setError(
              "Forbidden (403): your account doesn't have permission to view membership info. " +
                "Check your user role or use a token with the required role."
            );
          } else if (status === 404) {
            setError("Not found (404): membership info not available for this user.");
          } else if (status === 500) {
            setError("Server error (500). Check backend logs.");
          } else {
            setError(
              status
                ? `Failed to load profile (status ${status}): ${JSON.stringify(respData)}`
                : `Network error: ${err.message}`
            );
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, [userProp]);

  const formatDate = (d) => {
    if (!d) return "-";
    try {
      const date = new Date(d);
      if (Number.isNaN(date.getTime())) return d;
      return date.toLocaleDateString();
    } catch {
      return d;
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body text-center">
          <div
            className="d-flex justify-content-center align-items-center mx-auto mb-3"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              border: "2px solid #96B7A0",
            }}
          >
            <img
              src="/Icon.png"
              alt="Logo"
              style={{
                width: "70%",
                height: "70%",
                animation: "spin 10s linear infinite",
              }}
            />
          </div>

          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>

          <h4 className="card-title mb-4" style={{ color: "#96B7A0", fontSize: "1.8rem" }}>
            Membership Information
          </h4>

          {loading ? (
            <div className="py-4">⏳ Loading...</div>
          ) : (
            <>
              {error && <div className="alert alert-warning small text-start mx-3">{error}</div>}

              <ul className="list-group list-group-flush text-start fs-5">
                <li className="list-group-item d-flex align-items-center">
                  <User className="me-2" />
                  <strong className="me-2">Username:</strong> {userData.username || "-"}
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <FaIdBadge className="me-2 text-warning" />
                  <strong className="me-2">Full Name:</strong> {userData.memberFullName || "-"}
                </li>

                <li className="list-group-item d-flex align-items-center">
                  {userData.isActive ? (
                    <FaCheckCircle className="me-2 text-success" />
                  ) : (
                    <FaTimesCircle className="me-2 text-danger" />
                  )}
                  <strong className="me-2">Status:</strong>
                  <span className={userData.isActive ? "text-success" : "text-danger"}>
                    {userData.isActive ? "Active" : "Inactive"}
                  </span>
                </li>

                <li className="list-group-item d-flex align-items-center">
                  <FaCalendarAlt className="me-2 text-secondary" />
                  <strong className="me-2">Expiry Date:</strong> {userData.isActive ? formatDate(userData.expiryDate) : "....."}

                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
