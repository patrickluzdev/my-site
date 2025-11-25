<template>
  <div>
    <!-- Header Section -->
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-stone-900 mb-1">Quem sou eu</h1>
      <p class="text-stone-500 italic text-[15px]">
        Engenheiro de Software focado em soluções escaláveis
      </p>
    </header>

    <!-- Availability Status -->
    <div
      class="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-100 mb-8"
    >
      <span class="relative flex h-2.5 w-2.5">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"
        ></span>
      </span>
      <p class="text-sm text-green-700">
        <span class="font-medium">Disponível para novos projetos</span>
      </p>
    </div>

    <!-- About Text -->
    <div class="mb-10">
      <p class="text-stone-600 leading-relaxed mb-4 text-[15px]">
        Sou Patrick Luz, engenheiro de software com +5 anos de experiência em
        empresas como Mercado Livre, Inter e Hurst Capital. Transformo ideias
        em produtos digitais escaláveis e de alta qualidade.
      </p>
      <p class="text-stone-600 leading-relaxed text-[15px]">
        Trabalho com todo o ciclo de desenvolvimento — do planejamento à
        entrega. Se você precisa de um parceiro técnico para seu projeto,
        <NuxtLink
          to="/contato"
          class="text-stone-800 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-500"
          >vamos conversar</NuxtLink
        >.
      </p>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="py-4 px-4 rounded-xl border border-stone-100 bg-stone-50/50 text-center"
      >
        <p class="text-xl font-semibold text-stone-800">{{ metric.value }}</p>
        <p class="text-xs text-stone-500 mt-0.5">{{ metric.label }}</p>
      </div>
    </div>

    <!-- Services Section -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">O que eu faço</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="service in services"
          :key="service.title"
          class="p-4 rounded-xl border border-stone-100 bg-white"
        >
          <div
            class="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center mb-3"
          >
            <Icon :name="service.icon" class="w-4 h-4 text-stone-600" />
          </div>
          <h3 class="font-medium text-stone-800 text-[15px] mb-1">
            {{ service.title }}
          </h3>
          <p class="text-sm text-stone-500 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">
        Minhas habilidades
      </h2>
      <div class="space-y-4">
        <div v-for="category in skillCategories" :key="category.name">
          <p class="text-xs text-stone-400 uppercase tracking-wide mb-2">
            {{ category.name }}
          </p>
          <TooltipProvider>
            <div class="flex flex-wrap gap-2">
              <Tooltip v-for="skill in category.skills" :key="skill.name">
                <TooltipTrigger as-child>
                  <div
                    class="w-10 h-10 rounded-lg border border-stone-100 bg-stone-50/50 flex items-center justify-center hover:border-stone-200 transition-colors cursor-default"
                  >
                    <Icon :name="skill.icon" class="w-5 h-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {{ skill.name }}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>

    <div class="h-px bg-stone-100 my-10" />

    <!-- Experience Section -->
    <section>
      <h2 class="text-lg font-semibold text-stone-900 mb-3">Experiências</h2>
      <p class="text-stone-500 text-[15px] mb-6">
        Empresas onde contribuí com meu trabalho.
      </p>

      <div class="space-y-6">
        <div v-for="exp in experiences" :key="exp.title" class="flex gap-4">
          <div
            class="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
          >
            <img
              v-if="exp.logo && !exp.logoError"
              :src="exp.logo"
              :alt="exp.company"
              class="w-full h-full object-contain"
              @error="exp.logoError = true"
            />
            <div
              v-else
              class="w-full h-full bg-stone-100 flex items-center justify-center"
            >
              <Icon name="lucide:building-2" class="w-5 h-5 text-stone-400" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-stone-800 text-[15px]">
              {{ exp.title }}
            </h3>
            <p class="text-xs text-stone-400 mb-2">{{ exp.period }}</p>
            <p class="text-stone-600 text-sm leading-relaxed">
              {{ exp.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px bg-stone-100 my-10" />

    <!-- Testimonials Section -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">
        O que dizem sobre mim
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="p-5 rounded-xl border border-stone-100 bg-white"
        >
          <p class="text-sm text-stone-600 leading-relaxed mb-4 italic">
            "{{ testimonial.text }}"
          </p>
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center"
            >
              <span class="text-sm font-medium text-stone-600">{{
                testimonial.initials
              }}</span>
            </div>
            <div>
              <p class="text-sm font-medium text-stone-800">
                {{ testimonial.name }}
              </p>
              <p class="text-xs text-stone-400">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section>
      <h2 class="text-lg font-semibold text-stone-900 mb-3">
        Formação acadêmica
      </h2>
      <p class="text-stone-500 text-[15px] mb-6">Minha trajetória educacional.</p>

      <div class="space-y-6">
        <div v-for="edu in education" :key="edu.institution" class="flex gap-4">
          <div
            class="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
          >
            <img
              v-if="edu.logo && !edu.logoError"
              :src="edu.logo"
              :alt="edu.institution"
              class="w-full h-full object-contain"
              @error="edu.logoError = true"
            />
            <div
              v-else
              class="w-full h-full bg-stone-100 flex items-center justify-center"
            >
              <Icon
                name="lucide:graduation-cap"
                class="w-5 h-5 text-stone-400"
              />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-stone-800 text-[15px]">
              {{ edu.institution }}
            </h3>
            <p class="text-sm text-stone-600">{{ edu.degree }}</p>
            <p class="text-xs text-stone-400 mb-1">{{ edu.period }}</p>
            <p v-if="edu.note" class="text-stone-500 text-xs italic">
              {{ edu.note }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px bg-stone-100 my-10" />

    <!-- CTA Section -->
    <section
      class="p-6 rounded-xl border-2 border-dashed border-stone-200 text-center"
    >
      <h2 class="text-lg font-semibold text-stone-900 mb-2">
        Vamos trabalhar juntos?
      </h2>
      <p class="text-sm text-stone-500 mb-4 max-w-md mx-auto">
        Estou disponível para projetos freelance, consultoria ou parcerias.
        Conte-me sobre sua ideia.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          to="/contato"
          class="px-5 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-900 transition-colors"
        >
          Entrar em contato
        </NuxtLink>
        <a
          href="/cv-patrick-luz.pdf"
          download
          class="px-5 py-2.5 border border-stone-200 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-2"
        >
          <Icon name="lucide:download" class="w-4 h-4" />
          Download CV
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

definePageMeta({
  layout: "default",
});

// SEO
useSeoMeta({
  title: "Sobre mim - Patrick Luz",
  description:
    "Engenheiro de Software com +5 anos de experiência. Especialista em desenvolvimento web, APIs, automações e DevOps. Disponível para novos projetos.",
  ogTitle: "Sobre mim - Patrick Luz",
  ogDescription:
    "Engenheiro de Software com +5 anos de experiência em empresas como Mercado Livre, Inter e Hurst Capital.",
  ogType: "profile",
  twitterCard: "summary_large_image",
});

// Metrics
const metrics = [
  { value: "+5", label: "Anos de experiência" },
  { value: "6", label: "Empresas" },
  { value: "+300M", label: "Itens processados" },
  { value: "+100M", label: "Usuários impactados" },
];

// Services
const services = [
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

// Skills by category
const skillCategories = [
  {
    name: "Backend",
    skills: [
      { name: "Go", icon: "logos:go" },
      { name: "Java", icon: "logos:java" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "PHP", icon: "logos:php" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: "logos:react" },
      { name: "Vue.js", icon: "logos:vue" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS3", icon: "logos:css-3" },
      { name: "Sass", icon: "logos:sass" },
    ],
  },
  {
    name: "Banco de Dados",
    skills: [
      { name: "PostgreSQL", icon: "logos:postgresql" },
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
      { name: "Jenkins", icon: "logos:jenkins" },
      { name: "Grafana", icon: "logos:grafana" },
      { name: "Datadog", icon: "logos:datadog" },
      { name: "Git", icon: "logos:git-icon" },
      { name: "Linux", icon: "logos:linux-tux" },
    ],
  },
];

// Testimonials
const testimonials = [
  {
    name: "João Silva",
    initials: "JS",
    role: "Tech Lead @ Hurst Capital",
    text: "Patrick é um desenvolvedor excepcional. Entrega código de alta qualidade e sempre busca as melhores soluções para os problemas.",
  },
  {
    name: "Maria Santos",
    initials: "MS",
    role: "Product Manager @ Inter",
    text: "Trabalhar com o Patrick foi ótimo. Muito proativo, entende o negócio e traduz requisitos em soluções técnicas eficientes.",
  },
];

// Experiences
const experiences = reactive([
  {
    title: "Engenheiro de Software - Mercado Livre",
    company: "Mercado Livre",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE4q-iBP4fZ0g/company-logo_100_100/B4DZUUipIKG8AQ-/0/1739806380950/mercadolivre_com_logo?e=1765411200&v=beta&t=Q9JvaYxLhQN6c8HinPamXNeOJC1g8ge02gTUFQua7Mw",
    period: "out/2024 - atual",
    description:
      "Atuo na equipe de search engine, desenvolvendo pipelines de ingestão e processamento de dados para um catálogo de +300 milhões de itens. Trabalho na evolução de filtros e atributos para +100 milhões de usuários ativos em ambiente multicloud.",
    logoError: false,
  },
  {
    title: "Desenvolvedor Backend - MB Labs",
    company: "MB Labs",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHKj6jB-nedqA/company-logo_100_100/company-logo_100_100/0/1654875447501/mblabs_logo?e=1765411200&v=beta&t=nwouNfs0tePf_sfkYpaBTwywLrJZfiEuqkwZFhv5Fzo",
    period: "jul/2024 - set/2024",
    description:
      "Atuação no cliente AL5 Bank (fintech agro). Contribuí no projeto de crédito consignado, apoiando integração de sistemas e automatização de fluxos operacionais.",
    logoError: false,
  },
  {
    title: "Desenvolvedor Full Stack - Hurst Capital",
    company: "Hurst Capital",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEva4geRlZthA/company-logo_100_100/B4DZc66LWnH4AU-/0/1749040019261/hurst_capital_logo?e=1765411200&v=beta&t=m1zfU_hXn1tRv6WoFSn7YSC3M94zu7fjGvO2JC1l8dE",
    period: "nov/2022 - ago/2024",
    description:
      "Desenvolvimento na principal plataforma de investimentos alternativos da América Latina. Refatorei processos críticos e criei sistemas de administração interna para ativos judiciais, imobiliários e precatórios.",
    logoError: false,
  },
  {
    title: "Desenvolvedor Full Stack - Inter",
    company: "Inter",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFTJpEKJy3XsA/company-logo_100_100/B4DZip9S2KHwAQ-/0/1755198075652/inter_logo?e=1765411200&v=beta&t=mKILdyi35e5kYXzgI2npBPHpJ0IpTTj2E9KtUN2krTQ",
    period: "dez/2021 - nov/2022",
    description:
      "Atuei no Duo Gourmet (benefícios) e marketplace do banco. Criei rotinas de administração e migração de estabelecimentos, otimizando o backoffice em ambiente de grande escala.",
    logoError: false,
  },
  {
    title: "Desenvolvedor Full Stack - Compasso UOL",
    company: "Compasso UOL",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFd2rOF6ddv6w/company-logo_100_100/company-logo_100_100/0/1737984027931/compass_uol_logo?e=1765411200&v=beta&t=Q8RmFoDC7fs-uggMFgdpM0Ra4ks20xKAP812dzB8bIU",
    period: "set/2020 - dez/2021",
    description:
      "Alocado no Grupo Dass. Desenvolvi sistema de etiquetas, e-commerce B2B e solução para digitalizar fluxo criativo, apoiando a transição de processos manuais para digitais.",
    logoError: false,
  },
  {
    title: "Desenvolvedor Full Stack - IXCSoft",
    company: "IXCSoft",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGwyXJkBXf_zg/company-logo_100_100/B4DZkWM6REGkAU-/0/1757014107652/ixcsoft_logo?e=1765411200&v=beta&t=HncjGtSw1XyDy0CCXvs5PaqJFG7z4Nvz-U74H9CSzvg",
    period: "out/2019 - ago/2020",
    description:
      "Sistemas para gestão de provedores de internet. Implementei testes com PHPUnit e soluções interativas com mapas (Google/Bing/OpenLayers).",
    logoError: false,
  },
]);

// Education
const education = reactive([
  {
    institution: "Uniftec",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGJ1_sk5TpfKw/company-logo_100_100/company-logo_100_100/0/1719255934083/uniftec_logo?e=1765411200&v=beta&t=zZzCRs2h327-wLap8jI0ICOarDHlsUUGf-qhYM77aIY",
    degree: "Bacharelado, Engenharia de Computação",
    period: "ago/2025 - ago/2026",
    note: null,
    logoError: false,
  },
  {
    institution: "UFFS - Universidade Federal da Fronteira Sul",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGaREc6k9Gkxg/company-logo_100_100/company-logo_100_100/0/1651756418600/uffs___universidade_federal_da_fronteira_sul_logo?e=1765411200&v=beta&t=T9Giq36c9FfThWmpj2HfFKY3yqyuqusxaqNIhaHeD40",
    degree: "Bacharelado, Ciência da Computação",
    period: "2018 - jun/2021",
    note: "O curso não foi finalizado por motivos de mudança de estado.",
    logoError: false,
  },
]);
</script>
