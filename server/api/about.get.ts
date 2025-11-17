import prisma from "../../lib/prisma"
import type { Skill, WorkExperience, Education } from "@prisma/client"

export default defineEventHandler(async (event) => {
  try {
    // Buscar habilidades agrupadas por categoria
    const skills = await prisma.skill.findMany({
      orderBy: [
        { displayOrder: 'asc' },
        { name: 'asc' }
      ]
    })

    // Agrupar skills por categoria
    const skillsByCategory = skills.reduce((acc: Record<string, Skill[]>, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {})

    // Buscar experiências profissionais
    const workExperiences = await prisma.workExperience.findMany({
      orderBy: [
        { isCurrent: 'desc' },
        { startDate: 'desc' }
      ]
    })

    // Formatar experiências
    const formattedExperiences = workExperiences.map((exp: WorkExperience) => ({
      id: exp.id,
      position: exp.position,
      companyName: exp.companyName,
      location: exp.location,
      employmentType: exp.employmentType,
      description: exp.description,
      startDate: exp.startDate.toISOString(),
      endDate: exp.endDate ? exp.endDate.toISOString() : null,
      isCurrent: exp.isCurrent,
      period: formatPeriod(exp.startDate, exp.endDate, exp.isCurrent)
    }))

    // Buscar formação acadêmica
    const education = await prisma.education.findMany({
      orderBy: [
        { isCurrent: 'desc' },
        { startDate: 'desc' }
      ]
    })

    // Formatar educação
    const formattedEducation = education.map((edu: Education) => ({
      id: edu.id,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      institutionName: edu.institutionName,
      location: edu.location,
      description: edu.description,
      startDate: edu.startDate.toISOString(),
      endDate: edu.endDate ? edu.endDate.toISOString() : null,
      isCurrent: edu.isCurrent,
      period: formatPeriod(edu.startDate, edu.endDate, edu.isCurrent)
    }))

    return {
      skills: skillsByCategory,
      workExperiences: formattedExperiences,
      education: formattedEducation
    }
  } catch (error) {
    console.error('Error fetching about data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch about data',
    })
  }
})

function formatPeriod(startDate: Date, endDate: Date | null, isCurrent: boolean): string {
  const start = startDate.getFullYear()

  if (isCurrent) {
    return `${start} - Presente`
  }

  const end = endDate ? endDate.getFullYear() : 'Presente'
  return `${start} - ${end}`
}
