<template>
  <div class="flex min-h-screen">
    <AdminSidebar />

    <main class="flex-1 overflow-auto">
      <div class="px-8 py-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
