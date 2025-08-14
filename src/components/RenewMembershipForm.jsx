import React, { useState } from 'react';

function RenewMembershipForm({ memberId, onSubmit, onCancel }) {
  const [numberOfDays, setNumberOfDays] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const days = parseInt(numberOfDays, 10);
    const amt = parseFloat(amount);

    if (!days || !amt) {
      alert('❌ Invalid input');
      return;
    }

    onSubmit({ memberId, numberOfDays: days, amount: amt });
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 2000 }}>
      <div className="bg-white p-4 rounded shadow" style={{ width: '400px' }}>
        <h5 className="mb-3">Renew Membership</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Number of Days</label>
            <input
              type="number"
              className="form-control"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Renew
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RenewMembershipForm;
