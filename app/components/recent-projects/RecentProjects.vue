<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Clientes & Projetos Recentes 🎯</CardTitle>
    </CardHeader>

    <CardContent class="space-y-4">

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
            class="mt-2 bg-muted rounded-lg p-3 border-primary"
          >
            <p class="text-sm text-foreground italic">
              "{{ client.testimonial }}"
            </p>
          </div>
        </div>

        <button class="text-muted-foreground hover:text-foreground">
          <Icon name="lucide:more-horizontal" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <ViewAllButton to="/projetos" label="Ver todos os projetos" />
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
