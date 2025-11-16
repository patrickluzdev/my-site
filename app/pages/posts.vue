<template>
  <div>
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6">Posts</h1>
      <p class="text-muted-foreground mb-8">
        Artigos, tutoriais e conteúdos sobre desenvolvimento.
      </p>

      <div class="space-y-6">
        <article class="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 class="font-semibold text-xl mb-2">Primeiro post em breve</h2>
          <p class="text-sm text-muted-foreground mb-4">
            Em breve você verá meus posts aqui.
          </p>
          <time class="text-xs text-muted-foreground">Data: A definir</time>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
