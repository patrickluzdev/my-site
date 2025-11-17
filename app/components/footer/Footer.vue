<template>
  <footer class="bg-white border-t border-border mt-auto">
    <div class="max-w-6xl mx-auto px-4 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand / About -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <Avatar class="w-10 h-10 rounded-lg">
              <div class="w-full h-full bg-muted flex items-center justify-center">
                <AvatarImage
                  src="/logo.jpeg"
                  alt="Patrick Luz"
                  class="object-cover"
                />
                <AvatarFallback class="bg-muted text-foreground">
                  PL
                </AvatarFallback>
              </div>
            </Avatar>
            <span class="font-semibold text-lg">Patrick Luz</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Desenvolvedor Full Stack criando soluções web modernas e escaláveis.
          </p>
          <div class="flex items-center gap-2 text-sm">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span class="text-muted-foreground">Disponível para projetos</span>
          </div>
        </div>

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

        <!-- Contact & Social -->
        <div>
          <h3 class="font-semibold mb-4">Contato</h3>
          <ul class="space-y-3 mb-4">
            <li>
              <a href="mailto:contato@patrickluz.dev" class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Icon name="lucide:mail" class="w-4 h-4" />
                contato@patrickluz.dev
              </a>
            </li>
            <li>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Icon name="lucide:phone" class="w-4 h-4" />
                WhatsApp
              </a>
            </li>
          </ul>

          <div class="flex items-center gap-3">
            <a
              href="https://github.com/patrickluz"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/patrickluz"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Icon name="mdi:linkedin" class="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/patrickluz"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <Icon name="mdi:twitter" class="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/patrickluz"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Icon name="mdi:instagram" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Separator -->
      <Separator class="mb-6" />

      <!-- Bottom Footer -->
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
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { Separator } from '~/components/ui/separator'

const currentYear = new Date().getFullYear()
</script>
