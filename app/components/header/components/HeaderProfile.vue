<template>
    <div class="flex items-center gap-2 md:gap-3">
        <NuxtLink to="/">
            <AppLogo size="sm" class="md:w-10 md:h-10" />
        </NuxtLink>
        <div class="flex flex-col">
            <span class="font-semibold text-sm">{{ profile.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const profile = {
    name: 'Patrick Luz'
}
</script>
