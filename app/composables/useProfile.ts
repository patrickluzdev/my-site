import {
  education as educationData,
  experiences as experiencesData,
  skillCategories,
  testimonials,
} from "~/data";

interface ExperienceWithError {
  title: string;
  company: string;
  logo: string;
  period: string;
  description: string;
  logoError: boolean;
}

interface EducationWithError {
  institution: string;
  logo: string;
  degree: string;
  period: string;
  note?: string | null;
  logoError: boolean;
}

export const useProfile = () => {
  const experiences = reactive<ExperienceWithError[]>(
    experiencesData.map((exp) => ({
      ...exp,
      logoError: false,
    }))
  );

  const education = reactive<EducationWithError[]>(
    educationData.map((edu) => ({
      ...edu,
      logoError: false,
    }))
  );

  return {
    experiences,
    education,
    skillCategories,
    testimonials,
  };
};
