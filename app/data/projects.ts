import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Sistema de Gestão",
    description:
      "Sistema completo para gestão empresarial com dashboard, relatórios e controle de estoque.",
    image: "/projects/gestao.png",
    stack: ["Vue.js", "Node.js", "PostgreSQL"],
    status: "completed",
    year: 2024,
    type: "web",
    category: "featured",
    links: {
      demo: "https://exemplo.com",
      github: "https://github.com/plfrancisco/gestao",
    },
  },
  {
    id: "2",
    title: "E-commerce Platform",
    description:
      "Loja virtual completa com carrinho, pagamentos Stripe e painel administrativo.",
    image: "/projects/ecommerce.png",
    stack: ["React", "Go", "PostgreSQL", "Stripe"],
    status: "completed",
    year: 2024,
    type: "web",
    category: "featured",
    links: {
      demo: "https://exemplo.com",
    },
  },
  {
    id: "3",
    title: "Boilerplate Nuxt",
    description:
      "Template Nuxt 3 com Tailwind, shadcn/ui, autenticação e estrutura pronta para produção.",
    stack: ["Nuxt", "Tailwind", "TypeScript"],
    status: "completed",
    year: 2024,
    type: "tool",
    category: "personal",
    links: {
      github: "https://github.com/plfrancisco/nuxt-boilerplate",
    },
  },
  {
    id: "4",
    title: "Patrick.dev",
    description: "Meu site pessoal. O que você está vendo agora.",
    stack: ["Nuxt", "Tailwind", "Supabase"],
    status: "development",
    year: 2024,
    type: "web",
    category: "personal",
    links: {
      github: "https://github.com/plfrancisco/my-site-vue",
    },
  },
  {
    id: "5",
    title: "Vue Component Library",
    description:
      "Biblioteca de componentes Vue 3 com acessibilidade e customização via CSS variables.",
    stack: ["Vue.js", "TypeScript", "Vite"],
    status: "development",
    year: 2024,
    type: "tool",
    category: "opensource",
    links: {
      github: "https://github.com/plfrancisco/vue-components",
      demo: "https://components.patrick.dev",
    },
  },
  {
    id: "6",
    title: "App de Delivery",
    description:
      "Aplicativo para delivery de comida com rastreamento em tempo real e notificações push.",
    image: "/projects/delivery.png",
    stack: ["React Native", "Node.js", "Firebase"],
    status: "completed",
    year: 2023,
    type: "mobile",
    category: "client",
    links: {},
  },
  {
    id: "7",
    title: "API de Pagamentos",
    description:
      "Microserviço de processamento de pagamentos com integração multi-gateway.",
    stack: ["Go", "gRPC", "Redis", "PostgreSQL"],
    status: "completed",
    year: 2023,
    type: "api",
    category: "client",
    links: {},
  },
  {
    id: "8",
    title: "CLI Task Manager",
    description:
      "Gerenciador de tarefas via terminal com sync para múltiplos dispositivos.",
    stack: ["Go", "SQLite", "Bubble Tea"],
    status: "development",
    year: 2024,
    type: "tool",
    category: "experiment",
    links: {
      github: "https://github.com/plfrancisco/task-cli",
    },
  },
];

export const projectTypes = [
  { label: "Web", value: "web" as const },
  { label: "Mobile", value: "mobile" as const },
  { label: "API", value: "api" as const },
  { label: "Tool", value: "tool" as const },
];
