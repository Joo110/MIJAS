'use client';
import React, { useState } from 'react';
import { useMemberHistory } from '../hooks/useMemberHistory';

export default function MemberHistory() {
  const [username, setUsername] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useMemberHistory(username, pageNumber, pageSize);

  const memberHistory = data?.memberHistories || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const getActionTypeLabel = (actionTypeId) => {
    switch (actionTypeId) {
      case 1: return 'Create';
      case 2: return 'Update';
      case 3: return 'Activate';
      case 4: return 'Deactivate';
      case 5: return 'Delete';
      default: return 'Unknown';
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Member History</h3>

      {/* إدخال اسم المستخدم */}
      <div className="mb-3 row justify-content-center">
        <label htmlFor="usernameInput" className="col-sm-2 col-form-label fw-bold">
          Username:
        </label>
        <div className="col-sm-6">
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Enter Member Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setPageNumber(1);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-danger text-center">{error.message || 'Failed to fetch member history.'}</p>
      ) : memberHistory.length === 0 ? (
        username.trim() && <p className="text-center text-muted">No member history found.</p>
      ) : (
        <>
          <table className="table table-bordered shadow">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Action ID</th>
                <th>Made By</th>
                <th>Date</th>
                <th>Action Type</th>
              </tr>
            </thead>
            <tbody>
              {memberHistory.map((action, index) => (
                <tr key={action.actionId}>
                  <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                  <td>{action.actionId}</td>
                  <td>{action.madeByUserName || 'N/A'}</td>
                  <td>{new Date(action.createdAt).toLocaleString()}</td>
                  <td>{getActionTypeLabel(action.actionTypeId)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${pageNumber === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPageNumber(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
