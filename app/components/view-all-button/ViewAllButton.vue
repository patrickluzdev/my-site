<template>
  <NuxtLink
    :to="to"
    class="flex items-center justify-center gap-1 w-full mt-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors border border-border rounded-xl"
  >
    {{ label }}
    <Icon name="lucide:arrow-right" class="w-4 h-4" />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string
  label: string
}

defineProps<Props>()
</script>
