<template>
  <div>
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-stone-900 mb-1">Blog</h1>
      <p class="text-stone-500 italic text-[15px]">
        Artigos sobre desenvolvimento e tecnologia
      </p>
    </header>

    <p class="text-stone-600 leading-relaxed mb-8 text-[15px]">
      Compartilho aqui o que aprendo sobre desenvolvimento de software,
      tecnologias e boas práticas.
    </p>

    <div class="space-y-6">
      <article
        v-for="post in posts"
        :key="post.path"
        class="rounded-xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all bg-white overflow-hidden"
      >
        <NuxtLink :to="post.path" class="block">
          <div v-if="post.image" class="aspect-video overflow-hidden">
            <NuxtImg
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center p-6"
          >
            <span class="text-stone-500 font-medium text-center line-clamp-3">
              {{ post.title }}
            </span>
          </div>

          <div class="p-5">
            <div class="flex items-start justify-between gap-4 mb-2">
              <h2
                class="font-medium text-stone-800 text-[15px] hover:text-stone-600 transition-colors"
              >
                {{ post.title }}
              </h2>
              <time class="shrink-0 text-xs text-stone-400">
                {{ formatDate(post.date) }}
              </time>
            </div>

            <p class="text-sm text-stone-500 mb-4 leading-relaxed line-clamp-2">
              {{ post.description }}
            </p>

            <div v-if="post.tags" class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <div v-if="posts?.length === 0" class="text-center py-16 text-stone-400">
      <Icon name="lucide:file-text" class="w-10 h-10 mx-auto mb-3 opacity-50" />
      <p class="text-sm">Nenhum post publicado ainda.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "Blog - Patrick Luz",
  description:
    "Artigos sobre desenvolvimento de software, tecnologias e boas práticas.",
  keywords: "blog, desenvolvimento, programação, vue, nuxt, typescript",
});

defineOgImage({
  component: "OgImageTemplate",
  props: {
    title: "Blog",
    description: "Artigos sobre desenvolvimento de software e tecnologia.",
  },
});

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").all()
);

const formatDate = (date: Date | string) => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
</script>
