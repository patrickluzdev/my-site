export default defineNuxtPlugin(async () => {
  const { fetchSettings } = useSiteSettings()

  // Pré-carrega os settings na inicialização da aplicação
  // Será executado no servidor (SSR) e no cliente
  await fetchSettings()
})
