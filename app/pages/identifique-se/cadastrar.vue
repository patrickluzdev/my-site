<template>
  <div class="min-h-screen bg-background flex flex-col">
    <div class="w-full px-8 py-6 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center">
        <AppLogo size="md" />
      </NuxtLink>

      <div class="text-sm text-muted-foreground">
        Já tem uma conta?
        <NuxtLink to="/identifique-se/entrar" class="text-foreground underline hover:text-muted-foreground">
          Entrar
        </NuxtLink>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center px-4">
      <div class="w-full max-w-sm">
        <h1 class="text-3xl font-bold text-center mb-8 text-foreground">
          Criar conta
        </h1>

        <div class="space-y-4 mb-4">
          <Input
            v-model="form.name"
            type="text"
            placeholder="Nome completo"
            class="w-full h-12 text-base bg-white"
          />

          <Input
            v-model="form.email"
            type="email"
            placeholder="E-mail"
            class="w-full h-12 text-base bg-white"
          />

          <Input
            v-model="form.password"
            type="password"
            placeholder="Senha"
            class="w-full h-12 text-base bg-white"
          />

          <Input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            class="w-full h-12 text-base bg-white"
          />
        </div>

        <Button
          @click="handleSignup"
          class="w-full h-12 mb-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full transition-colors"
        >
          Criar conta
        </Button>

        <div class="flex items-center gap-4 mb-6">
          <div class="flex-1 h-px bg-border"></div>
          <span class="text-sm text-muted-foreground">ou cadastre-se com</span>
          <div class="flex-1 h-px bg-border"></div>
        </div>

        <div class="space-y-3">
          <Button
            @click="handleSocialSignup('google')"
            variant="outline"
            class="w-full h-12 justify-start bg-white hover:bg-gray-50 border border-border rounded-xl transition-colors"
          >
            <Icon name="logos:google-icon" class="w-5 h-5 mr-3" />
            <span class="text-foreground font-normal">Continuar com Google</span>
          </Button>

          <Button
            @click="handleSocialSignup('linkedin')"
            variant="outline"
            class="w-full h-12 justify-start bg-white hover:bg-gray-50 border border-border rounded-xl transition-colors"
          >
            <Icon name="logos:linkedin-icon" class="w-5 h-5 mr-3" />
            <span class="text-foreground font-normal">Continuar com LinkedIn</span>
          </Button>

          <Button
            @click="handleSocialSignup('github')"
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

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSignup = () => {
  console.log('Signup with:', form.value)
}

const handleSocialSignup = (provider: string) => {
  console.log('Signup with:', provider)
}
</script>
