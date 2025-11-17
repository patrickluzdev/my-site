<template>
  <div class="min-h-screen bg-background flex flex-col">
    <div class="w-full px-8 py-6 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center">
        <AppLogo size="md" />
      </NuxtLink>

      <div class="text-sm text-muted-foreground">
        Não tem uma conta?
        <NuxtLink to="/identifique-se/cadastrar" class="text-foreground underline hover:text-muted-foreground">
          Cadastre-se
        </NuxtLink>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center px-4">
      <div class="w-full max-w-sm">
        <h1 class="text-3xl font-bold text-center mb-8 text-foreground">
          Bem-vindo de volta
        </h1>

        <div class="mb-4">
          <Input
            v-model="email"
            type="email"
            placeholder="E-mail"
            class="w-full h-12 text-base bg-white"
          />
        </div>

        <Button
          @click="handleEmailLogin"
          class="w-full h-12 mb-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full transition-colors"
        >
          Continuar com e-mail
        </Button>

        <div class="flex items-center gap-4 mb-6">
          <div class="flex-1 h-px bg-border"></div>
          <span class="text-sm text-muted-foreground">ou entre com</span>
          <div class="flex-1 h-px bg-border"></div>
        </div>

        <div class="space-y-3">
          <Button
            @click="handleSocialLogin('google')"
            variant="outline"
            class="w-full h-12 justify-start bg-white hover:bg-gray-50 border border-border rounded-xl transition-colors"
          >
            <Icon name="logos:google-icon" class="w-5 h-5 mr-3" />
            <span class="text-foreground font-normal">Continuar com Google</span>
          </Button>

          <Button
            @click="handleSocialLogin('linkedin')"
            variant="outline"
            class="w-full h-12 justify-start bg-white hover:bg-gray-50 border border-border rounded-xl transition-colors"
          >
            <Icon name="logos:linkedin-icon" class="w-5 h-5 mr-3" />
            <span class="text-foreground font-normal">Continuar com LinkedIn</span>
          </Button>

          <Button
            @click="handleSocialLogin('github')"
            variant="outline"
            class="w-full h-12 justify-start bg-white hover:bg-gray-50 border border-border rounded-xl transition-colors"
          >
            <Icon name="logos:github-icon" class="w-5 h-5 mr-3" />
            <span class="text-foreground font-normal">Continuar com GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import AppLogo from '~/components/app-logo/AppLogo.vue'

definePageMeta({
  layout: false
})

const email = ref('')

const handleEmailLogin = () => {
  console.log('Login with email:', email.value)
}

const handleSocialLogin = (provider: string) => {
  console.log('Login with:', provider)
}
</script>
