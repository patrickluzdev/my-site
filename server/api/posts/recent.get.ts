import prisma from "../../../lib/prisma"
import type { Post, User, PostCategory, Comment } from "@prisma/client"

type PostWithRelations = Post & {
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>
  category: Pick<PostCategory, 'id' | 'name' | 'slug' | 'color' | 'icon'> | null
  comments: Array<Comment & {
    user: Pick<User, 'name' | 'avatarUrl'> | null
  }>
}

export default defineEventHandler(async (event) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isPublished: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            icon: true,
          },
        },
        comments: {
          where: {
            isApproved: true,
          },
          select: {
            id: true,
            user: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 3,
        },
      },
      orderBy: [
        { isPinned: 'desc' },
        { publishedAt: 'desc' },
      ],
      take: 5,
    })

    return posts.map((post: PostWithRelations) => {
      const lastComment = post.comments[0]
      const commenters = post.comments.slice(0, 3).map((comment: Comment & { user: Pick<User, 'name' | 'avatarUrl'> | null }) => ({
        initial: comment.user?.name?.[0] || '?',
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      }))

      const timeAgo = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - new Date(date).getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor(diff / (1000 * 60 * 60))

        if (days > 0) return `há ${days} ${days === 1 ? 'dia' : 'dias'}`
        if (hours > 0) return `há ${hours}h`
        return 'há alguns minutos'
      }

      return {
        id: post.id.toString(),
        author: post.author.name,
        authorAvatar: post.author.avatarUrl,
        time: timeAgo(post.publishedAt || post.createdAt),
        category: post.category?.name || 'Geral',
        categorySlug: post.category?.slug,
        categoryColor: post.category?.color,
        pinned: post.isPinned,
        badge: post.category?.icon || 'lucide:message-circle',
        status: post.isPublished,
        title: post.title,
        slug: post.slug,
        description: post.description || post.content.substring(0, 150) + '...',
        likes: post.likesCount,
        comments: post.commentsCount,
        commenters,
        lastComment: lastComment ? timeAgo(lastComment.createdAt) : null,
        thumbnail: post.thumbnailUrl,
      }
    })
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch recent posts',
    })
  }
})
