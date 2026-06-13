"use client";
import React, { useState } from 'react';

export default function RequestResumePage() {
  const [gmail, setGmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as any).files;

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!gmail.trim() && !whatsapp.trim()) {
      setError('Please provide at least one contact method: Gmail or WhatsApp.');
      return;
    }

    if (!file) {
      setError('Please upload proof of payment (screenshot, PDF, or image).');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('gmail', gmail);
      formData.append('whatsapp', whatsapp);
      formData.append('paymentProof', file);

      const res = await fetch('/api/resume-request', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json() as any;

      if (data.success) {
        setSuccess(true);
        setGmail('');
        setWhatsapp('');
        setFile(null);
        // Reset file input value manually
        const fileInput = (globalThis as any).document?.getElementById('paymentProofInput');
        if (fileInput) fileInput.value = '';
      } else {
        setError(data.message || 'Failed to submit your request.');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '650px',
      margin: '40px auto',
      padding: '32px',
      background: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(11, 28, 58, 0.08)',
      border: '1px solid rgba(11, 28, 58, 0.05)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span style={{
          background: 'rgba(0, 201, 177, 0.12)',
          color: '#009E8C',
          padding: '6px 14px',
          borderRadius: '50px',
          fontSize: '12.5px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'inline-block',
          marginBottom: '12px'
        }}>
          Resume Service
        </span>
        <h1 style={{
          fontSize: '26px',
          fontWeight: 800,
          color: '#0B1C3A',
          margin: '0 0 10px 0',
          letterSpacing: '-0.02em'
        }}>
          Request Professional Resume
        </h1>
        <p style={{
          fontSize: '14.5px',
          color: '#5a718e',
          lineHeight: '1.6',
          margin: 0
        }}>
          Fill out the contact details below, make the payment of 500 PKR, and upload the proof.
          Our admin team will connect with you to construct your professional resume.
        </p>
      </div>

      {success && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #10b981',
          color: '#065f46',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          fontSize: '14.5px',
          lineHeight: '1.5'
        }}>
          🎉 <strong>Request Submitted Successfully!</strong> Your proof has been uploaded. The admin will verify the payment and contact you shortly to build your resume.
        </div>
      )}

      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #ef4444',
          color: '#991b1b',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          fontSize: '14.5px'
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Gmail Input */}
        <div>
          <label htmlFor="gmailInput" style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 700,
            color: '#0B1C3A',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Gmail Address
          </label>
          <input
            id="gmailInput"
            type="email"
            value={gmail}
            onChange={e => setGmail((e.target as any).value)}
            placeholder="e.g. yourname@gmail.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1.5px solid #dce5f0',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none',
              background: '#f8fafd',
              transition: 'all 0.2s'
            }}
          />
        </div>

        {/* Whatsapp Input */}
        <div>
          <label htmlFor="whatsappInput" style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 700,
            color: '#0B1C3A',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            WhatsApp Number
          </label>
          <input
            id="whatsappInput"
            type="text"
            value={whatsapp}
            onChange={e => setWhatsapp((e.target as any).value)}
            placeholder="e.g. +92 300 1234567"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1.5px solid #dce5f0',
              borderRadius: '10px',
              fontSize: '14px',
              outline: 'none',
              background: '#f8fafd',
              transition: 'all 0.2s'
            }}
          />
          <span style={{ fontSize: '12px', color: '#6b7f99', display: 'block', marginTop: '4px' }}>
            * Provide either Gmail, WhatsApp, or both so we can contact you.
          </span>
        </div>

        {/* Pricing Info Box */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px dashed #00C9B1',
          borderRadius: '12px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#4a5e78', textTransform: 'uppercase' }}>Service Charges</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0B1C3A', marginTop: '2px' }}>500 PKR</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#4a5e78', textTransform: 'uppercase' }}>EasyPaisa Account</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#009E8C', marginTop: '2px' }}>03070011118</div>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#4a5e78',
            fontSize: '14px',
            margin: '4px 0',
            position: 'relative'
          }}>
            <span style={{ background: '#f8fafc', padding: '0 10px', zIndex: 1, position: 'relative' }}>OR</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #e2e8f0', zIndex: 0 }}></div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#4a5e78', textTransform: 'uppercase', marginBottom: '6px' }}>NayaPay (Scan to Pay)</div>
            <img
              src="/qrnayapay.jpg"
              alt="NayaPay QR Code"
              style={{
                maxWidth: '200px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'inline-block'
              }}
            />
          </div>

          <div style={{
            fontSize: '12.5px',
            color: '#5a718e',
            lineHeight: '1.5',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '10px'
          }}>
            Please send exactly <strong>500 PKR</strong> to the EasyPaisa account number above or scan the NayaPay QR code, and upload a screenshot or document of the transaction receipt below.
          </div>
        </div>

        {/* Payment Proof Upload */}
        <div>
          <label htmlFor="paymentProofInput" style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 700,
            color: '#0B1C3A',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Upload Payment Proof
          </label>
          <input
            id="paymentProofInput"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,image/*"
            style={{
              width: '100%',
              padding: '10px',
              border: '1.5px dashed #cbd5e1',
              borderRadius: '10px',
              fontSize: '13.5px',
              outline: 'none',
              background: '#ffffff',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '12px', color: '#6b7f99', display: 'block', marginTop: '4px' }}>
            Accepted Formats: PDF, DOCX, or any Image format (JPG, PNG, WebP).
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg, #0B1C3A, #112D5E)',
            color: '#ffffff',
            border: 'none',
            padding: '14px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(11, 28, 58, 0.15)',
            transition: 'all 0.2s',
            marginTop: '10px'
          }}
        >
          {loading ? 'Submitting request...' : '🚀 Send Request'}
        </button>
      </form>
    </div>
  );
}
