import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SSR habilitado (padrão, mas explícito para clareza)
  ssr: true,

  // Pré-renderizar todas as rotas no build (SSG)
  nitro: {
    prerender: {
      routes: ['/', '/sobre', '/projetos', '/contato'],
      crawlLinks: true,
    },
  },

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
  ],

  // Sitemap configuration
  site: {
    url: 'https://patrickluz.dev',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/admin/**'],
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },
  icon: {
    serverBundle: {
      collections: ['lucide', 'vscode-icons', 'skill-icons', 'simple-icons']
    }
  }
})