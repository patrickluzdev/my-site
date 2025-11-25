import {
  education as educationData,
  experiences as experiencesData,
  skillCategories,
  testimonials,
} from "~/data";

const monthMap: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
};

function parsePeriod(period: string): { start: Date; end: Date } {
  const parts = period.split(" - ");
  const startStr = parts[0] ?? "";
  const endStr = parts[1] ?? "";

  const startParts = startStr.split("/");
  const startMonth = startParts[0] ?? "";
  const startYear = startParts[1] ?? "";
  const start = new Date(parseInt(startYear), monthMap[startMonth] ?? 0);

  let end: Date;
  if (endStr === "atual") {
    end = new Date();
  } else {
    const endParts = endStr.split("/");
    const endMonth = endParts[0] ?? "";
    const endYear = endParts[1] ?? "";
    end = new Date(parseInt(endYear), monthMap[endMonth] ?? 0);
  }

  return { start, end };
}

function calculateDuration(period: string): string {
  const { start, end } = parsePeriod(period);

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  months += 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
  } else if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "ano" : "anos"}`;
  } else {
    return `${years} ${years === 1 ? "ano" : "anos"} e ${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
  }
}

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
    calculateDuration,
  };
};
