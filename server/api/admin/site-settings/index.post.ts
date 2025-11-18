import prisma from "../../../../lib/prisma"
import { z } from 'zod'

const createSiteSettingSchema = z.object({
  key: z.string().min(1, 'Key é obrigatório'),
  value: z.string().optional(),
  type: z.enum(['string', 'number', 'boolean', 'json']).default('string'),
  description: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const validatedData = createSiteSettingSchema.parse(body)

  // Verificar se já existe uma configuração com a mesma key
  const existingSetting = await prisma.siteSetting.findUnique({
    where: { key: validatedData.key }
  })

  if (existingSetting) {
    throw createError({
      statusCode: 400,
      message: 'Já existe uma configuração com essa chave'
    })
  }

  const setting = await prisma.siteSetting.create({
    data: validatedData
  })

  return {
    data: setting
  }
})
