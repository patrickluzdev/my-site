<template>
  <Avatar :class="cn('rounded-lg', sizeClasses[size], props.class)">
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
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12'
}

const profile = {
  name: 'Patrick Luz',
  avatar: {
    src: '/logo.jpeg',
    fallback: 'PL'
  }
}
</script>
