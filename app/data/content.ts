import type { FAQ, Metric, Service } from "./types";

export const servicesSimple: Service[] = [
  { icon: "lucide:globe", title: "Web" },
  { icon: "lucide:server", title: "APIs" },
  { icon: "lucide:bot", title: "Automações" },
  { icon: "lucide:cloud", title: "DevOps" },
];

export const servicesDetailed: Service[] = [
  {
    icon: "lucide:globe",
    title: "Desenvolvimento Web",
    description:
      "Sites, sistemas e aplicações web modernas com React, Vue.js e Node.js.",
  },
  {
    icon: "lucide:server",
    title: "Backend & APIs",
    description:
      "APIs robustas e escaláveis com Go, Java ou Node.js. Microsserviços e integrações.",
  },
  {
    icon: "lucide:bot",
    title: "Automações",
    description:
      "Bots, scripts e integrações que automatizam processos e economizam tempo.",
  },
  {
    icon: "lucide:cloud",
    title: "DevOps & Cloud",
    description:
      "Infraestrutura na AWS/GCP, containers com Docker/Kubernetes, CI/CD.",
  },
];

export const metricsHome: Metric[] = [
  { value: "+5", label: "Anos de exp." },
  { value: "6", label: "Empresas" },
  { value: "24h", label: "Tempo de resposta" },
  { value: "+100M", label: "Usuários" },
];

export const metricsAbout: Metric[] = [
  { value: "+5", label: "Anos de exp." },
  { value: "6", label: "Empresas" },
  { value: "24h", label: "Tempo de resposta" },
  { value: "+100M", label: "Usuários" },
];

export const faqs: FAQ[] = [
  {
    question: "Quanto custa um projeto?",
    answer:
      "O valor depende da complexidade e escopo do projeto. Após entender suas necessidades, envio uma proposta detalhada com valores e prazos. Projetos simples começam a partir de R$ 3.000.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "Varia conforme o projeto. Um site institucional leva de 2 a 4 semanas. Aplicações mais complexas podem levar de 1 a 3 meses. Sempre defino prazos realistas na proposta.",
  },
  {
    question: "Você trabalha com contrato?",
    answer:
      "Sim, todos os projetos são formalizados com contrato. Isso garante segurança para ambas as partes, com escopo, prazos e valores bem definidos.",
  },
  {
    question: "Oferece suporte após a entrega?",
    answer:
      "Sim, ofereço 30 dias de suporte gratuito após a entrega para correções e pequenos ajustes. Também disponibilizo planos de manutenção mensal.",
  },
];
