import React from "react";
import { useMembershipRenewalDetails } from "../hooks/useMembershipRenewalDetails";

export default function MembershipRenewalCard({ renewalActionId, onClose }) {
  const { data, loading, error } = useMembershipRenewalDetails(renewalActionId);

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-card">Loading renewal details...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="modal-overlay">
        <div className="modal-card text-danger">Error loading details.</div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card card shadow-lg"
        onClick={(e) => e.stopPropagation()} // يمنع غلق المودال عند الضغط داخل الكارت
      >
        <div className="card-body">
          <h5 className="card-title text-center">Membership Renewal</h5>
          <p>
            <strong>Expiry Date:</strong>{" "}
            {new Date(data.expiresAt).toLocaleString()}
          </p>
          <p>
            <strong>Amount Paid:</strong> ${data.amount}
          </p>
          <button className="btn btn-secondary w-100 mt-3" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {/* شوية CSS بسيطة */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }
        .modal-card {
          width: 350px;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
