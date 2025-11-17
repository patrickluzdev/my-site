import prisma from "../../../lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.projectCategory.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        icon: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    })

    return [
      {
        id: 0,
        name: 'Todos',
        slug: 'todos',
        description: 'Todos os projetos',
        icon: null,
        count: categories.reduce((acc, cat) => acc + cat._count.projects, 0),
      },
      ...categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        count: cat._count.projects,
      })),
    ]
  } catch (error) {
    console.error('Error fetching project categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch project categories',
    })
  }
})
