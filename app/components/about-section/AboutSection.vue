<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Sobre Patrick Luz 👨‍💻</CardTitle>
      <CardDescription>
        Desenvolvedor Full Stack especializado em criar soluções web modernas e escaláveis 🚀
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-5">
      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
          Transformando ideias em produtos digitais 💡
        </h3>
        <p class="text-muted-foreground leading-relaxed">
          Com anos de experiência em desenvolvimento web, ajudo empresas e empreendedores
          a construir aplicações robustas, responsivas e de alta performance. Especializado
          em tecnologias modernas como React, Vue.js, Node.js e Nuxt 🎯.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <Badge variant="secondary" class="px-3 py-1.5 text-xs">
          💻 Full Stack Development
        </Badge>
        <Badge variant="secondary" class="px-3 py-1.5 text-xs">
          ⚡ Performance & SEO
        </Badge>
        <Badge variant="secondary" class="px-3 py-1.5 text-xs">
          🎨 UI/UX Design
        </Badge>
        <Badge variant="secondary" class="px-3 py-1.5 text-xs">
          📱 Responsive Web
        </Badge>
        <Badge variant="secondary" class="px-3 py-1.5 text-xs">
          🔧 APIs & Integrações
        </Badge>
      </div>

      <p class="text-muted-foreground font-medium">
        Vamos trabalhar juntos no seu próximo projeto? 💼
      </p>

      <div class="flex items-center gap-3 pt-2">
        <Button
          as-child
          variant="secondary"
          size="sm"
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="lucide:twitter" class="w-4 h-4 mr-2" />
            Twitter
          </a>
        </Button>
        <Button
          as-child
          variant="secondary"
          size="sm"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="lucide:github" class="w-4 h-4 mr-2" />
            GitHub
          </a>
        </Button>
      </div>

    <Separator class="my-8" />

    <h2 class="text-2xl font-bold mb-6">Clientes & Projetos Recentes 🎯</h2>

    <div class="space-y-4">
      <div
        v-for="client in clients"
        :key="client.id"
        class="flex items-start gap-3 pb-4 border-b border-border last:border-0"
      >
        <Avatar class="w-10 h-10">
          <AvatarFallback
            class="text-white font-semibold"
            :style="{ backgroundColor: client.color }"
          >
            {{ client.initial }}
          </AvatarFallback>
        </Avatar>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <p class="font-semibold text-sm">{{ client.name }}</p>
            <Badge variant="secondary" class="text-xs">
              {{ client.type }}
            </Badge>
          </div>
          <p class="text-sm text-muted-foreground mb-2">
            {{ client.emoji }} {{ client.project }}
          </p>

          <div
            v-if="client.testimonial"
            class="flex items-start gap-2 mt-2 bg-muted rounded-lg p-3"
          >
            <Avatar class="w-6 h-6">
              <AvatarFallback class="bg-primary text-primary-foreground text-xs">
                ⭐
              </AvatarFallback>
            </Avatar>
            <p class="text-sm text-foreground flex-1 italic">
              "{{ client.testimonial }}"
            </p>
          </div>
        </div>

        <button class="text-muted-foreground hover:text-foreground">
          <Icon name="lucide:more-horizontal" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <button
      class="w-full mt-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors border border-border rounded-xl"
    >
      Ver todos os projetos
      <Icon name="lucide:chevron-down" class="w-4 h-4 inline-block ml-1" />
    </button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const clients = ref([
  {
    id: 1,
    name: 'TechStart Brasil',
    initial: 'T',
    color: '#FF6B6B',
    type: 'Startup',
    emoji: '🚀',
    project: 'Plataforma SaaS de gestão empresarial',
    testimonial: 'Profissional excepcional! Entregou o projeto antes do prazo e superou nossas expectativas.'
  },
  {
    id: 2,
    name: 'E-commerce Plus',
    initial: 'E',
    color: '#4ECDC4',
    type: 'E-commerce',
    emoji: '🛒',
    project: 'Loja virtual completa com painel administrativo',
    testimonial: 'Trabalho impecável! A performance do site melhorou 300% após a otimização.'
  },
  {
    id: 3,
    name: 'Marketing Digital Pro',
    initial: 'M',
    color: '#95E1D3',
    type: 'Agência',
    emoji: '📊',
    project: 'Dashboard analytics com integrações de APIs',
    testimonial: null
  },
  {
    id: 4,
    name: 'FitApp Health',
    initial: 'F',
    color: '#F38181',
    type: 'App Mobile',
    emoji: '💪',
    project: 'Progressive Web App para treinos personalizados',
    testimonial: 'Comunicação clara, código limpo e resultado incrível!'
  },
  {
    id: 5,
    name: 'EduTech Solutions',
    initial: 'E',
    color: '#AA96DA',
    type: 'EdTech',
    emoji: '📚',
    project: 'Plataforma de cursos online com streaming',
    testimonial: null
  }
])
</script>
