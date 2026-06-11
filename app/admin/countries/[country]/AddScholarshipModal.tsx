"use client";
import React, { useState } from "react";

type University = {
  id: number;
  name: string;
};

type AddScholarshipModalProps = {
  countryId: number;
  universitiesJSON: string; // JSON string of universities
};

const AddScholarshipModal: React.FC<AddScholarshipModalProps> = ({ countryId, universitiesJSON }) => {
  const universities: University[] = JSON.parse(universitiesJSON);
  console.log('AddScholarshipModal received universities:', universities);

  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    console.log('Universities prop length:', universities.length); // Debug log
    const payload = {
      title: data.get('title') as string,
      description: data.get('description') as string,
      universityId: parseInt(data.get('universityId') as string, 10),
      categoryId: parseInt(data.get('categoryId') as string, 10),
      countryId,
    };
    try {
      await fetch('/api/scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      window.location.reload();
    } catch (err) {
      console.error('Failed to create scholarship', err);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="add-scholarship-btn">
        Add Scholarship
      </button>
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Create Scholarship</h2>
            <form onSubmit={handleCreate} className="modal-form">
              <label>
                Title
                <input type="text" name="title" required />
              </label>
              <label>
                Description
                <textarea name="description" required />
              </label>
              <label>
                University
                <select name="universityId" required defaultValue="">
                  <option value="" disabled>Select a university</option>
                  {universities.map(u => (
                    <option key={u.id} value={u.id.toString()}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Category
                <select name="categoryId" required>
                  <option value="1">MBBS</option>
                  <option value="2">BDS</option>
                  <option value="3">PHD</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .add-scholarship-btn {
          background: var(--primary);
          color: #000;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .add-scholarship-btn:hover { background: var(--primary-dark); }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease-out;
        }
        .modal {
          background: rgba(255,255,255,0.9);
          padding: 2rem;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 4px 30px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
          animation: slideUp 0.3s ease-out;
        }
        .modal-form label {
          display: block;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        .modal-form input,
        .modal-form textarea,
        .modal-form select {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-family: inherit;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .cancel-btn {
          background: #eee;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .submit-btn {
          background: var(--primary);
          color: #000;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </>
  );
};

export default AddScholarshipModal;
