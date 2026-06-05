// File: data/mockData.ts
export const mockLicenseInfo = [
  {
    country: "USA",
    steps: [
      "Complete undergraduate degree",
      "Pass USMLE Step 1 & 2",
      "Apply for ECFMG certification",
      "Match through NRMP",
      "Obtain state medical license"
    ]
  },
  {
    country: "UK",
    steps: [
      "Complete MBBS or equivalent",
      "Pass PLAB 1 & 2",
      "Register with GMC",
      "Complete Foundation Programme",
      "Enter specialty training"
    ]
  },
  {
    country: "Canada",
    steps: [
      "Complete MD program",
      "Pass MCCQE Part I & II",
      "Obtain provincial license",
      "Complete residency"
    ]
  }
];

export const mockPhdPrograms = [
  { title: "Computer Science PhD", description: "AI and ML focus", link: "https://university.example.com/phd-cs" },
  { title: "Biomedical Engineering PhD", description: "Medical device research", link: "https://university.example.com/phd-be" }
];

export const mockFeeComparison = [
  { university: "University A", tuition: "$20,000", living: "$800/month" },
  { university: "University B", tuition: "$18,500", living: "$750/month" }
];

export const mockResearchAreas = [
  { id: 1, name: "Artificial Intelligence" },
  { id: 2, name: "Renewable Energy" },
  { id: 3, name: "Public Health" }
];

export const mockSupervisors = [
  { id: 1, name: "Dr. Alice Smith", university: "University A", profile: "Expert in AI" },
  { id: 2, name: "Prof. Bob Johnson", university: "University B", profile: "Renewable Energy specialist" }
];

export const mockProposalAssistance = {
  tips: "Define clear objectives, review literature, outline methodology, include timeline and budget."
};

export const mockPublications = [
  { title: "Deep Learning in Medicine", journal: "Journal of AI Medicine", year: 2023 },
  { title: "Renewable Energy Systems", journal: "Energy Journal", year: 2022 }
];

export const mockPhdMatching = (country: string, areaId: number) => {
  // simple mock filter
  return mockPhdPrograms.filter(p => p.title.includes("PhD"));
};
