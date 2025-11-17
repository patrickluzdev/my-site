import prisma from "../../../lib/prisma"
import type { Post, PostCategory, User, Comment } from "@prisma/client"

type PostWithRelations = Post & {
  author: Pick<User, 'id' | 'name' | 'email' | 'avatarUrl'> | null
  category: Pick<PostCategory, 'id' | 'name' | 'slug' | 'color' | 'icon'> | null
  _count: {
    comments: number
    likes: number
  }
  comments: Array<Pick<Comment, 'id' | 'authorName' | 'createdAt'>>
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const cursor = query.cursor ? BigInt(query.cursor as string) : undefined
    const limit = Math.min(Number(query.limit) || 12, 50)
    const category = query.category as string | undefined
    const search = query.search as string | undefined

    const whereClause: any = {
      isPublished: true
    }

    if (category && category !== 'Todos') {
      const categoryRecord = await prisma.postCategory.findUnique({
        where: { slug: category.toLowerCase().replace(/\s+/g, '-') },
        select: { id: true }
      })

      if (categoryRecord) {
        whereClause.categoryId = categoryRecord.id
      }
    }

    if (search && search.trim()) {
      whereClause.OR = [
        {
          title: {
            contains: search.trim(),
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search.trim(),
            mode: 'insensitive'
          }
        }
      ]
    }

    if (cursor) {
      whereClause.id = {
        lt: cursor
      }
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
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
          select: {
            id: true,
            authorName: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 3,
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: [
        { isPinned: 'desc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit + 1,
    })

    const hasNextPage = posts.length > limit
    const items = hasNextPage ? posts.slice(0, -1) : posts
    const nextCursor = hasNextPage ? items[items.length - 1].id.toString() : null

    const timeAgo = (date: Date): string => {
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 60) return 'há alguns segundos'
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`
      }
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`
      }
      const days = Math.floor(diffInSeconds / 86400)
      return `há ${days} ${days === 1 ? 'dia' : 'dias'}`
    }

    const getInitial = (name: string | null): string => {
      if (!name || name.trim() === '') return '?'
      return name.charAt(0).toUpperCase()
    }

    const getColorFromName = (name: string | null): string => {
      const colors = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA']
      if (!name || name.trim() === '') return colors[0]
      const index = name.charCodeAt(0) % colors.length
      return colors[index]
    }

    const formattedPosts = items.map((post: PostWithRelations) => ({
      id: post.id.toString(),
      title: post.title,
      slug: post.slug,
      description: post.description,
      thumbnail: post.thumbnailUrl,
      author: post.author?.name || 'Autor Desconhecido',
      authorAvatar: post.author?.avatarUrl,
      time: timeAgo(post.publishedAt || post.createdAt),
      category: post.category?.name || 'Geral',
      categorySlug: post.category?.slug,
      categoryColor: post.category?.color,
      categoryIcon: post.category?.icon,
      pinned: post.isPinned,
      badge: post.badge,
      likes: post._count.likes,
      comments: post._count.comments,
      commenters: post.comments.slice(0, 3).map(comment => ({
        initial: getInitial(comment.authorName),
        color: getColorFromName(comment.authorName)
      })),
      lastComment: post.comments.length > 0 ? timeAgo(post.comments[0].createdAt) : null,
      status: post.isPublished,
    }))

    return {
      data: formattedPosts,
      pagination: {
        nextCursor,
        hasNextPage,
      },
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch posts',
    })
  }
})
