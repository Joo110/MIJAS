import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MemberShipHistory() {
  const [membershipActions, setMembershipActions] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // اجلب بيانات تاريخ العضوية من API
  useEffect(() => {
    if (!memberId) return;

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          MemberId: memberId,
          PageNumber: pageNumber,
          PageSize: pageSize,
        };

        const response = await axios.get(
          'https://localhost:57884/api/v1/Admin/members/membership-history',
          { params }
        );

        setMembershipActions(response.data.membershipActions || []);
        setTotalCount(response.data.totalCount || 0);
      } catch (err) {
        console.error('❌ Error fetching membership history:', err);
        setError('Failed to fetch membership history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [memberId, pageNumber, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

  // تحويل نوع العملية من رقم لنص
  const getActionTypeLabel = (type) => {
    switch (type) {
      case 0:
        return 'Renewal';
      case 1:
        return 'Deactivation';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Membership History</h3>

      {/* إدخال MemberId */}
      <div className="mb-3 row justify-content-center">
        <label htmlFor="memberIdInput" className="col-sm-2 col-form-label fw-bold">
          Member ID:
        </label>
        <div className="col-sm-6">
          <input
            type="text"
            id="memberIdInput"
            className="form-control"
            placeholder="Enter Member ID (UUID)"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : membershipActions.length === 0 ? (
        memberId && <p className="text-center text-muted">No membership history found.</p>
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
              {membershipActions.map((action, index) => (
                <tr key={action.actionId}>
                  <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                  <td>{action.actionId}</td>
                  <td>{action.madeByUserName || 'N/A'}</td>
                  <td>{new Date(action.createdAt).toLocaleString()}</td>
                  <td>{getActionTypeLabel(action.actionType)}</td>
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

export default MemberShipHistory;
