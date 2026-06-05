// app/data/mockData.ts
export const mockPhdPrograms = [
  {
    title: "Fully Funded PhD in Computer Science",
    description: "AI and Machine Learning focus.",
    link: "https://example.com/phd-cs",
    country: "USA",
    university: "MIT",
    researchArea: "Artificial Intelligence",
  },
  {
    title: "PhD in Biomedical Engineering",
    description: "Medical device research.",
    link: "https://example.com/phd-bme",
    country: "Canada",
    university: "University of Toronto",
    researchArea: "Biomedical Engineering",
  },
];

export const mockLicenseInfo = {
  USA: {
    steps: [
      "Complete the program",
      "Pass the licensure exam",
      "Apply for state certification",
    ],
    notes: "Contact the state board for details.",
  },
  Canada: {
    steps: ["Graduate", "Register with the provincial authority"],
    notes: "Varies by province.",
  },
};

export const mockFeeComparison = [
  { university: "MIT", tuition: "$50,000", living: "$2,000/month" },
  { university: "Stanford", tuition: "$48,000", living: "$2,500/month" },
];

export const mockResearchAreas = [
  { id: 1, name: "Artificial Intelligence" },
  { id: 2, name: "Biomedical Engineering" },
  { id: 3, name: "Data Science" },
];

export const mockSupervisors = [
  { name: "Dr. Jane Smith", university: "MIT", profile: "AI expert" },
  { name: "Prof. John Doe", university: "University of Toronto", profile: "Biomedical researcher" },
];

export const mockProposalAssistance = {
  tips: [
    "Define a clear research question",
    "Outline methodology",
    "Include a realistic timeline",
  ],
  templateUrl: "https://example.com/proposal-template.pdf",
};

export const mockPublications = [
  { title: "Deep Learning in Medical Imaging", journal: "IEEE TMI", link: "https://doi.org/10.1109/TMI" },
  { title: "Advances in AI Ethics", journal: "AI Magazine", link: "https://example.com/ai-ethics" },
];

export const mockPhdMatching = (country: string, researchArea: string) => {
  return mockPhdPrograms.filter(
    (p) => p.country === country && p.researchArea === researchArea
  );
};
