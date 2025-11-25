import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "4",
    title: "Patrick.dev",
    description: "Meu site pessoal. O que você está vendo agora.",
    stack: ["Nuxt", "Tailwind", "TypeScript"],
    status: "development",
    year: 2025,
    type: "web",
    category: "featured",
    image: "/projects/my-site.webp",
    links: {
      github: "https://github.com/patrickluzdev/my-site",
      demo: "https://patrickluz.dev/"
    },
  }
];

export const projectTypes = [
  { label: "Web", value: "web" as const },
  { label: "Mobile", value: "mobile" as const },
  { label: "API", value: "api" as const },
  { label: "Tool", value: "tool" as const },
];
