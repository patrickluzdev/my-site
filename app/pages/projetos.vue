<template>
  <div>
    <!-- Header Section -->
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-stone-900 mb-1">
        Meus projetos
      </h1>
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
          v-for="type in projectTypes"
          :key="type.value"
          @click="toggleTypeFilter(type.value)"
          class="px-3 py-1 text-xs rounded-full border transition-colors"
          :class="
            selectedTypes.includes(type.value)
              ? 'bg-stone-800 text-white border-stone-800'
              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
          "
        >
          {{ type.label }}
        </button>

        <span class="w-px h-5 bg-stone-200 self-center mx-1" />

        <!-- Tech Filters -->
        <button
          v-for="tech in availableTechs"
          :key="tech"
          @click="toggleTechFilter(tech)"
          class="px-3 py-1 text-xs rounded-full border transition-colors"
          :class="
            selectedTechs.includes(tech)
              ? 'bg-stone-800 text-white border-stone-800'
              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
          "
        >
          {{ tech }}
        </button>

        <!-- Clear Filters -->
        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="px-3 py-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
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
        Precisa de um desenvolvedor full-stack? Estou aberto a trabalhar em
        novos projetos legais.
      </p>
      <NuxtLink
        to="/contato"
        class="text-sm text-stone-600 underline underline-offset-2 decoration-stone-300 hover:decoration-stone-500 hover:text-stone-800"
      >
        Me contrate
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
        @click="clearFilters"
        class="mt-2 text-sm text-stone-600 underline underline-offset-2"
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

// SEO
useSeoMeta({
  title: "Projetos - Patrick Luz",
  description:
    "Portfólio de projetos desenvolvidos: sistemas web, APIs, automações e mais. Veja exemplos de trabalhos em Vue.js, React, Go, Node.js e outras tecnologias.",
  ogTitle: "Projetos - Patrick Luz",
  ogDescription:
    "Portfólio de projetos desenvolvidos: sistemas web, APIs, automações e mais.",
  ogType: "website",
  twitterCard: "summary_large_image",
});

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  stack: string[];
  status: "development" | "completed" | "archived";
  year: number;
  type: "web" | "mobile" | "api" | "tool";
  category: "featured" | "personal" | "client" | "opensource" | "experiment";
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
}

// Project Types for Filter
const projectTypes = [
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "API", value: "api" },
  { label: "Tool", value: "tool" },
];

// Projects Data
const projects = ref<Project[]>([
  // Featured
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
      caseStudy: "/blog/ecommerce-case",
    },
  },
  // Personal
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
  // Open Source
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
  // Client
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
    links: {
      caseStudy: "/blog/delivery-case",
    },
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
  // Experiments
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
]);

// Filters State
const searchQuery = ref("");
const selectedTypes = ref<string[]>([]);
const selectedTechs = ref<string[]>([]);

// Get unique techs from all projects
const availableTechs = computed(() => {
  const techs = new Set<string>();
  projects.value.forEach((p) => p.stack.forEach((t) => techs.add(t)));
  return Array.from(techs).sort();
});

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    selectedTypes.value.length > 0 ||
    selectedTechs.value.length > 0
  );
});

// Filter functions
const toggleTypeFilter = (type: string) => {
  const index = selectedTypes.value.indexOf(type);
  if (index === -1) {
    selectedTypes.value.push(type);
  } else {
    selectedTypes.value.splice(index, 1);
  }
};

const toggleTechFilter = (tech: string) => {
  const index = selectedTechs.value.indexOf(tech);
  if (index === -1) {
    selectedTechs.value.push(tech);
  } else {
    selectedTechs.value.splice(index, 1);
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedTypes.value = [];
  selectedTechs.value = [];
};

// Filter projects
const filterProjects = (projectList: Project[]) => {
  return projectList.filter((project) => {
    // Search filter
    const matchesSearch =
      searchQuery.value === "" ||
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      project.stack.some((t) =>
        t.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

    // Type filter
    const matchesType =
      selectedTypes.value.length === 0 ||
      selectedTypes.value.includes(project.type);

    // Tech filter
    const matchesTech =
      selectedTechs.value.length === 0 ||
      selectedTechs.value.some((tech) => project.stack.includes(tech));

    return matchesSearch && matchesType && matchesTech;
  });
};

// Filtered project lists by category
const filteredFeatured = computed(() =>
  filterProjects(projects.value.filter((p) => p.category === "featured"))
);

const filteredPersonal = computed(() =>
  filterProjects(projects.value.filter((p) => p.category === "personal"))
);

const filteredOpenSource = computed(() =>
  filterProjects(projects.value.filter((p) => p.category === "opensource"))
);

const filteredClient = computed(() =>
  filterProjects(projects.value.filter((p) => p.category === "client"))
);

const filteredExperiments = computed(() =>
  filterProjects(projects.value.filter((p) => p.category === "experiment"))
);

// All filtered projects for empty state check
const allFilteredProjects = computed(() => [
  ...filteredFeatured.value,
  ...filteredPersonal.value,
  ...filteredOpenSource.value,
  ...filteredClient.value,
  ...filteredExperiments.value,
]);
</script>
