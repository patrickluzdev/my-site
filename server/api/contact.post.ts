import prisma from "../../lib/prisma"
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().optional(),
  message: z.string()
    .max(5000, 'Mensagem muito longa (máximo 5000 caracteres)'),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = contactSchema.parse(body)

    const headers = getHeaders(event)
    const userAgent = headers['user-agent'] || null
    const ipAddress = getRequestIP(event) || null

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || null,
        message: validatedData.message,
        ipAddress,
        userAgent,
        status: 'new',
      },
    })

    return {
      success: true,
      message: 'Mensagem enviada com sucesso! Retornaremos em breve.',
      contact: {
        id: contactMessage.id.toString(),
        name: contactMessage.name,
        email: contactMessage.email,
      },
    }
  } catch (error: any) {
    console.error('Error creating contact message:', error)

    if (error instanceof z.ZodError) {
      const firstError = error.errors?.[0]
      throw createError({
        statusCode: 400,
        statusMessage: firstError?.message || 'Dados inválidos',
      })
    }

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao enviar mensagem',
    })
  }
})
