// app/types/index.ts
export interface University {
  id: number;
  name: string;
  ranking: number | null;
  tuitionFees: string | null;
  programs: string | null;
  intakeDates: string | null;
  country: { name: string };
}

export interface Event {
  id: number;
  title: string;
  type: string;
  date: string; // ISO string
  description?: string;
  link?: string;
}

export interface Resource {
  id: number;
  title: string;
  type: string;
  fileUrl: string;
  description?: string;
}

// Additional interfaces for new features
export interface UniversityDetail {
  id: number;
  name: string;
  intakeDates: string;
  facilities: string[];
  eligibility: string;
  description: string;
  imageUrl: string;
}

export interface GrowthSection {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}
