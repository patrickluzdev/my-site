import prisma from "../../../../lib/prisma"

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID inválido'
    })
  }

  const setting = await prisma.siteSetting.findUnique({
    where: { id }
  })

  if (!setting) {
    throw createError({
      statusCode: 404,
      message: 'Configuração não encontrada'
    })
  }

  return {
    data: setting
  }
})
