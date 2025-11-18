export const useSiteSettings = () => {
  // useState cria um estado global compartilhado entre cliente e servidor (SSR-friendly)
  const settings = useState<Record<string, any>>('site-settings', () => ({}))
  const loading = useState('site-settings-loading', () => false)

  const fetchSettings = async () => {
    // Só busca se ainda não tem dados
    if (Object.keys(settings.value).length > 0) {
      return settings.value
    }

    loading.value = true

    try {
      const { data } = await useAsyncData(
        'site-settings-data',
        () => $fetch('/api/settings'),
        {
          // Força SSR - renderiza no servidor
          server: true
        }
      )

      if (data.value) {
        settings.value = data.value
      }
    } catch (error) {
      console.error('Erro ao carregar site settings:', error)
    } finally {
      loading.value = false
    }

    return settings.value
  }

  // Helper para pegar um setting específico
  // Formato do API: { key: { value, type, description } }
  const getSetting = (key: string) => {
    return settings.value[key]?.value
  }

  // Helper para pegar um setting completo (com type e description)
  const getSettingFull = (key: string) => {
    return settings.value[key] || null
  }

  // Helper para verificar se um setting existe
  const hasSetting = (key: string) => {
    return key in settings.value
  }

  return {
    settings,
    loading,
    fetchSettings,
    getSetting,
    getSettingFull,
    hasSetting
  }
}
