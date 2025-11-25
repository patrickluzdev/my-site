import type { Education, Experience, SkillCategory, Testimonial } from "./types";

export const experiences: Experience[] = [
  {
    title: "Engenheiro de Software - Mercado Livre",
    company: "Mercado Livre",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE4q-iBP4fZ0g/company-logo_100_100/B4DZUUipIKG8AQ-/0/1739806380950/mercadolivre_com_logo?e=1765411200&v=beta&t=Q9JvaYxLhQN6c8HinPamXNeOJC1g8ge02gTUFQua7Mw",
    period: "out/2024 - atual",
    description:
      "Atuo na equipe de search engine, desenvolvendo pipelines de ingestão e processamento de dados para um catálogo de +300 milhões de itens. Trabalho na evolução de filtros e atributos para +100 milhões de usuários ativos em ambiente multicloud.",
  },
  {
    title: "Desenvolvedor Backend - MB Labs",
    company: "MB Labs",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHKj6jB-nedqA/company-logo_100_100/company-logo_100_100/0/1654875447501/mblabs_logo?e=1765411200&v=beta&t=nwouNfs0tePf_sfkYpaBTwywLrJZfiEuqkwZFhv5Fzo",
    period: "jul/2024 - set/2024",
    description:
      "Atuação no cliente AL5 Bank (fintech agro). Contribuí no projeto de crédito consignado, apoiando integração de sistemas e automatização de fluxos operacionais.",
  },
  {
    title: "Desenvolvedor Full Stack - Hurst Capital",
    company: "Hurst Capital",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEva4geRlZthA/company-logo_100_100/B4DZc66LWnH4AU-/0/1749040019261/hurst_capital_logo?e=1765411200&v=beta&t=m1zfU_hXn1tRv6WoFSn7YSC3M94zu7fjGvO2JC1l8dE",
    period: "nov/2022 - ago/2024",
    description:
      "Desenvolvimento na principal plataforma de investimentos alternativos da América Latina. Refatorei processos críticos e criei sistemas de administração interna para ativos judiciais, imobiliários e precatórios.",
  },
  {
    title: "Desenvolvedor Full Stack - Inter",
    company: "Inter",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFTJpEKJy3XsA/company-logo_100_100/B4DZip9S2KHwAQ-/0/1755198075652/inter_logo?e=1765411200&v=beta&t=mKILdyi35e5kYXzgI2npBPHpJ0IpTTj2E9KtUN2krTQ",
    period: "dez/2021 - nov/2022",
    description:
      "Atuei no Duo Gourmet (benefícios) e marketplace do banco. Criei rotinas de administração e migração de estabelecimentos, otimizando o backoffice em ambiente de grande escala.",
  },
  {
    title: "Desenvolvedor Full Stack - Compasso UOL",
    company: "Compasso UOL",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFd2rOF6ddv6w/company-logo_100_100/company-logo_100_100/0/1737984027931/compass_uol_logo?e=1765411200&v=beta&t=Q8RmFoDC7fs-uggMFgdpM0Ra4ks20xKAP812dzB8bIU",
    period: "set/2020 - dez/2021",
    description:
      "Alocado no Grupo Dass. Desenvolvi sistema de etiquetas, e-commerce B2B e solução para digitalizar fluxo criativo, apoiando a transição de processos manuais para digitais.",
  },
  {
    title: "Desenvolvedor Full Stack - IXCSoft",
    company: "IXCSoft",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGwyXJkBXf_zg/company-logo_100_100/B4DZkWM6REGkAU-/0/1757014107652/ixcsoft_logo?e=1765411200&v=beta&t=HncjGtSw1XyDy0CCXvs5PaqJFG7z4Nvz-U74H9CSzvg",
    period: "out/2019 - ago/2020",
    description:
      "Sistemas para gestão de provedores de internet. Implementei testes com PHPUnit e soluções interativas com mapas (Google/Bing/OpenLayers).",
  },
];

export const education: Education[] = [
  {
    institution: "Uniftec",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGJ1_sk5TpfKw/company-logo_100_100/company-logo_100_100/0/1719255934083/uniftec_logo?e=1765411200&v=beta&t=zZzCRs2h327-wLap8jI0ICOarDHlsUUGf-qhYM77aIY",
    degree: "Bacharelado, Engenharia de Computação",
    period: "ago/2025 - ago/2026",
    note: null,
  },
  {
    institution: "UFFS - Universidade Federal da Fronteira Sul",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGaREc6k9Gkxg/company-logo_100_100/company-logo_100_100/0/1651756418600/uffs___universidade_federal_da_fronteira_sul_logo?e=1765411200&v=beta&t=T9Giq36c9FfThWmpj2HfFKY3yqyuqusxaqNIhaHeD40",
    degree: "Bacharelado, Ciência da Computação",
    period: "2018 - jun/2021",
    note: "O curso não foi finalizado por motivos de mudança de estado.",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Backend",
    skills: [
      { name: "Go", icon: "logos:go" },
      { name: "Java", icon: "logos:java" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Python", icon: "logos:python" },
      { name: "PHP", icon: "logos:php" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: "logos:react" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "Vue.js", icon: "logos:vue" },
      { name: "Nuxt", icon: "logos:nuxt-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Tailwind", icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    name: "Banco de Dados",
    skills: [
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
      { name: "DynamoDB", icon: "logos:aws-dynamodb" },
      { name: "Elasticsearch", icon: "logos:elasticsearch" },
    ],
  },
  {
    name: "DevOps & Cloud",
    skills: [
      { name: "AWS", icon: "logos:aws" },
      { name: "GCP", icon: "logos:google-cloud" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Kubernetes", icon: "logos:kubernetes" },
      { name: "Terraform", icon: "logos:terraform-icon" },
      { name: "Prometheus", icon: "logos:prometheus" },
      { name: "Grafana", icon: "logos:grafana" },
      { name: "Git", icon: "logos:git-icon" },
    ],
  },
  {
    name: "Ferramentas",
    skills: [
      { name: "Figma", icon: "logos:figma" },
      { name: "n8n", icon: "simple-icons:n8n" },
      { name: "Linux", icon: "logos:linux-tux" },
      { name: "Datadog", icon: "logos:datadog" },
      { name: "Jenkins", icon: "logos:jenkins" },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ângelo Kusmann Cavalet",
    initials: "AK",
    role: "Tech Lead @ IXCSoft",
    text: "Patrick é uma pessoa carismática, a comunicação com ele acontece de forma descontraída mas também produtiva. Resolve de forma ágil e competente os problemas designados, buscando sempre as melhores soluções. Gosta de um código bem escrito e estruturado, e encara o desconhecido como oportunidade de aprender.",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQH1pjyWVjQm2A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1673991544727?e=1765411200&v=beta&t=_mi28hBz5IEvFbgEk797m0n3Jt5QjUigoRRxdskU288",
    link: "https://www.linkedin.com/in/angelocavallet",
  },
];
