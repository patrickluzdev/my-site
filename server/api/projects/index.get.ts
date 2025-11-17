import prisma from "../../../lib/prisma"
import type { Project, ProjectCategory, Technology } from "@prisma/client"

type ProjectWithRelations = Project & {
  category: Pick<ProjectCategory, 'id' | 'name' | 'slug' | 'icon'> | null
  technologies: Array<{
    technology: Pick<Technology, 'id' | 'name' | 'slug' | 'color'>
  }>
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const cursor = query.cursor ? BigInt(query.cursor as string) : undefined
    const limit = Math.min(Number(query.limit) || 12, 50)
    const category = query.category as string | undefined

    const whereClause: any = {}

    if (category && category !== 'Todos') {
      const categoryRecord = await prisma.projectCategory.findUnique({
        where: { slug: category.toLowerCase().replace(/\s+/g, '-') },
        select: { id: true }
      })

      if (categoryRecord) {
        whereClause.categoryId = categoryRecord.id
      }
    }

    if (cursor) {
      whereClause.id = {
        lt: cursor
      }
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
          },
        },
        technologies: {
          select: {
            technology: {
              select: {
                id: true,
                name: true,
                slug: true,
                color: true,
              },
            },
          },
          orderBy: {
            displayOrder: 'asc',
          },
          take: 8,
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
      take: limit + 1,
    })

    const hasNextPage = projects.length > limit
    const items = hasNextPage ? projects.slice(0, -1) : projects
    const nextCursor = hasNextPage ? items[items.length - 1].id.toString() : null

    const formattedProjects = items.map((project: ProjectWithRelations) => ({
      id: project.id.toString(),
      title: project.title,
      slug: project.slug,
      description: project.description,
      image: project.imageUrl,
      technologies: project.technologies.map((pt) => pt.technology.name),
      category: project.category?.name || 'Geral',
      categorySlug: project.category?.slug,
      status: project.status === 'concluido' ? 'Concluído' :
              project.status === 'em-andamento' ? 'Em andamento' :
              'Em desenvolvimento',
      featured: project.isFeatured,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      stats: {
        stars: project.starsCount > 0 ? project.starsCount : undefined,
        users: project.usersCount,
        performance: project.performanceScore,
      },
    }))

    return {
      data: formattedProjects,
      pagination: {
        nextCursor,
        hasNextPage,
      },
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects',
    })
  }
})
