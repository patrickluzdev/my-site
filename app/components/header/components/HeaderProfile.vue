<template>
    <div class="flex items-center gap-2 md:gap-3">
        <Avatar :class="profile.avatar.class">
            <div class="w-full h-full bg-muted flex items-center justify-center">
                <AvatarImage
                    :src="profile.avatar.src"
                    :alt="profile.name"
                    class="object-cover"
                    loading="eager"
                />
                <AvatarFallback class="bg-muted text-foreground">
                    {{ profile.avatar.fallback }}
                </AvatarFallback>
            </div>
        </Avatar>
        <div class="flex flex-col">
            <span class="font-semibold text-sm">{{ profile.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const profile = {
    name: 'Patrick Luz',
    avatar: {
        src: '/logo.jpeg',
        fallback: 'PL',
        class: 'w-8 h-8 md:w-10 md:h-10 rounded-lg'
    }
}
</script>
