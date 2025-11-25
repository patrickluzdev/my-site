<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster position="top-center" :duration="4000" rich-colors />
</template>

<script setup lang="ts">
const route = useRoute();
const siteUrl = "https://patrickluz.dev";

// Canonical dinâmica por página
const canonicalUrl = computed(() => {
  const path = route.path === "/" ? "" : route.path;
  return `${siteUrl}${path}`;
});

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
    { rel: "canonical", href: canonicalUrl },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "preload", as: "image", href: "/logo.webp" },
  ],
});

// Schema.org - Dados estruturados para Google
useSchemaOrg([
  defineWebSite({
    name: "Patrick Luz",
    url: siteUrl,
    description:
      "Engenheiro de Software especializado em aplicações web, APIs e automações.",
  }),
  definePerson({
    name: "Patrick Luz",
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
    jobTitle: "Engenheiro de Software",
    worksFor: {
      "@type": "Organization",
      name: "Mercado Livre",
    },
    sameAs: [
      "https://github.com/patrickluzdev",
      "https://www.linkedin.com/in/patrickluzdev",
    ],
  }),
]);
</script>
