import type { FAQ, Metric, ServiceCategory } from "./types";

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Desenvolvimento",
    services: [
      {
        icon: "lucide:globe",
        title: "Web",
        description:
          "Sites, sistemas e aplicações web modernas, responsivas e de alta performance.",
      },
      {
        icon: "lucide:smartphone",
        title: "Mobile",
        description:
          "Aplicativos mobile para iOS e Android com experiência nativa.",
      },
      {
        icon: "lucide:rocket",
        title: "Landing Pages",
        description:
          "Páginas de conversão otimizadas para captar leads e vender produtos.",
      },
      {
        icon: "lucide:shopping-cart",
        title: "E-commerce",
        description:
          "Lojas virtuais completas com integrações de pagamento e gestão de estoque.",
      },
      {
        icon: "lucide:lightbulb",
        title: "MVPs",
        description:
          "Protótipos e produtos mínimos viáveis para validar ideias rapidamente.",
      },
      {
        icon: "lucide:layout-dashboard",
        title: "Dashboards",
        description:
          "Painéis de métricas e analytics para visualização de dados em tempo real.",
      },
      {
        icon: "lucide:layers",
        title: "SaaS",
        description:
          "Plataformas SaaS escaláveis com modelo de assinatura e multi-tenancy.",
      },
    ],
  },
  {
    name: "Infraestrutura",
    services: [
      {
        icon: "lucide:server",
        title: "APIs",
        description:
          "APIs robustas e escaláveis. Microsserviços e integrações entre sistemas.",
      },
      {
        icon: "lucide:cloud",
        title: "DevOps",
        description:
          "Infraestrutura em nuvem, containers, pipelines de CI/CD e deploy automatizado.",
      },
      {
        icon: "lucide:bot",
        title: "Automações",
        description:
          "Bots, scripts e integrações que automatizam processos e economizam tempo.",
      },
    ],
  },
  {
    name: "Suporte & Otimização",
    services: [
      {
        icon: "lucide:wrench",
        title: "Manutenção",
        description:
          "Suporte contínuo, correção de bugs e melhorias em sistemas existentes.",
      },
      {
        icon: "lucide:refresh-cw",
        title: "Migração",
        description:
          "Atualização de sistemas legados para tecnologias modernas e performáticas.",
      },
      {
        icon: "lucide:zap",
        title: "Performance",
        description:
          "Melhorias de velocidade, SEO técnico e otimização de recursos.",
      },
    ],
  },
];

export const metricsHome: Metric[] = [
  { value: "+6", label: "Anos de exp." },
  { value: "6", label: "Empresas" },
  { value: "24h", label: "Tempo de resposta" },
  { value: "+100M", label: "Usuários" },
];

export const metricsAbout: Metric[] = [
  { value: "+6", label: "Anos de exp." },
  { value: "6", label: "Empresas" },
  { value: "24h", label: "Tempo de resposta" },
  { value: "+100M", label: "Usuários" },
];

export const faqs: FAQ[] = [
  {
    question: "Quanto custa um projeto?",
    answer:
      "O valor depende da complexidade e escopo do projeto. Após entender suas necessidades, envio uma proposta detalhada com valores e prazos.",
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
