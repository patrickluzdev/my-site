import prisma from "../../../../lib/prisma"

export default defineEventHandler(async () => {
  const settings = await prisma.siteSetting.findMany({
    orderBy: {
      key: 'asc'
    }
  })

  return {
    data: settings
  }
})
