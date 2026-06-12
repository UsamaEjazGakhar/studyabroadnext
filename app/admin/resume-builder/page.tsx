"use client";
import React, { useState } from 'react';
import './resume.css';

interface Section {
  id: string;
  title: string;
  type: 'text' | 'experience' | 'education' | 'project' | 'certification';
  content: string;
  items: any[];
}

interface ContactLink {
  id: string;
  label: string;
  value: string;
}

export default function ResumeBuilderPage() {
  // Basic personal details (start blank, no mock data)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('USA / Canada / UK / Australia');
  const [role, setRole] = useState('Software Engineer');

  // Dynamic Contact Links (LinkedIn, GitHub, Portfolio - start editable & deletable)
  const [contactLinks, setContactLinks] = useState<ContactLink[]>([
    { id: 'linkedin', label: 'LinkedIn', value: '' },
    { id: 'github', label: 'GitHub', value: '' },
    { id: 'portfolio', label: 'Portfolio', value: '' }
  ]);

  // Default clean sections list (no mock data, each list section starts with 1 empty item so user can type directly)
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'summary',
      title: 'Professional Summary',
      type: 'text',
      content: '',
      items: []
    },
    {
      id: 'skills',
      title: 'Core Skills',
      type: 'text',
      content: '',
      items: []
    },
    {
      id: 'experience',
      title: 'Professional Experience',
      type: 'experience',
      content: '',
      items: [{ company: '', title: '', duration: '', responsibilities: '' }]
    },
    {
      id: 'projects',
      title: 'Projects',
      type: 'project',
      content: '',
      items: [{ name: '', technology: '', description: '' }]
    },
    {
      id: 'education',
      title: 'Education',
      type: 'education',
      content: '',
      items: [{ degree: '', institute: '', duration: '' }]
    },
    {
      id: 'certifications',
      title: 'Certifications',
      type: 'certification',
      content: '',
      items: [{ cert: '', issuer: '', year: '' }]
    },
    {
      id: 'languages',
      title: 'Languages',
      type: 'text',
      content: '',
      items: []
    }
  ]);

  // ─── Contact Link Handlers ─────────────────────────────────────
  const renameContactLink = (id: string, newLabel: string) => {
    setContactLinks(prev =>
      prev.map(link => (link.id === id ? { ...link, label: newLabel } : link))
    );
  };

  const updateContactLinkValue = (id: string, value: string) => {
    setContactLinks(prev =>
      prev.map(link => (link.id === id ? { ...link, value } : link))
    );
  };

  const removeContactLink = (id: string) => {
    setContactLinks(prev => prev.filter(link => link.id !== id));
  };

  const addContactLink = () => {
    const id = `link_${Date.now()}`;
    setContactLinks(prev => [...prev, { id, label: 'Custom Link', value: '' }]);
  };

  // ─── Section Handlers ──────────────────────────────────────────
  const renameSection = (id: string, newTitle: string) => {
    setSections(prev =>
      prev.map(sec => (sec.id === id ? { ...sec, title: newTitle } : sec))
    );
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(sec => sec.id !== id));
  };

  const addCustomSection = (type: 'text' | 'experience' | 'education' | 'project' | 'certification') => {
    const id = `custom_${Date.now()}`;
    let defaultTitle = 'New Section';
    let defaultItems: any[] = [];

    if (type === 'experience') {
      defaultTitle = 'Experience Section';
      defaultItems = [{ company: '', title: '', duration: '', responsibilities: '' }];
    } else if (type === 'education') {
      defaultTitle = 'Education Section';
      defaultItems = [{ degree: '', institute: '', duration: '' }];
    } else if (type === 'project') {
      defaultTitle = 'Projects Section';
      defaultItems = [{ name: '', technology: '', description: '' }];
    } else if (type === 'certification') {
      defaultTitle = 'Certifications Section';
      defaultItems = [{ cert: '', issuer: '', year: '' }];
    }

    const newSec: Section = {
      id,
      title: defaultTitle,
      type,
      content: '',
      items: defaultItems
    };

    setSections(prev => [...prev, newSec]);
  };

  // ─── Item Handlers ─────────────────────────────────────────────
  const addItemToSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(sec => {
        if (sec.id !== sectionId) return sec;
        let newItem = {};
        if (sec.type === 'experience') {
          newItem = { company: '', title: '', duration: '', responsibilities: '' };
        } else if (sec.type === 'education') {
          newItem = { degree: '', institute: '', duration: '' };
        } else if (sec.type === 'project') {
          newItem = { name: '', technology: '', description: '' };
        } else if (sec.type === 'certification') {
          newItem = { cert: '', issuer: '', year: '' };
        }
        return { ...sec, items: [...sec.items, newItem] };
      })
    );
  };

  const removeItemFromSection = (sectionId: string, itemIndex: number) => {
    setSections(prev =>
      prev.map(sec => {
        if (sec.id !== sectionId) return sec;
        return { ...sec, items: sec.items.filter((_, idx) => idx !== itemIndex) };
      })
    );
  };

  const updateSectionItemField = (sectionId: string, itemIndex: number, field: string, value: string) => {
    setSections(prev =>
      prev.map(sec => {
        if (sec.id !== sectionId) return sec;
        const updatedItems = [...sec.items];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
        return { ...sec, items: updatedItems };
      })
    );
  };

  const updateSectionTextContent = (sectionId: string, value: string) => {
    setSections(prev =>
      prev.map(sec => (sec.id === sectionId ? { ...sec, content: value } : sec))
    );
  };

  // ─── Print Logic ───────────────────────────────────────────────
  const printResume = () => {
    const resumeElement = document.getElementById('resume');
    if (!resumeElement) return;
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(node => node.outerHTML)
        .join('');
      newWindow.document.write(
        `<!DOCTYPE html><html><head><title></title>${styles}</head><body>${resumeElement.outerHTML}</body></html>`
      );
      newWindow.document.close();
      newWindow.focus();
      newWindow.print();
      newWindow.close();
    }
  };

  return (
    <div className="wrapper">
      {/* ═══════════════ LEFT PANEL (Form) ═══════════════ */}
      <div className="panel">
        <h2 className="panel-title">Resume Builder (Admin Panel)</h2>

        {/* Region & Target Role */}
        <label>Region</label>
        <select value={region} onChange={e => setRegion(e.target.value)}>
          <option>USA / Canada / UK / Australia</option>
          <option>China</option>
          <option>Russia</option>
          <option>Europe</option>
        </select>

        <label>Target Role</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option>Software Engineer</option>
          <option>Business Development</option>
          <option>Marketing Manager</option>
          <option>Sales Executive</option>
          <option>Doctor</option>
          <option>Teacher</option>
          <option>Student</option>
        </select>

        {/* Personal Details */}
        <h2 className="panel-title" style={{ fontSize: '15px', marginTop: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Personal Details</h2>
        
        <label>Full Name</label>
        <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. John Doe" />
        
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. john.doe@email.com" />
        
        <label>Phone</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +1 234 567 890" />
        
        <label>Location</label>
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. New York, USA" />
        
        {/* Dynamic Social & Web Links */}
        {contactLinks.map(link => (
          <div key={link.id} style={{ marginBottom: '10px' }}>
            <div className="contact-link-row">
              <input
                className="contact-link-label-input"
                value={link.label}
                onChange={e => renameContactLink(link.id, e.target.value)}
                placeholder="Link Label (e.g. LinkedIn)"
                title="Click to rename this link"
              />
              <button
                className="section-header-btn delete-sec-btn"
                style={{ width: '22px', height: '22px', fontSize: '11px' }}
                onClick={() => removeContactLink(link.id)}
                title="Remove this link"
              >
                −
              </button>
            </div>
            <input
              value={link.value}
              onChange={e => updateContactLinkValue(link.id, e.target.value)}
              placeholder={`e.g. link or username`}
            />
          </div>
        ))}

        {/* Add custom contact link button */}
        <button
          className="add-section-btn"
          style={{ width: '100%', marginTop: '10px', fontSize: '12px', padding: '6px' }}
          onClick={addContactLink}
        >
          + Add Link
        </button>

        {/* Dynamic Sections */}
        {sections.map(sec => (
          <div key={sec.id} className="section-form-group">
            {/* Header: editable title input + controls */}
            <div className="section-header-row">
              <input
                className="section-title-input"
                value={sec.title}
                onChange={e => renameSection(sec.id, e.target.value)}
                placeholder="Section Name"
                title="Click to rename this section"
              />
              
              {/* Add item button (only visible for list-based sections) */}
              {sec.type !== 'text' && (
                <button
                  className="section-header-btn add-item-btn"
                  onClick={() => addItemToSection(sec.id)}
                  title="Add item to this section"
                >
                  +
                </button>
              )}

              {/* Remove entire section button */}
              <button
                className="section-header-btn delete-sec-btn"
                onClick={() => removeSection(sec.id)}
                title="Delete this entire section"
              >
                −
              </button>
            </div>

            {/* Content: if type text, show simple textarea */}
            {sec.type === 'text' && (
              <textarea
                value={sec.content}
                onChange={e => updateSectionTextContent(sec.id, e.target.value)}
                placeholder={`Enter details for ${sec.title}...`}
              />
            )}

            {/* List items rendering */}
            {sec.type !== 'text' && sec.items.map((item, idx) => (
              <div key={idx} className="repeat-box">
                {/* Delete current item button */}
                <button
                  className="item-delete-btn"
                  onClick={() => removeItemFromSection(sec.id, idx)}
                  title="Delete item"
                >
                  ✕
                </button>

                {sec.type === 'experience' && (
                  <>
                    <input
                      placeholder="Company"
                      value={item.company || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'company', e.target.value)}
                    />
                    <input
                      placeholder="Job Title"
                      value={item.title || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'title', e.target.value)}
                    />
                    <input
                      placeholder="Duration (e.g. Jan 2022 – Present)"
                      value={item.duration || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'duration', e.target.value)}
                    />
                    <textarea
                      placeholder="Responsibilities..."
                      value={item.responsibilities || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'responsibilities', e.target.value)}
                    />
                  </>
                )}

                {sec.type === 'education' && (
                  <>
                    <input
                      placeholder="Degree / Qualification"
                      value={item.degree || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'degree', e.target.value)}
                    />
                    <input
                      placeholder="Institute / University"
                      value={item.institute || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'institute', e.target.value)}
                    />
                    <input
                      placeholder="Duration (e.g. 2016 – 2020)"
                      value={item.duration || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'duration', e.target.value)}
                    />
                  </>
                )}

                {sec.type === 'project' && (
                  <>
                    <input
                      placeholder="Project Name"
                      value={item.name || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'name', e.target.value)}
                    />
                    <input
                      placeholder="Technologies Used"
                      value={item.technology || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'technology', e.target.value)}
                    />
                    <textarea
                      placeholder="Project Description..."
                      value={item.description || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'description', e.target.value)}
                    />
                  </>
                )}

                {sec.type === 'certification' && (
                  <>
                    <input
                      placeholder="Certification Name"
                      value={item.cert || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'cert', e.target.value)}
                    />
                    <input
                      placeholder="Issuing Organization"
                      value={item.issuer || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'issuer', e.target.value)}
                    />
                    <input
                      placeholder="Year"
                      value={item.year || ''}
                      onChange={e => updateSectionItemField(sec.id, idx, 'year', e.target.value)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Add Section Controller */}
        <div className="add-section-container">
          <h3>+ Add Section</h3>
          <div className="add-section-btn-group">
            <button className="add-section-btn" onClick={() => addCustomSection('text')}>Text Section</button>
            <button className="add-section-btn" onClick={() => addCustomSection('experience')}>Experience Sec.</button>
            <button className="add-section-btn" onClick={() => addCustomSection('project')}>Projects Sec.</button>
            <button className="add-section-btn" onClick={() => addCustomSection('education')}>Education Sec.</button>
          </div>
        </div>

        {/* Actions */}
        <div className="action-buttons-row">
          <button className="btn-print" onClick={printResume}>🖨 Print Resume</button>
        </div>
      </div>

      {/* ═══════════════ RIGHT PANEL (Resume Preview) ═══════════════ */}
      <div className="resume" id="resume">
        <div className="resume-name">{fullName || 'YOUR NAME'}</div>
        <div className="resume-role">{role}</div>
        <div className="contact">
          {[
            email,
            phone,
            location,
            ...contactLinks
              .filter(link => link.value.trim() !== '')
              .map(link => `${link.label}: ${link.value}`)
          ]
            .filter(Boolean)
            .join('  |  ')}
        </div>

        {/* Render sections dynamically in preview */}
        {sections.map(sec => {
          // Skip empty sections
          if (sec.type === 'text' && !sec.content.trim()) return null;
          if (sec.type !== 'text' && sec.items.length === 0) return null;

          return (
            <div key={sec.id} className="section">
              <h3>{sec.title}</h3>

              {/* Text content type */}
              {sec.type === 'text' && (
                <p className="entry-desc">{sec.content}</p>
              )}

              {/* List items type */}
              {sec.type !== 'text' && sec.items.map((item, idx) => {
                // Determine item fields dynamically based on section type
                let title = '';
                let subtitle = '';
                let date = '';
                let desc = '';

                if (sec.type === 'experience') {
                  title = item.title;
                  subtitle = item.company;
                  date = item.duration;
                  desc = item.responsibilities;
                } else if (sec.type === 'education') {
                  title = item.degree;
                  subtitle = item.institute;
                  date = item.duration;
                } else if (sec.type === 'project') {
                  title = item.name;
                  subtitle = item.technology;
                  desc = item.description;
                } else if (sec.type === 'certification') {
                  title = item.cert;
                  subtitle = item.issuer;
                  date = item.year;
                }

                // Check if any field is filled before rendering the item
                if (!title && !subtitle && !date && !desc) return null;

                return (
                  <div key={idx} className="entry">
                    <div className="entry-header">
                      <div className="entry-title">{title}</div>
                      {date && <div className="entry-date">{date}</div>}
                    </div>
                    {subtitle && <div className="entry-sub">{subtitle}</div>}
                    {desc && <div className="entry-desc">{desc}</div>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
