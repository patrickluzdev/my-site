import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "4",
    title: "patrickluz.dev",
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
  },
    {
    id: "5",
    title: "Buy Me a Coffee",
    description:
      "Integração com Mercado Pago Checkout PRO. Permite selecionar a quantidade de cafés e ser redirecionado para o checkout seguro.",
    stack: ["Nuxt", "Vue", "Tailwind", "TypeScript", "Zod", "Mercado Pago"],
    status: "completed",
    year: 2025,
    type: "web",
    category: "featured",
    image: "/projects/buymeacoffee.webp",
    links: {
      github: "https://github.com/patrickluzdev/buymeacoffee",
      demo: "https://buymeacoffee.patrickluz.dev/",
    },
  },
];

export const projectTypes = [
  { label: "Web", value: "web" as const },
  { label: "Mobile", value: "mobile" as const },
  { label: "API", value: "api" as const },
  { label: "Tool", value: "tool" as const },
];
