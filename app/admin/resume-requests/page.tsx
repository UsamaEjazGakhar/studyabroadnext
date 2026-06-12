"use client";
import React, { useEffect, useState } from 'react';

interface ResumeRequest {
  id: number;
  gmail: string | null;
  whatsapp: string | null;
  paymentProof: string;
  status: string;
  createdAt: string;
}

export default function ResumeRequestsPage() {
  const [requests, setRequests] = useState<ResumeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actioningId, setActioningId] = useState<number | null>(null);
  
  // State for active payment proof preview in modal
  const [selectedProofUrl, setSelectedProofUrl] = useState<string | null>(null);

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/resume-request');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        setError('Invalid response format');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch resume requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle Approve / Reject
  const handleStatusChange = async (requestId: number, newStatus: 'Approved' | 'Rejected') => {
    setActioningId(requestId);
    try {
      const res = await fetch('/api/admin/resume-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        // Update local state
        setRequests(prev =>
          prev.map(req => (req.id === requestId ? { ...req, status: newStatus } : req))
        );
      } else {
        alert(data.error || 'Failed to update request status.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1C3A', margin: '0 0 6px 0' }}>
          Resume Requests
        </h1>
        <p style={{ fontSize: '14.5px', color: '#5a718e', margin: 0 }}>
          Manage payments, review receipts, and approve/reject resume build requests.
        </p>
      </div>

      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #ef4444',
          color: '#991b1b',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#5a718e', fontSize: '15px' }}>
          Loading requests list...
        </div>
      ) : requests.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 40px',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px dashed #cbd5e1',
          color: '#5a718e',
          fontSize: '15px'
        }}>
          📬 No resume requests submitted yet.
        </div>
      ) : (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(11, 28, 58, 0.04)',
          border: '1px solid rgba(11, 28, 58, 0.05)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                <th style={thStyle}>Date & Time</th>
                <th style={thStyle}>Gmail Contact</th>
                <th style={thStyle}>WhatsApp Contact</th>
                <th style={thStyle}>Payment Proof</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                  <td style={tdStyle}>
                    {new Date(req.createdAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>
                  <td style={tdStyle}>{req.gmail || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>None</span>}</td>
                  <td style={tdStyle}>{req.whatsapp || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>None</span>}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => setSelectedProofUrl(req.paymentProof)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2563eb',
                        textDecoration: 'underline',
                        fontWeight: 600,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      📄 View Proof File
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <span style={getStatusBadgeStyle(req.status)}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    {req.status === 'Pending' ? (
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          disabled={actioningId === req.id}
                          onClick={() => handleStatusChange(req.id, 'Approved')}
                          style={{
                            background: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          disabled={actioningId === req.id}
                          onClick={() => handleStatusChange(req.id, 'Rejected')}
                          style={{
                            background: '#ef4444',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                        Reviewed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ═══════════════ PAYMENT PROOF MODAL ═══════════════ */}
      {selectedProofUrl && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(11, 28, 58, 0.6)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '850px',
            width: '90%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(11, 28, 58, 0.25)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedProofUrl(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#64748b',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
            >
              ✕
            </button>

            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: '#0B1C3A' }}>
              Payment Proof Receipt
            </h3>

            {/* Proof Preview Wrapper */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '16px',
              minHeight: '400px'
            }}>
              {/\.(jpg|jpeg|png|webp|gif)$/i.test(selectedProofUrl) ? (
                <img
                  src={selectedProofUrl}
                  alt="Payment Proof"
                  style={{ maxWidth: '100%', maxHeight: '65vh', borderRadius: '8px', objectFit: 'contain' }}
                />
              ) : /\.pdf$/i.test(selectedProofUrl) ? (
                <iframe
                  src={selectedProofUrl}
                  title="PDF Payment Proof"
                  style={{ width: '100%', height: '65vh', border: 'none', borderRadius: '8px' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ fontSize: '15px', color: '#475569', marginBottom: '20px', fontWeight: 500 }}>
                    This document format (.docx / other) cannot be previewed directly in the browser.
                  </p>
                  <a
                    href={selectedProofUrl}
                    download
                    style={{
                      background: 'linear-gradient(135deg, #0B1C3A, #112D5E)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '14.5px',
                      display: 'inline-block',
                      boxShadow: '0 4px 12px rgba(11, 28, 58, 0.15)'
                    }}
                  >
                    📥 Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: '13px',
  fontWeight: 700,
  color: '#0B1C3A',
  textTransform: 'uppercase',
  letterSpacing: '0.04em'
};

const tdStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: '14px',
  color: '#334155'
};

const getStatusBadgeStyle = (status: string): React.CSSProperties => {
  const base: React.CSSProperties = {
    padding: '4px 10px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: 700,
    display: 'inline-block',
    textTransform: 'capitalize'
  };

  switch (status) {
    case 'Approved':
      return { ...base, background: '#d1fae5', color: '#065f46' };
    case 'Rejected':
      return { ...base, background: '#fee2e2', color: '#991b1b' };
    default:
      return { ...base, background: '#fef3c7', color: '#92400e' };
  }
};
