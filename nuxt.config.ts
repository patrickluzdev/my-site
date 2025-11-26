import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  runtimeConfig: {
    public: {
      emailjsServiceId: process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      emailjsTemplateId: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      emailjsPublicKey: process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    },
  },

  app: {
    baseURL: '/',
  },

  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/', '/sobre', '/projetos', '/contato', '/blog'],
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
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    'nuxt-gtag',
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-light',
        },
      },
    },
  },

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || '',
    config: {
      anonymize_ip: true,
    },
  },

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