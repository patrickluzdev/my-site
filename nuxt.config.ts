import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SSG para GitHub Pages
  ssr: true,

  app: {
    baseURL: '/',
  },

  nitro: {
    preset: 'github-pages',
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
    '@nuxtjs/seo',
  ],

  // SEO configuration
  site: {
    url: 'https://patrickluz.dev',
    name: 'Patrick Luz',
    description: 'Engenheiro de Software especializado em aplicações web, APIs e automações.',
    defaultLocale: 'pt-BR',
  },

  seo: {
    meta: {
      twitterCard: 'summary_large_image',
    },
  },

  ogImage: {
    defaults: {
      component: 'OgImageTemplate',
    },
  },

  sitemap: {
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