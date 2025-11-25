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

const { metricsAbout: metrics, servicesDetailed: services } = useContent();
const { experiences, education, skillCategories, testimonials } = useProfile();
</script>
