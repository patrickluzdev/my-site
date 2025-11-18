import prisma from "../../../../lib/prisma"
import { z } from 'zod'

const updateSiteSettingSchema = z.object({
  key: z.string().min(1, 'Key é obrigatório').optional(),
  value: z.string().optional(),
  type: z.enum(['string', 'number', 'boolean', 'json']).optional(),
  description: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID inválido'
    })
  }

  const body = await readBody(event)
  const validatedData = updateSiteSettingSchema.parse(body)

  // Verificar se a configuração existe
  const existingSetting = await prisma.siteSetting.findUnique({
    where: { id }
  })

  if (!existingSetting) {
    throw createError({
      statusCode: 404,
      message: 'Configuração não encontrada'
    })
  }

  // Se a key foi alterada, verificar se já existe outra com a mesma key
  if (validatedData.key && validatedData.key !== existingSetting.key) {
    const duplicateSetting = await prisma.siteSetting.findUnique({
      where: { key: validatedData.key }
    })

    if (duplicateSetting) {
      throw createError({
        statusCode: 400,
        message: 'Já existe uma configuração com essa chave'
      })
    }
  }

  const setting = await prisma.siteSetting.update({
    where: { id },
    data: validatedData
  })

  return {
    data: setting
  }
})
