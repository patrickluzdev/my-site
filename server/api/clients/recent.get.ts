import prisma from "../../../lib/prisma"
import type { Client, Project } from "@prisma/client"

type ClientWithProject = Client & {
  project: Pick<Project, 'id' | 'title' | 'slug'> | null
}

export default defineEventHandler(async (event) => {
  try {
    const clients = await prisma.client.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        displayOrder: 'asc',
      },
      take: 5,
    })

    return clients.map((client: ClientWithProject) => ({
      id: client.id.toString(),
      name: client.name,
      initial: client.initial || client.name[0],
      color: client.avatarColor || '#FF6B6B',
      type: client.companyType || 'Cliente',
      emoji: client.emoji || '🚀',
      project: client.project?.title || 'Projeto',
      testimonial: client.testimonial,
      rating: client.rating ? Number(client.rating) : null,
    }))
  } catch (error) {
    console.error('Error fetching recent clients:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch recent clients',
    })
  }
})
