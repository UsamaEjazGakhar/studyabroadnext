"use client";
import React, { useState, useEffect } from 'react';
import './resume.css';

// Define data structures for each dynamic section
interface Experience {
  company: string;
  title: string;
  duration: string;
  responsibilities: string;
}
interface Education {
  degree: string;
  institute: string;
  duration: string;
}
interface Project {
  name: string;
  technology: string;
  description: string;
}
interface Certification {
  cert: string;
  issuer: string;
  year: string;
}

// Generic helper to update an item in an array state
function updateArrayItem<T>(
  setter: React.Dispatch<React.SetStateAction<T[]>>,
  array: T[],
  index: number,
  field: keyof T,
  value: T[keyof T]
) {
  const newArr = [...array];
  newArr[index] = { ...newArr[index], [field]: value } as T;
  setter(newArr);
}

export default function ResumePage() {
  // Basic personal info states
  const [region, setRegion] = useState('USA / Canada / UK / Australia');
  const [role, setRole] = useState('Software Engineer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');

  // Dynamic sections state arrays
  const [experiences, setExperiences] = useState<Experience[]>([
    { company: '', title: '', duration: '', responsibilities: '' },
  ]);
  const [educations, setEducations] = useState<Education[]>([
    { degree: '', institute: '', duration: '' },
  ]);
  const [projects, setProjects] = useState<Project[]>([
    { name: '', technology: '', description: '' },
  ]);
  const [certifications, setCertifications] = useState<Certification[]>([
    { cert: '', issuer: '', year: '' },
  ]);

  // Add new empty items
  const addExperience = () =>
    setExperiences([...experiences, { company: '', title: '', duration: '', responsibilities: '' }]);
  const addEducation = () =>
    setEducations([...educations, { degree: '', institute: '', duration: '' }]);
  const addProject = () =>
    setProjects([...projects, { name: '', technology: '', description: '' }]);
  const addCertification = () =>
    setCertifications([...certifications, { cert: '', issuer: '', year: '' }]);

  // Delete helpers
  const removeExperience = (idx: number) =>
    setExperiences(experiences.filter((_, i) => i !== idx));
  const removeEducation = (idx: number) =>
    setEducations(educations.filter((_, i) => i !== idx));
  const removeProject = (idx: number) =>
    setProjects(projects.filter((_, i) => i !== idx));
  const removeCertification = (idx: number) =>
    setCertifications(certifications.filter((_, i) => i !== idx));

const generateResume = () => {
  // Placeholder for future resume generation logic.
};

// Print only the resume content without browser URL/header
const printResume = () => {
  const resumeElement = document.getElementById('resume');
  if (!resumeElement) return;
  const newWindow = window.open('', '_blank', 'width=800,height=600');
  if (newWindow) {
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(node => node.outerHTML)
      .join('');
    newWindow.document.write(`<!DOCTYPE html><html><head><title></title>${styles}</head><body>${resumeElement.outerHTML}</body></html>`);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  }
};

const printButton = () => window.print();

  return (
    <div className="wrapper">
      {/* ------- LEFT PANEL (Form) ------- */}
      <div className="panel">

        <label>Region</label>
        <select value={region} onChange={e => setRegion(e.target.value)} id="region">
          <option>USA / Canada / UK / Australia</option>
          <option>China</option>
          <option>Russia</option>
          <option>UAE</option>
        </select>

        <label>Target Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} id="role">
          <option>Software Engineer</option>
          <option>Business Development</option>
          <option>Marketing Manager</option>
          <option>Sales Executive</option>
          <option>Doctor</option>
          <option>Teacher</option>
          <option>Student</option>
        </select>

        <label>Full Name</label>
        <input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} />
        <label>Email</label>
        <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Phone</label>
        <input id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <label>Location</label>
        <input id="location" value={location} onChange={e => setLocation(e.target.value)} />
        <label>LinkedIn</label>
        <input id="linkedin" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
        <div id="githubContainer">
          <label>GitHub</label>
          <input id="github" value={github} onChange={e => setGithub(e.target.value)} />
        </div>
        <div id="portfolioContainer">
          <label>Portfolio</label>
          <input id="portfolio" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
        </div>
        <label>Professional Summary</label>
        <textarea id="summary" value={summary} onChange={e => setSummary(e.target.value)} />
        <label>Core Skills</label>
        <textarea id="skills" value={skills} onChange={e => setSkills(e.target.value)} />

        {/* Experience Section */}
        <h2 style={{ marginTop: '20px' }}>Experience</h2>
        {experiences.map((exp, idx) => (
          <div className="repeat-box experience-item" key={idx}>
            <input placeholder="Company" value={exp.company}
              onChange={e => updateArrayItem(setExperiences, experiences, idx, 'company', e.target.value)} />
            <input placeholder="Job Title" value={exp.title}
              onChange={e => updateArrayItem(setExperiences, experiences, idx, 'title', e.target.value)} />
            <input placeholder="Duration" value={exp.duration}
              onChange={e => updateArrayItem(setExperiences, experiences, idx, 'duration', e.target.value)} />
            <textarea placeholder="Responsibilities" value={exp.responsibilities}
              onChange={e => updateArrayItem(setExperiences, experiences, idx, 'responsibilities', e.target.value)} />
            <button className="secondary" onClick={() => removeExperience(idx)} style={{ marginTop: '4px' }}>Delete</button>
          </div>
        ))}
        <button className="primary" onClick={addExperience}>+ Add Experience</button>

        {/* Education Section */}
        <h2 style={{ marginTop: '20px' }}>Education</h2>
        {educations.map((edu, idx) => (
          <div className="repeat-box education-item" key={idx}>
            <input placeholder="Degree" value={edu.degree}
              onChange={e => updateArrayItem(setEducations, educations, idx, 'degree', e.target.value)} />
            <input placeholder="Institute" value={edu.institute}
              onChange={e => updateArrayItem(setEducations, educations, idx, 'institute', e.target.value)} />
            <input placeholder="Duration" value={edu.duration}
              onChange={e => updateArrayItem(setEducations, educations, idx, 'duration', e.target.value)} />
            <button className="secondary" onClick={() => removeEducation(idx)} style={{ marginTop: '4px' }}>Delete</button>
          </div>
        ))}
        <button className="primary" onClick={addEducation}>+ Add Education</button>

        {/* Projects Section */}
        <h2 style={{ marginTop: '20px' }}>Projects</h2>
        {projects.map((proj, idx) => (
          <div className="repeat-box project-item" key={idx}>
            <input placeholder="Project Name" value={proj.name}
              onChange={e => updateArrayItem(setProjects, projects, idx, 'name', e.target.value)} />
            <input placeholder="Technology" value={proj.technology}
              onChange={e => updateArrayItem(setProjects, projects, idx, 'technology', e.target.value)} />
            <textarea placeholder="Description" value={proj.description}
              onChange={e => updateArrayItem(setProjects, projects, idx, 'description', e.target.value)} />
            <button className="secondary" onClick={() => removeProject(idx)} style={{ marginTop: '4px' }}>Delete</button>
          </div>
        ))}
        <button className="primary" onClick={addProject}>+ Add Project</button>

        {/* Certifications Section */}
        <h2 style={{ marginTop: '20px' }}>Certifications</h2>
        {certifications.map((cert, idx) => (
          <div className="repeat-box cert-item" key={idx}>
            <input placeholder="Certification" value={cert.cert}
              onChange={e => updateArrayItem(setCertifications, certifications, idx, 'cert', e.target.value)} />
            <input placeholder="Issuer" value={cert.issuer}
              onChange={e => updateArrayItem(setCertifications, certifications, idx, 'issuer', e.target.value)} />
            <input placeholder="Year" value={cert.year}
              onChange={e => updateArrayItem(setCertifications, certifications, idx, 'year', e.target.value)} />
            <button className="secondary" onClick={() => removeCertification(idx)} style={{ marginTop: '4px' }}>Delete</button>
          </div>
        ))}
        <button className="primary" onClick={addCertification}>+ Add Certification</button>

        <label style={{ marginTop: '20px' }}>Languages</label>
        <input id="languages" value={languages} onChange={e => setLanguages(e.target.value)} />

        <button className="primary" onClick={generateResume}>Generate Resume</button>
        <button className="secondary" onClick={printResume}>Print Resume</button>
      </div>

      {/* ------- RIGHT PANEL (Resume Preview) ------- */}
      <div className="resume" id="resume">
        <div className="resume-name" id="rName">{fullName || 'YOUR NAME'}</div>
        <div className="resume-role" id="rRole">{role}</div>
        <div className="contact" id="rContact">
          {email} | {phone} | {location} | {linkedin}
        </div>
        <div className="section">
          <h3>Professional Summary</h3>
          <p id="rSummary">{summary}</p>
        </div>
        <div className="section">
          <h3>Core Skills</h3>
          <p id="rSkills">{skills}</p>
        </div>
        <div className="section">
          <h3>Professional Experience</h3>
          <div id="rExperience">
            {experiences.map((exp, idx) => (
              <div className="entry" key={idx}>
                <div className="entry-title">{exp.title}</div>
                <div className="entry-sub">{exp.company} • {exp.duration}</div>
                <div className="entry-desc">{exp.responsibilities}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <h3>Projects</h3>
          <div id="rProjects">
            {projects.map((proj, idx) => (
              <div className="entry" key={idx}>
                <div className="entry-title">{proj.name}</div>
                <div className="entry-sub">{proj.technology}</div>
                <div className="entry-desc">{proj.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <h3>Education</h3>
          <div id="rEducation">
            {educations.map((edu, idx) => (
              <div className="entry" key={idx}>
                <div className="entry-title">{edu.degree}</div>
                <div className="entry-sub">{edu.institute}</div>
                <div className="entry-desc">{edu.duration}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <h3>Certifications</h3>
          <div id="rCertifications">
            {certifications.map((cert, idx) => (
              <div className="entry" key={idx}>
                <div className="entry-title">{cert.cert}</div>
                <div className="entry-sub">{cert.issuer}</div>
                <div className="entry-desc">{cert.year}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <h3>Languages</h3>
          <p id="rLanguages">{languages}</p>
        </div>
      </div>
    </div>
  );
}
