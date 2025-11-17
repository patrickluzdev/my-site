import prisma from "../../../lib/prisma"
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const validatedData = subscribeSchema.parse(body)

    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: {
        email: validatedData.email,
      },
    })

    if (existingSubscription) {
      if (existingSubscription.status === 'unsubscribed') {
        const updated = await prisma.newsletterSubscription.update({
          where: { email: validatedData.email },
          data: {
            status: 'active',
            name: validatedData.name || existingSubscription.name,
            unsubscribedAt: null,
          },
        })

        return {
          success: true,
          message: 'Inscrição reativada com sucesso!',
          subscription: {
            email: updated.email,
            name: updated.name,
          },
        }
      }

      throw createError({
        statusCode: 409,
        statusMessage: 'Este email já está inscrito na newsletter',
      })
    }

    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email: validatedData.email,
        name: validatedData.name || null,
        status: 'active',
        ipAddress: getRequestIP(event) || null,
        verifiedAt: new Date(),
      },
    })

    return {
      success: true,
      message: 'Inscrição realizada com sucesso!',
      subscription: {
        email: subscription.email,
        name: subscription.name,
      },
    }
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error)

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: error.errors[0].message,
      })
    }

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao processar inscrição',
    })
  }
})
