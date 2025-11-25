<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster position="top-center" :duration="4000" rich-colors />
</template>

<script setup lang="ts">
// Global SEO defaults
useHead({
  htmlAttrs: {
    lang: "pt-BR",
  },
  titleTemplate: "%s",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "Patrick Luz" },
    { name: "robots", content: "index, follow" },
    { property: "og:site_name", content: "Patrick Luz" },
    { property: "og:locale", content: "pt_BR" },
  ],
  link: [
    { rel: "canonical", href: "https://patrickluz.dev" },
    { rel: "preload", as: "image", href: "/logo.webp" },
  ],
});
</script>
