<template>
  <div
    class="p-5 rounded-xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all bg-white"
  >
    <!-- Image -->
    <div
      v-if="project.image"
      class="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-stone-50"
    >
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover"
        @error="imageError = true"
      />
      <div
        v-if="imageError"
        class="absolute inset-0 flex items-center justify-center bg-stone-100"
      >
        <Icon name="lucide:image-off" class="w-6 h-6 text-stone-300" />
      </div>
    </div>

    <!-- Header -->
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="font-medium text-stone-800 text-[15px]">
        {{ project.title }}
      </h3>
      <span
        class="shrink-0 text-[10px] px-2 py-0.5 rounded-full"
        :class="statusClasses"
      >
        {{ statusLabel }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-sm text-stone-500 mb-4 leading-relaxed line-clamp-2">
      {{ project.description }}
    </p>

    <!-- Stack -->
    <div class="flex flex-wrap gap-1.5 mb-4">
      <span
        v-for="tech in project.stack.slice(0, 4)"
        :key="tech"
        class="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600"
      >
        {{ tech }}
      </span>
      <span
        v-if="project.stack.length > 4"
        class="text-[11px] px-2 py-0.5 rounded-full bg-stone-50 text-stone-400"
      >
        +{{ project.stack.length - 4 }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between">
      <!-- Year -->
      <span class="text-xs text-stone-400">{{ project.year }}</span>

      <!-- Links -->
      <div class="flex items-center gap-3">
        <a
          v-if="project.links.github"
          :href="project.links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-stone-400 hover:text-stone-700 transition-colors"
          title="Ver código"
          @click="handleGithubClick"
        >
          <Icon name="lucide:github" class="w-4 h-4" />
        </a>
        <a
          v-if="project.links.demo"
          :href="project.links.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-stone-400 hover:text-stone-700 transition-colors"
          title="Ver demo"
          @click="handleDemoClick"
        >
          <Icon name="lucide:external-link" class="w-4 h-4" />
        </a>
        <NuxtLink
          v-if="project.links.caseStudy"
          :to="project.links.caseStudy"
          class="text-stone-400 hover:text-stone-700 transition-colors"
          title="Ver case study"
          @click="handleCaseStudyClick"
        >
          <Icon name="lucide:file-text" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  trackProjectGithubClick,
  trackProjectDemoClick,
  trackProjectCaseStudyClick,
} = useAnalytics();

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

const props = defineProps<{
  project: Project;
}>();

const imageError = ref(false);

const handleGithubClick = () => {
  trackProjectGithubClick(props.project.id, props.project.title);
};

const handleDemoClick = () => {
  trackProjectDemoClick(props.project.id, props.project.title);
};

const handleCaseStudyClick = () => {
  trackProjectCaseStudyClick(props.project.id, props.project.title);
};

const statusLabel = computed(() => {
  const labels = {
    development: "Em dev",
    completed: "Concluído",
    archived: "Arquivado",
  };
  return labels[props.project.status];
});

const statusClasses = computed(() => {
  const classes = {
    development: "bg-amber-50 text-amber-600",
    completed: "bg-green-50 text-green-600",
    archived: "bg-stone-100 text-stone-500",
  };
  return classes[props.project.status];
});
</script>
