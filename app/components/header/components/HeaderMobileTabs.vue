<template>
    <nav class="md:hidden bg-white border-b border-border">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex items-center justify-around">
                <NuxtLink
                    v-for="link in navigation"
                    :key="link.path"
                    :to="link.path"
                    :class="getMobileTabClasses(link.path)"
                >
                    {{ link.label }}
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const navigation = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/projetos', label: 'Projetos' },
    { path: '/posts', label: 'Posts' },
    { path: '/contato', label: 'Contato' }
]

const getMobileTabClasses = (path: string) => {
    const baseClasses = 'flex-1 text-center py-3 text-sm font-medium transition-colors'
    const activeClasses = 'text-foreground border-b-2 border-primary'
    const inactiveClasses = 'text-muted-foreground'

    return `${baseClasses} ${route.path === path ? activeClasses : inactiveClasses}`
}
</script>
