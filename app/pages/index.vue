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
        />
        <span
          class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"
        />
      </span>
      <p class="text-sm text-green-700">
        <span class="font-medium">Disponível para novos projetos</span>
      </p>
    </div>

    <!-- Value Proposition -->
    <p class="text-stone-600 leading-relaxed mb-8 text-[15px]">
      Transformo ideias em produtos digitais. Desenvolvo aplicações web, APIs e
      automações que resolvem problemas reais e escalam junto com seu negócio.
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
      <div class="space-y-4">
        <div v-for="category in serviceCategories" :key="category.name">
          <p class="text-xs text-stone-400 uppercase tracking-wide mb-2">
            {{ category.name }}
          </p>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="service in category.services"
              :key="service.title"
              class="flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-100 bg-white"
            >
              <Icon :name="service.icon" class="w-4 h-4 text-stone-500" />
              <span class="text-sm text-stone-700">{{ service.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Companies Section -->
    <section class="mb-10">
      <p class="text-xs text-stone-400 uppercase tracking-wide mb-4">
        Empresas onde já trabalhei
      </p>
      <div class="relative overflow-hidden">
        <!-- Fade edges -->
        <div
          class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"
        />
        <div
          class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
        />

        <ClientOnly>
          <Vue3Marquee :duration="25" :pause-on-hover="true" :clone="true">
            <div
              v-for="company in companies"
              :key="company.name"
              class="group flex items-center gap-2 mx-6 text-stone-400 transition-colors cursor-default"
            >
              <img
                v-if="company.logo"
                :src="company.logo"
                :alt="company.name"
                class="w-6 h-6 rounded object-contain grayscale group-hover:grayscale-0 transition-all"
              />
              <span
                class="text-sm whitespace-nowrap group-hover:text-stone-600 transition-colors"
                >{{ company.name }}</span
              >
            </div>
          </Vue3Marquee>
          <template #fallback>
            <div class="flex items-center gap-6 overflow-hidden">
              <div
                v-for="company in companies"
                :key="company.name"
                class="flex items-center gap-2 text-stone-400"
              >
                <img
                  v-if="company.logo"
                  :src="company.logo"
                  :alt="company.name"
                  class="w-6 h-6 rounded object-contain grayscale"
                />
                <span class="text-sm whitespace-nowrap">{{
                  company.name
                }}</span>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <div class="h-px bg-stone-100 my-10" />

    <!-- Recent Work Section -->
    <section v-if="featuredProjects.length > 0" class="mb-10">
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
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
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
import { projects } from "~/data";

definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "Patrick Luz - Engenheiro de Software",
  description:
    "Desenvolvedor Full Stack especializado em aplicações web, APIs e automações. +5 anos de experiência em empresas como Mercado Livre, Inter e Hurst Capital.",
  ogTitle: "Patrick Luz - Engenheiro de Software",
  ogDescription:
    "Desenvolvedor Full Stack especializado em aplicações web, APIs e automações.",
  ogType: "website",
  twitterCard: "summary_large_image",
});

const { metricsHome: metrics, serviceCategories } = useContent();
const { companies } = useContact();
const featuredProjects = computed(() =>
  projects.filter((p) => p.category === "featured")
);
</script>
