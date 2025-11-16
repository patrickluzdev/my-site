<template>
  <div>
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6">Projetos</h1>
      <p class="text-muted-foreground mb-8">
        Aqui você encontra meus principais projetos e trabalhos.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Exemplo de card de projeto -->
        <div class="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 class="font-semibold text-lg mb-2">Projeto em breve</h3>
          <p class="text-sm text-muted-foreground">
            Em breve você verá meus projetos aqui.
          </p>
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
