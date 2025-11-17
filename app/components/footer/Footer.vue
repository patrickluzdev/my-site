<template>
  <footer class="bg-white border-t border-border mt-auto">
    <div class="max-w-6xl mx-auto px-4 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <!-- Navigation -->
        <div>
          <h3 class="font-semibold mb-4">Navegação</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Início
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sobre" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projetos" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projetos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/posts" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Posts
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contato" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="font-semibold mb-4">Serviços</h3>
          <ul class="space-y-3">
            <li class="text-sm text-muted-foreground">
              Desenvolvimento Web
            </li>
            <li class="text-sm text-muted-foreground">
              Automações e Integrações
            </li>
            <li class="text-sm text-muted-foreground">
              Consultoria Técnica
            </li>
            <li class="text-sm text-muted-foreground">
              Trabalho Freelance
            </li>
            <li class="text-sm text-muted-foreground">
              Mentorias
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Contato</h3>
          <ul class="space-y-3 mb-4">
            <li>
              <a href="mailto:contato@patrickluz.dev" class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Icon name="mdi:email" class="w-5 h-5 text-blue-500" :size="iconSize"/>
                contato@patrickluz.dev
              </a>
            </li>
            <li>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Icon name="mdi:whatsapp" class="w-5 h-5 text-green-500" :size="iconSize" />
                WhatsApp
              </a>
            </li>
          </ul>

          <div class="flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:scale-110 transition-transform"
              :aria-label="social.name"
            >
              <Icon :name="social.icon" :size="iconSize" :class="social.colorClass" />
            </a>
          </div>
        </div>
      </div>

      <Separator class="mb-6" />

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          © {{ currentYear }} Patrick Luz. Todos os direitos reservados.
        </p>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            Feito com ❤️ usando
            <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
              Nuxt
            </a>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const iconSize = 24
import { Separator } from '~/components/ui/separator'

const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/patrickluz',
    icon: 'mdi:github',
    colorClass: 'text-gray-800 dark:text-gray-200'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/patrickluz',
    icon: 'mdi:linkedin',
    colorClass: 'text-blue-600'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/patrickluz',
    icon: 'mdi:twitter',
    colorClass: 'text-sky-500'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/patrickluz',
    icon: 'mdi:instagram',
    colorClass: 'text-pink-600'
  }
]
</script>
