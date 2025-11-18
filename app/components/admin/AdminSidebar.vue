<template>
  <aside class="w-64 border-r bg-background h-screen sticky top-0">
    <div class="p-6">
      <h2 class="text-lg font-semibold">Admin</h2>
    </div>

    <nav class="space-y-1 px-3">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        active-class="bg-accent text-accent-foreground"
      >
        <Icon :name="item.icon" class="h-5 w-5" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const menuItems = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: 'lucide:layout-dashboard'
  },
  {
    label: 'Site Settings',
    path: '/admin/site-settings',
    icon: 'lucide:settings'
  },
  {
    label: 'Posts',
    path: '/admin/posts',
    icon: 'lucide:file-text'
  },
  {
    label: 'Projects',
    path: '/admin/projects',
    icon: 'lucide:folder'
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: 'lucide:users'
  }
]
</script>
