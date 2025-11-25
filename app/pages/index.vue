<template>
  <div>
    <!-- Header Section -->
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-stone-900 mb-1">Patrick Luz</h1>
      <p class="text-stone-500 italic text-[15px]">
        Engenheiro de Software @ Mercado Livre
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

    <!-- Value Proposition -->
    <p class="text-stone-600 leading-relaxed mb-8 text-[15px]">
      Transformo ideias em produtos digitais. Desenvolvo aplicações web,
      APIs e automações que resolvem problemas reais e escalam junto com seu
      negócio.
    </p>

    <!-- CTA Buttons -->
    <div class="flex flex-wrap gap-3 mb-10">
      <NuxtLink
        to="/contato"
        class="px-5 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-900 transition-colors"
      >
        Fale comigo
      </NuxtLink>
      <NuxtLink
        to="/projetos"
        class="px-5 py-2.5 border border-stone-200 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors"
      >
        Ver projetos
      </NuxtLink>
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

    <div class="h-px bg-stone-100 my-10" />

    <!-- Services Section -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">O que eu faço</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="service in services"
          :key="service.title"
          class="p-4 rounded-xl border border-stone-100 bg-white text-center"
        >
          <div
            class="w-10 h-10 mx-auto rounded-lg bg-stone-100 flex items-center justify-center mb-3"
          >
            <Icon :name="service.icon" class="w-5 h-5 text-stone-600" />
          </div>
          <h3 class="font-medium text-stone-800 text-sm">
            {{ service.title }}
          </h3>
        </div>
      </div>
    </section>

    <!-- Companies Section -->
    <section class="mb-10">
      <p class="text-xs text-stone-400 uppercase tracking-wide mb-4">
        Empresas onde já trabalhei
      </p>
      <div class="flex flex-wrap items-center gap-6">
        <div
          v-for="company in companies"
          :key="company.name"
          class="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <img
            v-if="company.logo && !company.logoError"
            :src="company.logo"
            :alt="company.name"
            class="w-6 h-6 rounded object-contain grayscale hover:grayscale-0 transition-all"
            @error="company.logoError = true"
          />
          <div
            v-else
            class="w-6 h-6 rounded bg-stone-100 flex items-center justify-center"
          >
            <Icon name="lucide:building-2" class="w-3 h-3 text-stone-400" />
          </div>
          <span class="text-sm">{{ company.name }}</span>
        </div>
      </div>
    </section>

    <div class="h-px bg-stone-100 my-10" />

    <!-- Recent Work Section -->
    <section class="mb-10">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-stone-900">
          Projetos em destaque
        </h2>
        <NuxtLink
          to="/projetos"
          class="text-sm text-stone-500 hover:text-stone-700 transition-colors"
        >
          Ver todos
        </NuxtLink>
      </div>

      <!-- Project Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="project in featuredProjects"
          :key="project.id"
          class="p-5 rounded-xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all bg-white"
        >
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-medium text-stone-800 text-[15px]">
              {{ project.title }}
            </h3>
            <span
              class="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600"
            >
              Concluído
            </span>
          </div>
          <p class="text-sm text-stone-500 mb-4 leading-relaxed">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="tech in project.stack"
              :key="tech"
              class="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600"
            >
              {{ tech }}
            </span>
          </div>
          <NuxtLink
            to="/projetos"
            class="text-sm text-stone-600 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-500 hover:text-stone-800"
          >
            Ver detalhes
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="p-6 rounded-xl border-2 border-dashed border-stone-200 text-center"
    >
      <h2 class="text-lg font-semibold text-stone-900 mb-2">
        Tem um projeto em mente?
      </h2>
      <p class="text-sm text-stone-500 mb-4 max-w-md mx-auto">
        Conte-me sobre sua ideia. Respondo em até 24h.
      </p>
      <NuxtLink
        to="/contato"
        class="inline-flex px-5 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-900 transition-colors"
      >
        Entrar em contato
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

// Metrics
const metrics = [
  { value: "+5", label: "Anos de exp." },
  { value: "6", label: "Empresas" },
  { value: "+300M", label: "Itens processados" },
  { value: "+100M", label: "Usuários" },
];

// Services
const services = [
  { icon: "lucide:globe", title: "Web" },
  { icon: "lucide:server", title: "APIs" },
  { icon: "lucide:bot", title: "Automações" },
  { icon: "lucide:cloud", title: "DevOps" },
];

// Companies
const companies = reactive([
  {
    name: "Mercado Livre",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE4q-iBP4fZ0g/company-logo_100_100/B4DZUUipIKG8AQ-/0/1739806380950/mercadolivre_com_logo?e=1765411200&v=beta&t=Q9JvaYxLhQN6c8HinPamXNeOJC1g8ge02gTUFQua7Mw",
    logoError: false,
  },
  {
    name: "Inter",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFTJpEKJy3XsA/company-logo_100_100/B4DZip9S2KHwAQ-/0/1755198075652/inter_logo?e=1765411200&v=beta&t=mKILdyi35e5kYXzgI2npBPHpJ0IpTTj2E9KtUN2krTQ",
    logoError: false,
  },
  {
    name: "Hurst Capital",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEva4geRlZthA/company-logo_100_100/B4DZc66LWnH4AU-/0/1749040019261/hurst_capital_logo?e=1765411200&v=beta&t=m1zfU_hXn1tRv6WoFSn7YSC3M94zu7fjGvO2JC1l8dE",
    logoError: false,
  },
  {
    name: "Compasso UOL",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQFd2rOF6ddv6w/company-logo_100_100/company-logo_100_100/0/1737984027931/compass_uol_logo?e=1765411200&v=beta&t=Q8RmFoDC7fs-uggMFgdpM0Ra4ks20xKAP812dzB8bIU",
    logoError: false,
  },
]);

// Featured Projects
const featuredProjects = [
  {
    id: "1",
    title: "Sistema de Gestão",
    description:
      "Sistema completo para gestão empresarial com dashboard, relatórios e controle de estoque.",
    stack: ["Vue.js", "Node.js", "PostgreSQL"],
  },
  {
    id: "2",
    title: "E-commerce Platform",
    description:
      "Loja virtual completa com carrinho, pagamentos Stripe e painel administrativo.",
    stack: ["React", "Go", "PostgreSQL"],
  },
];
</script>
