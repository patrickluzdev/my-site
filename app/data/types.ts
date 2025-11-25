export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  stack: string[];
  status: "development" | "completed" | "archived";
  year: number;
  type: "web" | "mobile" | "api" | "tool";
  category: "featured" | "personal" | "client" | "opensource" | "experiment";
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
}

export type ProjectType = Project["type"];
export type ProjectCategory = Project["category"];
export type ProjectStatus = Project["status"];

export interface Experience {
  title: string;
  company: string;
  logo: string;
  period: string;
  description: string;
}

export interface Education {
  institution: string;
  logo: string;
  degree: string;
  period: string;
  note?: string | null;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Testimonial {
  name: string;
  initials: string;
  role: string;
  text: string;
  image?: string;
  link?: string;
}

export interface Service {
  icon: string;
  title: string;
  description?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  link: string;
}

export interface Company {
  name: string;
  logo: string;
}

export interface ContactInfo {
  whatsapp: string;
  email: string;
  phone: string;
  location: string;
  cnpj: string;
}
