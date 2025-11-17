const iconMapping: Record<string, string> = {
  'Popular': 'lucide:trending-up',
  'Trending': 'lucide:trending-up',
  'New': 'lucide:sparkles',
  'Hot': 'lucide:flame',
  'Featured': 'lucide:star',
  'All': 'lucide:grid',
  'Todos': 'lucide:grid',
  'Anúncio': 'lucide:megaphone',
  'Anúncios': 'lucide:megaphone',
  'Discussão': 'lucide:message-circle',
  'Discussão geral': 'lucide:message-circle',
  'Tutorial': 'lucide:book-open',
  'Tutoriais': 'lucide:book-open',
  'Project': 'lucide:folder',
  'Projetos': 'lucide:folder',
  'Dicas': 'lucide:lightbulb',
  'Announcement': 'lucide:megaphone',
  'Discussion': 'lucide:message-circle',
  'Tips': 'lucide:lightbulb',
  'Important': 'lucide:alert-circle',
  'Question': 'lucide:help-circle',
  'Solved': 'lucide:check-circle',
  'Locked': 'lucide:lock',
  'Pinned': 'lucide:pin',
}

export const useIconFormatter = () => {
  const isValidIcon = (iconName: string | null | undefined): boolean => {
    if (!iconName) return false
    if (iconName.includes(':')) return true
    if (iconMapping[iconName]) return true
    if (/^[a-z][a-z0-9-]*[a-z0-9]$/.test(iconName)) return true
    return false
  }

  const formatIconName = (iconName: string | null | undefined): string => {
    if (!iconName) return ''
    if (iconName.includes(':')) return iconName
    if (iconMapping[iconName]) return iconMapping[iconName]
    if (/^[a-z][a-z0-9-]*[a-z0-9]$/.test(iconName)) return `lucide:${iconName}`
    console.warn(`[useIconFormatter] Invalid icon name: ${iconName}`)
    return ''
  }

  const addIconMapping = (name: string, icon: string) => {
    iconMapping[name] = icon
  }

  return {
    isValidIcon,
    formatIconName,
    addIconMapping,
    iconMapping,
  }
}
