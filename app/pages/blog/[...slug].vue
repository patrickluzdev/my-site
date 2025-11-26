<template>
  <div v-if="post">
    <NuxtLink
      to="/blog"
      class="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-6"
    >
      <Icon name="lucide:arrow-left" class="w-4 h-4" />
      Voltar ao blog
    </NuxtLink>

    <div v-if="post.image" class="mb-6 rounded-lg overflow-hidden">
      <NuxtImg :src="post.image" :alt="post.title" class="w-full h-auto" />
    </div>
    <div
      v-else
      class="mb-6 rounded-lg overflow-hidden aspect-video bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center p-8"
    >
      <span class="text-stone-500 font-semibold text-2xl text-center">
        {{ post.title }}
      </span>
    </div>

    <header class="mb-8 pb-[0.3em] border-b border-[#d1d9e0b3]">
      <h1
        :id="slugify(post.title)"
        class="text-[2em] font-semibold text-stone-900 mb-2"
      >
        <a :href="`#${slugify(post.title)}`">
          {{ post.title }}
        </a>
      </h1>
      <div class="flex items-center gap-3 text-sm text-stone-500 mb-2">
        <time>{{ formatDate(post.date) }}</time>
        <span v-if="post.tags" class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-stone-300" />
          <span>{{ post.tags.join(", ") }}</span>
        </span>
      </div>
    </header>

    <article class="markdown-body">
      <ContentRenderer :value="post" />
    </article>
  </div>
</template>

<script setup lang="ts">
import "github-markdown-css/github-markdown-light.css";

definePageMeta({
  layout: "default",
});

const route = useRoute();
const slug = route.params.slug;
const path = Array.isArray(slug) ? `/blog/${slug.join("/")}` : `/blog/${slug}`;

const { data: post } = await useAsyncData(`blog-${path}`, () =>
  queryCollection("blog").path(path).first()
);

useSeoMeta({
  title: () =>
    post.value?.title
      ? `${post.value.title} - Patrick Luz`
      : "Blog - Patrick Luz",
  description: () => post.value?.description || "",
});

defineOgImage({
  component: "OgImageTemplate",
  props: {
    title: post.value?.title || "Blog",
    description: post.value?.description || "",
  },
});

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const formatDate = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
</script>

<style scoped>
.markdown-body {
  background-color: transparent;
}

.markdown-body :deep(ul) {
  list-style-type: disc;
}

.markdown-body :deep(ol) {
  list-style-type: decimal;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  color: #1c1917;
}

.markdown-body :deep(h1 a),
.markdown-body :deep(h2 a),
.markdown-body :deep(h3 a),
.markdown-body :deep(h4 a),
.markdown-body :deep(h5 a),
.markdown-body :deep(h6 a) {
  color: inherit;
  text-decoration: none;
}
</style>
