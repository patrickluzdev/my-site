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
const { data: clients, error } = await useFetch('/api/clients/recent')

if (error.value) {
  console.error('Error loading clients:', error.value)
}
</script>
