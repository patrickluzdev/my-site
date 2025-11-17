<template>
  <main class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div class="mb-6 sm:mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">Posts 📝</h1>
        <p class="text-muted-foreground text-base sm:text-lg">
          Artigos, tutoriais e discussões sobre desenvolvimento, tecnologia e inovação.
        </p>
      </div>

      <div class="mb-8 space-y-4">
        <Card class="p-2">
          <div class="flex items-center gap-2">
            <Icon name="lucide:search" class="w-4 h-4 text-muted-foreground shrink-0 ml-1" />
            <Input
              v-model="searchQuery"
              placeholder="Buscar posts por título ou descrição..."
              class="border-0 shadow-none focus-visible:ring-0 text-sm h-8 py-1"
            />
            <Button
              v-if="searchQuery"
              variant="ghost"
              size="sm"
              @click="searchQuery = ''"
              class="shrink-0 h-7 w-7 p-0"
            >
              <Icon name="lucide:x" class="w-3 h-3" />
            </Button>
          </div>
        </Card>

        <div class="flex flex-wrap gap-2">
          <template v-if="categories && categories.length > 0">
            <Button
              v-for="category in categories"
              :key="category.slug"
              :variant="selectedCategory === category.name ? 'default' : 'outline'"
              size="sm"
              @click="selectedCategory = category.name"
            >
              <Icon
                v-if="category.icon && isValidIcon(category.icon)"
                :name="formatIconName(category.icon)"
                class="w-3 h-3 mr-1.5"
              />
              {{ category.name }}
              <span v-if="category.count > 0" class="ml-1.5 text-xs opacity-70">({{ category.count }})</span>
            </Button>
          </template>
          <template v-else>
            <div v-for="i in 5" :key="i" class="h-9 w-24 bg-muted rounded-md animate-pulse"></div>
          </template>
        </div>

        <div v-if="searchQuery || selectedCategory !== 'Todos'" class="text-sm text-muted-foreground">
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados' }}
        </div>
      </div>

      <Card v-if="error && !loading" class="p-6 border-destructive/50 bg-destructive/5">
        <div class="flex items-start gap-3">
          <Icon name="lucide:alert-circle" class="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div class="flex-1">
            <h3 class="font-semibold text-destructive mb-1">Erro ao carregar posts</h3>
            <p class="text-sm text-muted-foreground mb-3">{{ error }}</p>
            <Button @click="retry" size="sm" variant="outline">
              <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      </Card>

      <div v-if="loading" class="space-y-4">
        <PostCardSkeleton v-for="i in 3" :key="i" />
      </div>

      <div v-else-if="!error" class="space-y-4">
        <PostCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
      </div>

      <div
        v-if="!loading && !error && hasNextPage && !searchQuery && selectedCategory === 'Todos'"
        ref="loadMoreButton"
        class="mt-8 text-center"
      >
        <Button
          @click="loadMore"
          :disabled="loadingMore"
          variant="secondary"
          size="lg"
          class="min-w-[200px]"
        >
          <span>{{ loadingMore ? 'Carregando...' : 'Carregar mais posts' }}</span>
          <Icon v-if="loadingMore" name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
          <Icon v-else name="lucide:chevron-down" class="w-4 h-4 mr-2" />
        </Button>
      </div>

      <div
        v-if="!loading && !error && filteredPosts.length === 0"
        class="text-center py-12"
      >
        <Icon name="lucide:file-text" class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p class="text-muted-foreground text-lg">
          Nenhum post encontrado.
        </p>
        <p class="text-sm text-muted-foreground mt-2">
          {{ searchQuery || selectedCategory !== 'Todos' ? 'Tente ajustar os filtros ou a busca.' : 'Nenhum post foi publicado ainda.' }}
        </p>
      </div>
    </main>
</template>

<script setup lang="ts">
import PostCard from '~/components/posts-list/components/PostCard.vue'
import PostCardSkeleton from '~/components/posts-list/components/PostCardSkeleton.vue'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Posts - Blog e Discussões',
  meta: [
    {
      name: 'description',
      content: 'Artigos, tutoriais e discussões sobre desenvolvimento, tecnologia e inovação.'
    }
  ]
})

