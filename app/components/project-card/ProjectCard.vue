<template>
  <Card class="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col !py-0 !gap-0">
    <div
      v-if="project.image"
      class="relative w-full h-48 overflow-hidden bg-muted -m-px rounded-t-xl"
    >
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
        <Badge
          v-if="project.status === 'Em desenvolvimento'"
          variant="default"
          class="shadow-lg"
        >
          <Icon name="lucide:code" class="w-3 h-3 mr-1" />
          Em desenvolvimento
        </Badge>
        <Badge
          v-if="project.featured"
          variant="secondary"
          class="ml-auto shadow-lg bg-primary text-primary-foreground hover:bg-primary"
        >
          <Icon name="lucide:star" class="w-3 h-3 mr-1" />
          Destaque
        </Badge>
      </div>
    </div>

    <CardHeader class="pt-6 pb-4">
      <CardTitle class="text-xl group-hover:text-primary transition-colors mb-2">
        {{ project.title }}
      </CardTitle>
      <CardDescription class="line-clamp-2">
        {{ project.description }}
      </CardDescription>
    </CardHeader>

    <CardContent class="flex-1 space-y-4 pt-0 pb-4">
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="tech in project.technologies"
          :key="tech"
          variant="outline"
          class="text-xs"
        >
          {{ tech }}
        </Badge>
      </div>

      <div
        v-if="project.stats"
        class="flex items-center gap-4 text-sm text-muted-foreground"
      >
        <div
          v-if="project.stats.stars"
          class="flex items-center gap-1"
        >
          <Icon name="lucide:star" class="w-4 h-4" />
          <span>{{ project.stats.stars }}</span>
        </div>
        <div
          v-if="project.stats.users"
          class="flex items-center gap-1"
        >
          <Icon name="lucide:users" class="w-4 h-4" />
          <span>{{ project.stats.users }}</span>
        </div>
        <div
          v-if="project.stats.performance"
          class="flex items-center gap-1"
        >
          <Icon name="lucide:zap" class="w-4 h-4 text-yellow-500" />
          <span>{{ project.stats.performance }}</span>
        </div>
      </div>
    </CardContent>

    <CardFooter class="flex gap-2 pb-6 pt-0">
      <Button
        v-if="project.demoUrl"
        as-child
        variant="default"
        size="sm"
        class="flex-1"
      >
        <a
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="lucide:external-link" class="w-4 h-4 mr-2" />
          Ver Demo
        </a>
      </Button>
      <Button
        v-if="project.githubUrl"
        as-child
        variant="outline"
        size="sm"
        :class="project.demoUrl ? '' : 'flex-1'"
      >
        <a
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="lucide:github" class="w-4 h-4 mr-2" />
          GitHub
        </a>
      </Button>
      <Button
        v-if="!project.demoUrl && !project.githubUrl && project.link"
        as-child
        variant="default"
        size="sm"
        class="flex-1"
      >
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="lucide:arrow-right" class="w-4 h-4 mr-2" />
          Ver Mais
        </a>
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
interface ProjectStats {
  stars?: number
  users?: string
  performance?: string
}

interface Project {
  id: number
  title: string
  description: string
  image?: string
  technologies: string[]
  status?: string
  featured?: boolean
  demoUrl?: string
  githubUrl?: string
  link?: string
  stats?: ProjectStats
}

defineProps<{
  project: Project
}>()
</script>
