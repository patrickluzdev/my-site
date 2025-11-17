<template>
    <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" as-child>
            <NuxtLink to="/identifique-se/entrar">
                {{ loginButton.label }}
            </NuxtLink>
        </Button>
    </div>
</template>

<script setup lang="ts">
const loginButton = {
    label: 'Entrar'
}
</script>
