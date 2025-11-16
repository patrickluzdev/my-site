<template>
    <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm">
            {{ loginButton.label }}
        </Button>
    </div>
</template>

<script setup lang="ts">
const loginButton = {
    label: 'Entrar'
}
</script>
