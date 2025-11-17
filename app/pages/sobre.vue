<template>
  <div>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-12">
        <h1 class="text-4xl font-bold mb-4">Sobre Mim 👨‍💻</h1>
        <p class="text-muted-foreground text-xl">
          Conheça mais sobre minha trajetória, habilidades e experiências.
        </p>
      </div>

      <div class="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:user" class="w-5 h-5" />
              Quem sou eu
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-muted-foreground leading-relaxed">
              Sou desenvolvedor full-stack apaixonado por criar soluções inovadoras e eficientes.
              Com experiência em diversas tecnologias e frameworks modernos, trabalho para
              transformar ideias em produtos digitais de alta qualidade.
            </p>
            <p class="text-muted-foreground leading-relaxed">
              Meu foco está em desenvolver aplicações escaláveis, com código limpo e
              experiências de usuário excepcionais. Adoro aprender novas tecnologias e
              compartilhar conhecimento com a comunidade.
            </p>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:code" class="w-5 h-5" />
              Tecnologias & Habilidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="pending" class="text-center py-8 text-muted-foreground">
              Carregando...
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(categorySkills, category) in skills" :key="category">
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                  <Icon :name="categoryIcons[category] || 'lucide:circle'" class="w-4 h-4" />
                  {{ category }}
                </h3>
                <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="skill in categorySkills"
                    :key="skill.name"
                    variant="secondary"
                    class="flex items-center gap-1.5"
                  >
                    <Icon v-if="skill.icon" :name="getIconName(skill.icon)" class="w-3.5 h-3.5" />
                    {{ skill.name }}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:briefcase" class="w-5 h-5" />
              Experiência
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div v-if="pending" class="text-center py-8 text-muted-foreground">
              Carregando...
            </div>
            <div v-else-if="workExperiences.length > 0" class="border-l-2 border-primary pl-4 space-y-4">
              <div v-for="exp in workExperiences" :key="exp.id || exp.position">
                <h3 class="font-semibold">{{ exp.position }}</h3>
                <p v-if="exp.companyName" class="text-sm font-medium text-muted-foreground">
                  {{ exp.companyName }}
                </p>
                <p class="text-sm text-muted-foreground">{{ exp.period }}</p>
                <p v-if="exp.description" class="text-muted-foreground mt-2">
                  {{ exp.description }}
                </p>
              </div>
            </div>
            <div v-else class="text-center py-8 text-muted-foreground">
              Nenhuma experiência cadastrada
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:graduation-cap" class="w-5 h-5" />
              Formação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="pending" class="text-center py-8 text-muted-foreground">
              Carregando...
            </div>
            <div v-else-if="education.length > 0" class="space-y-4">
              <div v-for="edu in education" :key="edu.id || edu.degree">
                <h3 class="font-semibold">{{ edu.fieldOfStudy }}</h3>
                <p class="text-sm text-muted-foreground">{{ edu.degree }} - {{ edu.period }}</p>
                <p v-if="edu.institutionName" class="text-sm text-muted-foreground">
                  {{ edu.institutionName }}
                </p>
                <p v-if="edu.description" class="text-muted-foreground mt-2">
                  {{ edu.description }}
                </p>
              </div>
            </div>
            <div v-else class="text-center py-8 text-muted-foreground">
              Nenhuma formação cadastrada
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'

definePageMeta({
  layout: 'default'
})

// Buscar dados da API
const { data: aboutData, pending } = await useFetch('/api/about')

// Dados padrão caso não haja dados na API
const defaultData = {
  skills: {
    'Frontend': [
      { name: 'Vue.js' },
      { name: 'Nuxt' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' }
    ],
    'Backend': [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Prisma' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' }
    ],
    'DevOps & Cloud': [
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'Git' }
    ],
    'Outras': [
      { name: 'RESTful APIs' },
      { name: 'GraphQL' },
      { name: 'WebSockets' },
      { name: 'Testing' }
    ]
  },
  workExperiences: [
    {
      position: 'Desenvolvedor Full-Stack',
      period: '2022 - Presente',
      description: 'Desenvolvimento de aplicações web escaláveis utilizando tecnologias modernas. Foco em performance, UX e melhores práticas de desenvolvimento.'
    },
    {
      position: 'Desenvolvedor Frontend',
      period: '2020 - 2022',
      description: 'Criação de interfaces responsivas e interativas. Trabalho em equipe utilizando metodologias ágeis.'
    }
  ],
  education: [
    {
      degree: 'Bacharelado',
      fieldOfStudy: 'Ciência da Computação',
      period: '2024'
    }
  ]
}

const skills = computed(() => aboutData.value?.skills ?? defaultData.skills)
const workExperiences = computed(() => aboutData.value?.workExperiences ?? defaultData.workExperiences)
const education = computed(() => aboutData.value?.education ?? defaultData.education)

// Mapear categorias para ícones
const categoryIcons: Record<string, string> = {
  'Frontend': 'lucide:layout',
  'frontend': 'lucide:layout',
  'Backend': 'lucide:server',
  'backend': 'lucide:server',
  'DevOps & Cloud': 'lucide:cloud',
  'devops': 'lucide:cloud',
  'Outras': 'lucide:sparkles',
  'outras': 'lucide:sparkles'
}

// Mapear nomes de tecnologias para ícones
const techIconMap: Record<string, string> = {
  'JavaScript': 'vscode-icons:file-type-js-official',
  'TypeScript': 'vscode-icons:file-type-typescript-official',
  'React': 'vscode-icons:file-type-reactjs',
  'Vue.js': 'vscode-icons:file-type-vue',
  'Node.js': 'vscode-icons:file-type-node',
  'PostgreSQL': 'vscode-icons:file-type-pgsql',
  'MongoDB': 'vscode-icons:file-type-mongo',
  'Docker': 'vscode-icons:file-type-docker2',
  'AWS': 'skill-icons:aws-dark',
  'Git': 'vscode-icons:file-type-git',
  'Nuxt': 'vscode-icons:file-type-nuxt',
  'Next.js': 'vscode-icons:file-type-next',
  'Express': 'simple-icons:express',
  'Prisma': 'vscode-icons:file-type-light-prisma',
  'Redis': 'vscode-icons:file-type-redis',
  'Tailwind CSS': 'vscode-icons:file-type-tailwind',
  'GraphQL': 'vscode-icons:file-type-graphql',
  'RESTful APIs': 'lucide:api',
  'WebSockets': 'lucide:radio',
  'Testing': 'lucide:flask-conical',
  'CI/CD': 'lucide:git-merge'
}

// Função para obter o nome do ícone
const getIconName = (iconName: string): string => {
  // Primeiro tenta encontrar no mapa de ícones de tecnologia
  if (techIconMap[iconName]) {
    return techIconMap[iconName]
  }

  // Se não encontrar, usa o ícone padrão
  return 'lucide:circle'
}
</script>
