import prisma from "../../lib/prisma"
import type { SiteSetting } from "@prisma/client"

export default defineEventHandler(async (event) => {
  try {
    const settings = await prisma.siteSetting.findMany()

    const settingsObject = settings.reduce((acc: Record<string, any>, setting: SiteSetting) => {
      let value: any = setting.value

      if (setting.type === 'boolean') {
        value = setting.value === 'true'
      } else if (setting.type === 'number') {
        value = setting.value ? Number(setting.value) : null
      } else if (setting.type === 'json') {
        try {
          value = setting.value ? JSON.parse(setting.value) : null
        } catch (e) {
          value = setting.value
        }
      }

      acc[setting.key] = {
        value,
        type: setting.type,
        description: setting.description,
      }

      return acc
    }, {})

    return settingsObject
  } catch (error) {
    console.error('Error fetching site settings:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch site settings',
    })
  }
})
