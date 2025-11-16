<template>
  <Card class="hover:shadow-md transition-all duration-200 cursor-pointer group py-0!">
    <CardContent class="p-4">
      <div class="flex gap-4 items-center">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-3">
            <div class="relative">
              <Avatar class="w-10 h-10">
                <AvatarFallback class="bg-primary text-primary-foreground">
                  <Icon name="lucide:user" class="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div
                v-if="post.badge"
                class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent border-2 border-card flex items-center justify-center"
              >
                <Icon :name="post.badge" class="w-3 h-3 text-accent-foreground" />
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-sm truncate">
                  {{ post.author }}
                </h3>
                <Icon
                  v-if="post.pinned"
                  name="lucide:pin"
                  class="w-4 h-4 text-muted-foreground shrink-0"
                />
              </div>
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{{ post.time }}</span>
                <span>•</span>
                <span>{{ post.category }}</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <h2 class="text-base font-bold mb-2 flex items-center gap-2">
              <span
                v-if="post.status"
                class="w-2 h-2 rounded-full bg-primary flex-shrink-0"
              />
              {{ post.title }}
            </h2>
            <p class="text-sm text-muted-foreground line-clamp-2">
              {{ post.description }}
            </p>
          </div>

          <div class="flex items-center gap-4">
            <Button variant="ghost" size="sm" class="h-auto p-0 hover:bg-transparent">
              <Icon name="lucide:thumbs-up" class="w-4 h-4 mr-1.5" />
              <span class="text-sm">{{ post.likes }}</span>
            </Button>

            <Button variant="ghost" size="sm" class="h-auto p-0 hover:bg-transparent">
              <Icon name="lucide:message-square" class="w-4 h-4 mr-1.5" />
              <span class="text-sm">{{ post.comments }}</span>
            </Button>

            <div class="flex items-center -space-x-2">
              <Avatar
                v-for="(commenter, idx) in post.commenters"
                :key="idx"
                class="w-6 h-6 border-2 border-card"
              >
                <AvatarFallback
                  class="text-xs font-semibold text-white"
                  :style="{ backgroundColor: commenter.color }"
                >
                  {{ commenter.initial }}
                </AvatarFallback>
              </Avatar>
            </div>

            <a
              v-if="post.lastComment"
              href="#"
              class="text-sm text-primary hover:text-primary/80"
            >
              Novo comentário {{ post.lastComment }}
            </a>
          </div>
        </div>

        <div
          v-if="post.thumbnail"
          class="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden"
        >
          <img
            :src="post.thumbnail"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface Commenter {
  initial: string
  color: string
}

interface Post {
  id: number
  author: string
  time: string
  category: string
  pinned?: boolean
  badge?: string
  status?: boolean
  title: string
  description: string
  likes: number
  comments: number
  commenters: Commenter[]
  lastComment?: string
  thumbnail?: string | null
}

defineProps<{
  post: Post
}>()
</script>
