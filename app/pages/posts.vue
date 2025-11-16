<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-3">Posts 📝</h1>
        <p class="text-muted-foreground text-lg">
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
              class="flex-shrink-0 h-7 w-7 p-0"
            >
              <Icon name="lucide:x" class="w-3 h-3" />
            </Button>
          </div>
        </Card>

        <!-- Category Filters -->
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'default' : 'outline'"
            size="sm"
            @click="selectedCategory = category"
          >
            {{ category }}
          </Button>
        </div>

        <div v-if="searchQuery || selectedCategory !== 'Todos'" class="text-sm text-muted-foreground">
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados' }}
        </div>
      </div>

      <div class="space-y-4">
        <PostCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
      </div>

      <div
        v-if="filteredPosts.length === 0"
        class="text-center py-12"
      >
        <Icon name="lucide:file-text" class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p class="text-muted-foreground text-lg">
          Nenhum post encontrado.
        </p>
        <p class="text-sm text-muted-foreground mt-2">
          Tente ajustar os filtros ou a busca.
        </p>
      </div>
    </main>
</template>

<script setup lang="ts">
import PostCard from '~/components/posts-list/components/PostCard.vue'

definePageMeta({
  layout: 'default'
})

const searchQuery = ref('')
const selectedCategory = ref('Todos')

const categories = [
  'Todos',
  'Anúncios',
  'Discussão geral',
  'Tutoriais',
  'Projetos',
  'Dicas'
]

interface Commenter {
  initial: string
  color: string
}

interface Post {
  id: number
  author: string
  time: string
  category: string
  pinned?: boolean
  badge?: string
  status?: boolean
  title: string
  description: string
  likes: number
  comments: number
  commenters: Commenter[]
  lastComment?: string
  thumbnail?: string | null
}

const posts = ref<Post[]>([
  {
    id: 1,
    author: 'Patrick Luz',
    time: 'há 12 dias',
    category: 'Anúncios',
    pinned: true,
    badge: 'lucide:zap',
    status: true,
    title: 'Como construir uma Newsletter SaaS com IA usando Next.js 16!',
    description: 'Junte-se a mim enquanto mostro como construir uma aplicação SaaS de Newsletter com IA do zero usando o mais recente Next.js 16 - Este tutorial abrangente cobre tudo que você precisa',
    likes: 7,
    comments: 2,
    commenters: [
      { initial: 'J', color: '#FF6B6B' },
      { initial: 'M', color: '#4ECDC4' }
    ],
    lastComment: 'há 11 dias',
    thumbnail: 'https://placehold.co/96x96/6366f1/white?text=IA'
  },
  {
    id: 2,
    author: 'Patrick Luz',
    time: 'há 6 dias',
    category: 'Discussão geral',
    badge: 'lucide:message-circle',
    status: true,
    title: 'Alguma ideia 💡?',
    description: 'Construí um aplicativo para um cliente, mas não consigo entregá-lo ainda porque o timer de sessão não para automaticamente quando estou a mais de 300m do endereço alvo. O app',
    likes: 1,
    comments: 6,
    commenters: [
      { initial: 'A', color: '#95E1D3' },
      { initial: 'B', color: '#F38181' },
      { initial: 'C', color: '#AA96DA' }
    ],
    lastComment: 'há 22h',
    thumbnail: 'https://placehold.co/96x96/8b5cf6/white?text=App'
  },
  {
    id: 3,
    author: 'Patrick Luz',
    time: 'há 9 dias',
    category: 'Discussão geral',
    badge: 'lucide:message-circle',
    status: true,
    title: 'OS 4 ESTÁGIOS DA ASCENSÃO DA IA — ONDE NÓS, COMO DESENVOL...',
    description: 'E aí pessoal 👋 Acabei de ler uma reflexão incrível sobre como a IA está mudando o valor das habilidades, especialmente para nós desenvolvedores. Um framework que realmente se destacou para mim',
    likes: 2,
    comments: 1,
    commenters: [
      { initial: 'T', color: '#4ECDC4' }
    ],
    lastComment: 'há 1 dia',
    thumbnail: 'https://placehold.co/96x96/06b6d4/white?text=IA'
  },
  {
    id: 4,
    author: 'Patrick Luz',
    time: 'há 6 dias',
    category: 'Discussão geral',
    badge: 'lucide:briefcase',
    status: true,
    title: 'Agência de Apps Web Fintech',
    description: 'E aí galera; Onde podemos encontrar leads valiosos como uma agência fintech operando tanto em web2 quanto web3? Já completamos projetos e ganhamos mais de 100k mas gostaria de saber se vale',
    likes: 0,
    comments: 2,
    commenters: [
      { initial: 'R', color: '#FF6B6B' },
      { initial: 'S', color: '#95E1D3' }
    ],
    lastComment: 'há 2 dias',
    thumbnail: null
  },
  {
    id: 5,
    author: 'Patrick Luz',
    time: 'há 15 dias',
    category: 'Tutoriais',
    badge: 'lucide:book-open',
    status: true,
    title: 'Guia Completo: TypeScript para Iniciantes',
    description: 'Aprenda TypeScript do zero com este guia completo. Cobrimos desde os conceitos básicos até padrões avançados, com exemplos práticos e cases reais de uso em projetos modernos.',
    likes: 15,
    comments: 8,
    commenters: [
      { initial: 'L', color: '#FF6B6B' },
      { initial: 'K', color: '#4ECDC4' },
      { initial: 'P', color: '#95E1D3' }
    ],
    lastComment: 'há 3 dias',
    thumbnail: 'https://placehold.co/96x96/3178c6/white?text=TS'
  },
  {
    id: 6,
    author: 'Patrick Luz',
    time: 'há 20 dias',
    category: 'Projetos',
    badge: 'lucide:rocket',
    status: true,
    title: 'Lançamento: Dashboard Analytics Pro v2.0',
    description: 'Acabamos de lançar a nova versão do nosso dashboard com recursos incríveis: gráficos interativos em tempo real, integração com múltiplas APIs e muito mais!',
    likes: 23,
    comments: 12,
    commenters: [
      { initial: 'F', color: '#AA96DA' },
      { initial: 'G', color: '#F38181' },
      { initial: 'H', color: '#4ECDC4' }
    ],
    lastComment: 'há 5 dias',
    thumbnail: 'https://placehold.co/96x96/06b6d4/white?text=v2.0'
  },
  {
    id: 7,
    author: 'Patrick Luz',
    time: 'há 25 dias',
    category: 'Dicas',
    badge: 'lucide:lightbulb',
    status: true,
    title: '10 Dicas para Melhorar a Performance do seu App Vue/Nuxt',
    description: 'Descubra técnicas comprovadas para otimizar a performance do seu aplicativo Vue.js ou Nuxt. Desde lazy loading até code splitting, SSR e muito mais.',
    likes: 31,
    comments: 15,
    commenters: [
      { initial: 'X', color: '#FF6B6B' },
      { initial: 'Y', color: '#95E1D3' },
      { initial: 'Z', color: '#AA96DA' }
    ],
    lastComment: 'há 7 dias',
    thumbnail: 'https://placehold.co/96x96/41b883/white?text=Vue'
  }
])

const filteredPosts = computed(() => {
  let result = posts.value

  if (selectedCategory.value !== 'Todos') {
    result = result.filter(post => post.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
    )
  }

  return result.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return b.id - a.id
  })
})
</script>
