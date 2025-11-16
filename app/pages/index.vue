<template>
  <div class="min-h-screen pb-16">
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 space-y-6">
          <AboutSection />

          <PostsList />
        </div>

        <div class="lg:col-span-5 space-y-6">
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
