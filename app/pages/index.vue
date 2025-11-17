<template>
  <div class="min-h-screen pb-16">
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-12">
        <h1 class="text-4xl font-bold mb-4">Olá, sou Patrick Luz 👋</h1>
        <p class="text-muted-foreground text-xl">
          Desenvolvedor de software criando soluções web modernas e escaláveis.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 space-y-6">
          <RecentProjects />

          <PostsList />
        </div>

        <div class="lg:col-span-4 space-y-6">
          <ContactWidget />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
