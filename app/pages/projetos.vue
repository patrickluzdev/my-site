<template>
  <div>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-3">Meus Projetos</h1>
        <p class="text-muted-foreground text-lg">
          Confira alguns dos projetos que desenvolvi, desde aplicações web até sistemas completos.
        </p>
      </div>

      <div v-if="loadingCategories" class="mb-8">
        <div class="flex gap-2">
          <div v-for="i in 5" :key="i" class="h-8 w-24 bg-muted animate-pulse rounded-md" />
        </div>
      </div>

      <div v-else class="mb-8 flex flex-wrap gap-2">
        <Button
          v-for="category in categories"
          :key="category.slug"
          :variant="selectedCategory === category.slug ? 'default' : 'outline'"
          size="sm"
          @click="selectCategory(category.slug)"
        >
          {{ category.name }}
          <span v-if="category.count > 0" class="ml-1 text-xs opacity-70">({{ category.count }})</span>
        </Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div
          v-for="i in 3"
          :key="i"
          class="h-96 bg-muted animate-pulse rounded-lg"
        />
      </div>

      <div
        v-if="!loading && projects.length === 0"
        class="text-center py-12"
      >
        <Icon name="lucide:folder-open" class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p class="text-muted-foreground text-lg">
          Nenhum projeto encontrado nesta categoria.
        </p>
      </div>

      <div v-if="hasNextPage && !loading" class="mt-8 text-center">
        <Button
          @click="loadMore"
          :disabled="loadingMore"
          size="lg"
          variant="outline"
        >
          <Icon
            v-if="loadingMore"
            name="lucide:loader-2"
            class="w-4 h-4 mr-2 animate-spin"
          />
          {{ loadingMore ? 'Carregando...' : 'Carregar mais projetos' }}
        </Button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/project-card/ProjectCard.vue'

definePageMeta({
  layout: 'default'
})

interface ProjectStats {
  stars?: number
  users?: string
  performance?: string
}

interface Project {
  id: string
  title: string
  slug: string
  description: string
  image?: string
  technologies: string[]
  category: string
  categorySlug?: string
  status?: string
  featured?: boolean
  demoUrl?: string
  githubUrl?: string
  link?: string
  stats?: ProjectStats
}

interface PaginationInfo {
  nextCursor: string | null
  hasNextPage: boolean
}

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  count: number
}

const selectedCategory = ref('todos')
const projects = ref<Project[]>([])
const nextCursor = ref<string | null>(null)
const hasNextPage = ref(false)
const loading = ref(true)
const loadingMore = ref(false)
const loadingCategories = ref(true)
const categories = ref<Category[]>([])

const loadCategories = async () => {
  try {
    loadingCategories.value = true
    const data = await $fetch<Category[]>('/api/projects/categories')
    categories.value = data
  } catch (error) {
    console.error('Error loading categories:', error)
  } finally {
    loadingCategories.value = false
  }
}

const loadProjects = async (cursor?: string) => {
  try {
    const params: Record<string, any> = {
      limit: 12,
    }

    if (cursor) {
      params.cursor = cursor
    }

    if (selectedCategory.value !== 'todos') {
      params.category = selectedCategory.value
    }

    const response = await $fetch<{
      data: Project[]
      pagination: PaginationInfo
    }>('/api/projects', {
      params,
    })

    return response
  } catch (error) {
    console.error('Error loading projects:', error)
    throw error
  }
}

const loadInitial = async () => {
  try {
    loading.value = true
    const response = await loadProjects()
    projects.value = response.data
    nextCursor.value = response.pagination.nextCursor
    hasNextPage.value = response.pagination.hasNextPage
  } catch (error) {
    console.error('Error loading initial projects:', error)
  } finally {
    loading.value = false
  }
}

const loadMore = async () => {
  if (!nextCursor.value || loadingMore.value) return

  try {
    loadingMore.value = true
    const response = await loadProjects(nextCursor.value)
    projects.value = [...projects.value, ...response.data]
    nextCursor.value = response.pagination.nextCursor
    hasNextPage.value = response.pagination.hasNextPage
  } catch (error) {
    console.error('Error loading more projects:', error)
  } finally {
    loadingMore.value = false
  }
}

const selectCategory = async (slug: string) => {
  if (selectedCategory.value === slug) return

  selectedCategory.value = slug
  await loadInitial()
}

onMounted(async () => {
  await Promise.all([
    loadCategories(),
    loadInitial()
  ])
})
</script>
