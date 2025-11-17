import prisma from "../../../lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.postCategory.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        color: true,
        icon: true,
        _count: {
          select: {
            posts: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    })

    return [
      {
        id: 0,
        name: 'Todos',
        slug: 'todos',
        description: 'Todos os posts',
        color: null,
        icon: null,
        count: categories.reduce((acc, cat) => acc + cat._count.posts, 0),
      },
      ...categories.map((cat) => ({
        id: Number(cat.id),
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        color: cat.color,
        icon: cat.icon,
        count: cat._count.posts,
      })),
    ]
  } catch (error) {
    console.error('Error fetching post categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch post categories',
    })
  }
})
