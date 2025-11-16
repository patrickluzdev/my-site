<template>
    <nav class="hidden md:flex items-center gap-6 lg:gap-8">
        <NuxtLink
            v-for="link in navigation"
            :key="link.path"
            :to="link.path"
            :class="getLinkClasses(link.path)"
        >
            {{ link.label }}
        </NuxtLink>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const navigation = [
    { path: '/', label: 'Início' },
    { path: '/projetos', label: 'Projetos' },
    { path: '/posts', label: 'Posts' }
]

const getLinkClasses = (path: string) => {
    const baseClasses = 'text-sm font-medium transition-colors pb-1'
    const activeClasses = 'text-foreground border-b-2 border-primary'
    const inactiveClasses = 'text-muted-foreground hover:text-foreground'

    return `${baseClasses} ${route.path === path ? activeClasses : inactiveClasses}`
}
</script>
