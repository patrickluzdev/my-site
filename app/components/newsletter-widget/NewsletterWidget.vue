<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Newsletter 📧</CardTitle>
      <CardDescription>
        Receba conteúdos exclusivos sobre desenvolvimento, dicas e novidades direto no seu email.
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-4">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <Input
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            required
            class="h-12 rounded-xl text-base"
          />
        </div>

        <Button
          type="submit"
          class="w-full h-12 text-base rounded-full"
          size="lg"
          :disabled="isSubmitting"
        >
          <Icon v-if="!isSubmitting" name="lucide:mail" class="w-4 h-4 mr-2" />
          <Icon v-else name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
          {{ isSubmitting ? 'Inscrevendo...' : 'Inscrever-se' }}
        </Button>
      </form>

      <div class="space-y-2 pt-2">
        <div class="flex items-start gap-2 text-xs text-muted-foreground">
          <Icon name="lucide:check" class="w-3 h-3 mt-0.5 flex-shrink-0 text-green-500" />
          <span>Artigos e tutoriais exclusivos</span>
        </div>
        <div class="flex items-start gap-2 text-xs text-muted-foreground">
          <Icon name="lucide:check" class="w-3 h-3 mt-0.5 flex-shrink-0 text-green-500" />
          <span>Dicas de desenvolvimento</span>
        </div>
        <div class="flex items-start gap-2 text-xs text-muted-foreground">
          <Icon name="lucide:check" class="w-3 h-3 mt-0.5 flex-shrink-0 text-green-500" />
          <span>Sem spam, cancele quando quiser</span>
        </div>
      </div>

      <Separator />

      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon name="lucide:shield-check" class="w-4 h-4 text-green-500" />
        <span>Seus dados estão seguros e nunca serão compartilhados</span>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

const email = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulação de envio (aqui você pode integrar com seu serviço de newsletter)
  await new Promise(resolve => setTimeout(resolve, 1500))

  console.log('Newsletter subscription:', email.value)

  // Aqui você pode adicionar integração com:
  // - Mailchimp
  // - ConvertKit
  // - SendGrid
  // - etc.

  alert(`Obrigado por se inscrever! 🎉\n\nEm breve você receberá conteúdos exclusivos em ${email.value}`)

  email.value = ''
  isSubmitting.value = false
}
</script>
