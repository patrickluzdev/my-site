<template>
  <NuxtLink
    :to="`/posts/${post.slug || post.id}`"
    class="block"
  >
    <Card class="hover:shadow-md transition-all duration-200 cursor-pointer group py-0!">
      <CardContent class="p-3 sm:p-4">
        <div class="flex gap-3 sm:gap-4 items-start sm:items-center">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-3">
            <div class="relative">
              <Avatar class="w-10 h-10">
                <AvatarImage v-if="post.authorAvatar" :src="post.authorAvatar" :alt="post.author" />
                <AvatarFallback class="bg-primary text-primary-foreground">
                  {{ post.author.charAt(0).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <div
                v-if="post.badge && isValidBadge(post.badge)"
                class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent border-2 border-card flex items-center justify-center"
              >
                <Icon :name="formatBadgeName(post.badge)" class="w-3 h-3 text-accent-foreground" />
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
            <p v-if="post.description" class="text-sm text-muted-foreground line-clamp-2">
              {{ post.description }}
            </p>
          </div>

          <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
            <Button variant="ghost" size="sm" class="h-auto p-0 hover:bg-transparent">
              <Icon name="lucide:thumbs-up" class="w-4 h-4 mr-1.5" />
              <span class="text-sm">{{ post.likes }}</span>
            </Button>

            <Button variant="ghost" size="sm" class="h-auto p-0 hover:bg-transparent">
              <Icon name="lucide:message-square" class="w-4 h-4 mr-1.5" />
              <span class="text-sm">{{ post.comments }}</span>
            </Button>

            <div v-if="post.commenters && post.commenters.length > 0" class="flex items-center -space-x-2">
              <Avatar
                v-for="(commenter, idx) in post.commenters.slice(0, 3)"
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

            <span
              v-if="post.lastComment"
              class="text-xs sm:text-sm text-muted-foreground hidden sm:inline"
            >
              Novo comentário {{ post.lastComment }}
            </span>
          </div>
        </div>

        <div
          v-if="post.thumbnail"
          class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden bg-muted"
        >
          <img
            :src="post.thumbnail"
            :alt="post.title"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
          />
        </div>
      </div>
    </CardContent>
  </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Commenter {
  initial: string
  color: string
}

interface Post {
  id: string | number
  author: string
  authorAvatar?: string | null
  time: string
  category: string
  categorySlug?: string
  categoryColor?: string | null
  categoryIcon?: string | null
  pinned?: boolean
  badge?: string | null
  status?: boolean
  title: string
  description: string | null
  likes: number
  comments: number
  commenters: Commenter[]
  lastComment?: string | null
  thumbnail?: string | null
  slug?: string
}

defineProps<{
  post: Post
}>()

const { isValidIcon: isValidBadge, formatIconName: formatBadgeName } = useIconFormatter()
</script>
