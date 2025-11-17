<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Posts Recentes 📝</CardTitle>
    </CardHeader>

    <CardContent class="space-y-4">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />

      <ViewAllButton to="/posts" label="Ver todos os posts" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import PostCard from './components/PostCard.vue';

const { data: posts, error } = await useFetch('/api/posts/recent')

if (error.value) {
  console.error('Error loading posts:', error.value)
}
</script>
