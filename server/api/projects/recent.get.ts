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
    const projects = await prisma.project.findMany({
      where: {
        isFeatured: true,
      },
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
        { displayOrder: 'asc' },
        { createdAt: 'desc' },
      ],
      take: 6,
    })

    return projects.map((project: ProjectWithRelations) => ({
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
      link: project.caseStudyUrl,
      stats: {
        stars: project.starsCount > 0 ? project.starsCount : undefined,
        users: project.usersCount,
        performance: project.performanceScore,
      },
    }))
  } catch (error) {
    console.error('Error fetching recent projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch recent projects',
    })
  }
})
