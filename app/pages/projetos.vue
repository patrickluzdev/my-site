<template>
  <div>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-3">Meus Projetos 🚀</h1>
        <p class="text-muted-foreground text-lg">
          Confira alguns dos projetos que desenvolvi, desde aplicações web até sistemas completos.
        </p>
      </div>

      <div class="mb-8 flex flex-wrap gap-2">
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <!-- Mensagem se não houver projetos -->
      <div
        v-if="filteredProjects.length === 0"
        class="text-center py-12"
      >
        <Icon name="lucide:folder-open" class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p class="text-muted-foreground text-lg">
          Nenhum projeto encontrado nesta categoria.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/project-card/ProjectCard.vue'

definePageMeta({
  layout: 'default'
})

const selectedCategory = ref('Todos')

const categories = [
  'Todos',
  'SaaS',
  'E-commerce',
  'Dashboard',
  'Landing Page',
  'Mobile'
]

const projects = ref([
  {
    id: 1,
    title: 'Plataforma SaaS de Newsletter com IA',
    description: 'Sistema completo de newsletter com geração de conteúdo por IA, análise de métricas e automação de envios. Desenvolvido com Next.js 16 e integração com OpenAI.',
    image: 'https://placehold.co/600x400/6366f1/white?text=Newsletter+AI',
    technologies: ['Next.js', 'TypeScript', 'OpenAI', 'Prisma', 'PostgreSQL'],
    category: 'SaaS',
    status: 'Concluído',
    featured: true,
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/patrickluz',
    stats: {
      users: '500+',
      performance: '98/100'
    }
  },
  {
    id: 2,
    title: 'E-commerce Plus',
    description: 'Loja virtual completa com painel administrativo, gerenciamento de estoque, processamento de pagamentos e dashboard de analytics em tempo real.',
    image: 'https://placehold.co/600x400/8b5cf6/white?text=E-commerce',
    technologies: ['Vue.js', 'Nuxt', 'Stripe', 'Node.js', 'MongoDB'],
    category: 'E-commerce',
    status: 'Concluído',
    featured: true,
    demoUrl: 'https://demo.example.com',
    stats: {
      performance: '300% faster'
    }
  },
  {
    id: 3,
    title: 'Dashboard Analytics Pro',
    description: 'Dashboard completo de analytics com integrações de múltiplas APIs, visualização de dados em tempo real e relatórios customizáveis.',
    image: 'https://placehold.co/600x400/06b6d4/white?text=Analytics',
    technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind', 'Express'],
    category: 'Dashboard',
    status: 'Concluído',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/patrickluz',
    stats: {
      stars: 245
    }
  },
  {
    id: 4,
    title: 'FitApp Health - PWA',
    description: 'Progressive Web App para treinos personalizados com tracking de exercícios, planos nutricionais e integração com wearables.',
    image: 'https://placehold.co/600x400/ec4899/white?text=FitApp',
    technologies: ['Vue.js', 'PWA', 'Firebase', 'Chart.js'],
    category: 'Mobile',
    status: 'Concluído',
    demoUrl: 'https://demo.example.com',
    stats: {
      users: '1.2k+'
    }
  },
  {
    id: 5,
    title: 'EduTech Streaming Platform',
    description: 'Plataforma de cursos online com sistema de streaming, progresso de alunos, certificados e gamificação.',
    image: 'https://placehold.co/600x400/f59e0b/white?text=EduTech',
    technologies: ['Nuxt', 'Vue.js', 'AWS', 'WebRTC', 'Redis'],
    category: 'SaaS',
    status: 'Em desenvolvimento',
    githubUrl: 'https://github.com/patrickluz'
  },
  {
    id: 6,
    title: 'Landing Page Moderna',
    description: 'Landing page de alta conversão com animações fluidas, otimização SEO e integração com ferramentas de marketing.',
    image: 'https://placehold.co/600x400/10b981/white?text=Landing',
    technologies: ['Astro', 'Tailwind', 'GSAP', 'TypeScript'],
    category: 'Landing Page',
    status: 'Concluído',
    demoUrl: 'https://demo.example.com',
    stats: {
      performance: '100/100'
    }
  }
])

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'Todos') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})
</script>
