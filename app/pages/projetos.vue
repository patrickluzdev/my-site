<template>
  <div>
    <!-- Header Section -->
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-stone-900 mb-1">Meus projetos</h1>
      <p class="text-stone-500 italic text-[15px]">
        Gosto de construir projetos incríveis
      </p>
    </header>

    <!-- Description -->
    <p class="text-stone-600 leading-relaxed mb-8 text-[15px]">
      Esta é uma visão geral dos projetos em que trabalhei. Filtre por
      tecnologia ou tipo para encontrar o que procura.
    </p>

    <!-- Filters -->
    <div class="mb-10 space-y-4">
      <!-- Search -->
      <div class="relative">
        <Icon
          name="lucide:search"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar projetos..."
          class="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors"
        />
      </div>

      <!-- Filter Tags -->
      <div class="flex flex-wrap gap-2">
        <!-- Type Filters -->
        <button
          v-for="type in availableTypes"
          :key="type.value"
          class="px-3 py-1 text-xs rounded-full border transition-colors"
          :class="
            selectedTypes.includes(type.value)
              ? 'bg-stone-800 text-white border-stone-800'
              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
          "
          @click="toggleTypeFilter(type.value)"
        >
          {{ type.label }}
        </button>

        <span class="w-px h-5 bg-stone-200 self-center mx-1" />

        <!-- Tech Filters -->
        <button
          v-for="tech in availableTechs"
          :key="tech"
          class="px-3 py-1 text-xs rounded-full border transition-colors"
          :class="
            selectedTechs.includes(tech)
              ? 'bg-stone-800 text-white border-stone-800'
              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
          "
          @click="toggleTechFilter(tech)"
        >
          {{ tech }}
        </button>

        <!-- Clear Filters -->
        <button
          v-if="hasActiveFilters"
          class="px-3 py-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
          @click="clearFilters"
        >
          Limpar filtros
        </button>
      </div>
    </div>

    <!-- Featured Section -->
    <section v-if="filteredFeatured.length > 0" class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">Destaques</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          v-for="project in filteredFeatured"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- Hire Me Card -->
    <div class="p-5 rounded-xl border-2 border-dashed border-stone-200 mb-10">
      <h3 class="font-medium text-stone-500 mb-2 text-[15px]">
        Seu projeto aqui?
      </h3>
      <p class="text-sm text-stone-400 mb-4 leading-relaxed">
        Precisa de um desenvolvedor? Estou aberto a trabalhar em novos projetos.
      </p>
      <NuxtLink
        to="/contato"
        class="text-sm text-stone-600 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-500 hover:text-stone-800"
      >
        Vamos conversar
      </NuxtLink>
    </div>

    <!-- Personal Projects Section -->
    <section v-if="filteredPersonal.length > 0" class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">
        Projetos pessoais
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          v-for="project in filteredPersonal"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- Open Source Section -->
    <section v-if="filteredOpenSource.length > 0" class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">Open Source</h2>
      <p class="text-stone-500 text-[15px] mb-4">
        Contribuições e projetos de código aberto.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          v-for="project in filteredOpenSource"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <div
      v-if="filteredClient.length > 0 || filteredExperiments.length > 0"
      class="h-px bg-stone-100 my-10"
    />

    <!-- Client Projects Section -->
    <section v-if="filteredClient.length > 0" class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">Freelance</h2>
      <p class="text-stone-500 text-[15px] mb-4">
        Projetos desenvolvidos para clientes.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          v-for="project in filteredClient"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- Experiments Section -->
    <section v-if="filteredExperiments.length > 0">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">Experimentos</h2>
      <p class="text-stone-500 text-[15px] mb-4">
        Protótipos e ideias em desenvolvimento.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          v-for="project in filteredExperiments"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- Empty State -->
    <div
      v-if="allFilteredProjects.length === 0"
      class="text-center py-16 text-stone-400"
    >
      <Icon name="lucide:search-x" class="w-10 h-10 mx-auto mb-3 opacity-50" />
      <p class="text-sm">Nenhum projeto encontrado com esses filtros.</p>
      <button
        class="mt-2 text-sm text-stone-600 underline underline-offset-2"
        @click="clearFilters"
      >
        Limpar filtros
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "Projetos - Patrick Luz",
  description:
    "Portfólio de projetos desenvolvidos: sistemas web, APIs, automações e mais. Veja exemplos de trabalhos em Vue.js, React, Go, Node.js e outras tecnologias.",
});

defineOgImage({
  component: "OgImageTemplate",
  props: {
    title: "Meus Projetos",
    description: "Portfólio de projetos: sistemas web, APIs, automações e mais.",
  },
});

const {
  availableTypes,
  availableTechs,
  searchQuery,
  selectedTypes,
  selectedTechs,
  hasActiveFilters,
  toggleTypeFilter,
  toggleTechFilter,
  clearFilters,
  featured: filteredFeatured,
  personal: filteredPersonal,
  opensource: filteredOpenSource,
  client: filteredClient,
  experiments: filteredExperiments,
  allFiltered: allFilteredProjects,
} = useProjects();
</script>
