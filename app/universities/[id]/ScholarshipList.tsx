"use client";

import React, { useState } from 'react';

interface Scholarship {
  id: string | number;
  title: string;
  amount?: string;
  link?: string;
  description?: string | null;
  category?: string | null;
  benefits?: string | null;
  eligibility?: string | null;
  requiredDocuments?: string | null;
  // Allow any additional fields from Prisma model
  [key: string]: any;
}

interface Props {
  scholarships: Scholarship[];
}

export default function ScholarshipList({ scholarships }: Props) {
  const [selected, setSelected] = useState<Scholarship | null>(null);

  return (
    <>
      {scholarships.length === 0 ? (
        <p>No scholarships listed for this university.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {scholarships.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setSelected(s)}
                className="text-black text-lg cursor-pointer"
              >
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{selected.title}</h3>
            {selected.amount && (
              <p className="mb-2 text-lg"><strong>Amount:</strong> {selected.amount}</p>
            )}
            {selected.category && (
              <p className="mb-2 text-lg"><strong>Category:</strong> {selected.category}</p>
            )}
            {selected.benefits && (
              <p className="mb-2 text-lg"><strong>Benefits:</strong> {selected.benefits}</p>
            )}
            {selected.eligibility && (
              <p className="mb-2 text-lg"><strong>Eligibility:</strong> {selected.eligibility}</p>
            )}
            {selected.requiredDocuments && (
              <p className="mb-2 text-lg"><strong>Required Documents:</strong> {selected.requiredDocuments}</p>
            )}
            {selected.description && (
              <p className="mb-4 text-base text-gray-700">{selected.description}</p>
            )}
            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg block mb-4"
              >
                Visit Scholarship Page
              </a>
            )}
            <a
              href="https://wa.me/923331165573"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Apply Now
            </a>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-lg block"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