interface Commenter {
  initial: string
  color: string
}

interface Post {
  id: string
  author: string
  authorAvatar?: string | null
  time: string
  category: string
  categorySlug?: string
  categoryColor?: string | null
  categoryIcon?: string | null
  pinned?: boolean
  badge?: string | null
  status?: boolean
  title: string
  description: string | null
  likes: number
  comments: number
  commenters: Commenter[]
  lastComment?: string | null
  thumbnail?: string | null
  slug: string
}

interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  color?: string | null
  icon?: string | null
  count: number
}

const searchQuery = ref('')
const selectedCategory = ref('Todos')
const posts = ref<Post[]>([])
const loadingMore = ref(false)
const error = ref<string | null>(null)
const nextCursor = ref<string | null>(null)
const hasNextPage = ref(false)

const { data: categories, error: categoriesError } = await useFetch<Category[]>('/api/posts/categories', {
  default: () => [{ id: 0, name: 'Todos', slug: 'todos', count: 0 }],
  server: true,
  lazy: false
})

const { data: initialData, error: postsError, pending: loading } = await useFetch<{
  data: Post[]
  pagination: { nextCursor: string | null, hasNextPage: boolean }
}>('/api/posts', {
  query: { limit: 12 },
  default: () => ({ data: [], pagination: { nextCursor: null, hasNextPage: false } }),
  server: true,
  lazy: false
})

const allPosts = ref<Post[]>(initialData.value?.data || [])
nextCursor.value = initialData.value?.pagination.nextCursor || null
hasNextPage.value = initialData.value?.pagination.hasNextPage || false

watch(initialData, (newData) => {
  if (newData) {
    allPosts.value = newData.data || []
    nextCursor.value = newData.pagination.nextCursor || null
    hasNextPage.value = newData.pagination.hasNextPage || false
  }
}, { immediate: true })

if (categoriesError.value) {
  console.error('Error loading categories:', categoriesError.value)
}

if (postsError.value) {
  console.error('Error loading posts:', postsError.value)
  error.value = 'Erro ao carregar posts. Tente novamente.'
}

const loadPosts = async (cursor?: string | null, append = false) => {
  try {
    error.value = null
    loadingMore.value = true

    const params: any = { limit: 12 }

    if (cursor) {
      params.cursor = cursor
    }

    const response = await $fetch<{ data: Post[], pagination: { nextCursor: string | null, hasNextPage: boolean } }>('/api/posts', {
      params
    })

    if (append) {
      allPosts.value = [...allPosts.value, ...response.data]
    } else {
      allPosts.value = response.data
    }

    nextCursor.value = response.pagination.nextCursor
    hasNextPage.value = response.pagination.hasNextPage
  } catch (err: any) {
    console.error('Error loading posts:', err)
    error.value = err?.message || 'Erro ao carregar posts. Tente novamente.'

    if (!append) {
      allPosts.value = []
    }
  } finally {
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (hasNextPage.value && !loadingMore.value && nextCursor.value) {
    loadPosts(nextCursor.value, true)
  }
}

const loadMoreButton = ref<HTMLElement | null>(null)

const filteredPosts = computed(() => {
  let result = allPosts.value

  if (selectedCategory.value !== 'Todos') {
    result = result.filter(post => post.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post =>
      post.title.toLowerCase().includes(query) ||
      (post.description && post.description.toLowerCase().includes(query))
    )
  }

  return result
})

let searchTimeout: NodeJS.Timeout | null = null
watch(searchQuery, (newValue) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (!newValue.trim()) {
    return
  }

  searchTimeout = setTimeout(() => {}, 300)
})

const retry = async () => {
  error.value = null
  await loadPosts(undefined, false)
}

const { isValidIcon, formatIconName } = useIconFormatter()

onMounted(() => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !searchQuery.value && selectedCategory.value === 'Todos') {
          loadMore()
        }
      },
      { rootMargin: '100px' }
    )

    watch(loadMoreButton, (el) => {
      if (el) {
        observer.observe(el)
      }
    })

    onUnmounted(() => {
      observer.disconnect()
    })
  }
})
</script>
