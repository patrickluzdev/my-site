<template>
  <div class="min-h-screen pb-16">
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">E aí! Sou o Patrick 👋</h1>
        <p class="text-muted-foreground text-xl">
          Desenvolvedor que ama transformar café em código e ideias em produtos incríveis.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 space-y-6">
          <RecentProjects />

          <PostsList />
        </div>

        <div class="lg:col-span-4">
          <div class="sticky top-20 space-y-6">
            <ContactWidget />
            <NewsletterWidget />
          </div>
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
