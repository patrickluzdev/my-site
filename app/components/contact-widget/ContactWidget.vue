<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Vamos trabalhar juntos? 🚀</CardTitle>
      <div class="space-y-2 mt-3">
        <div class="flex items-center gap-2 text-sm">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span class="text-foreground font-medium">Disponível para projetos</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="lucide:clock" class="w-4 h-4" />
          <span>Resposta em até 24h</span>
        </div>
      </div>
    </CardHeader>

    <CardContent class="space-y-6">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <Input
          v-model="form.name"
          type="text"
          placeholder="Seu nome"
          required
          class="h-12 rounded-xl text-base"
          :disabled="isSubmitting"
        />
      </div>

      <div>
        <Input
          v-model="form.email"
          type="email"
          placeholder="Seu email"
          required
          class="h-12 rounded-xl text-base"
          :disabled="isSubmitting"
        />
      </div>

      <div>
        <Textarea
          v-model="form.message"
          placeholder="Conte-me sobre seu projeto..."
          required
          class="rounded-xl text-base min-h-[100px]"
          :disabled="isSubmitting"
        />
      </div>

      <Button
        type="submit"
        class="w-full h-14 text-lg rounded-full"
        size="lg"
        :disabled="isSubmitting"
      >
        <Icon v-if="!isSubmitting" name="lucide:send" class="w-4 h-4 mr-2" />
        <Icon v-else name="lucide:loader-2" class="w-4 h-4 mr-2 animate-spin" />
        {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
      </Button>
    </form>

    <div class="relative mb-6">
      <Separator />
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="px-4 bg-card text-sm text-muted-foreground">ou entre em contato via</span>
      </div>
    </div>

    <div class="space-y-3">
      <a
        :href="`https://wa.me/${whatsappNumber}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
      >
        <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:whatsapp" class="text-white" :size="iconSize"/>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm">WhatsApp</p>
          <p class="text-xs text-muted-foreground">Resposta rápida</p>
        </div>
        <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      </a>

      <a
        :href="`mailto:${contactEmail}`"
        class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
      >
        <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:email" class="text-white" :size="iconSize"/>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm">Email</p>
          <p class="text-xs text-muted-foreground truncate">{{ contactEmail }}</p>
        </div>
        <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      </a>

      <a
        :href="linkedinUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
      >
        <div class="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
          <Icon name="mdi:linkedin" class="text-white" :size="24"/>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm">LinkedIn</p>
          <p class="text-xs text-muted-foreground">Perfil profissional</p>
        </div>
        <Icon name="lucide:external-link" class="text-muted-foreground group-hover:text-foreground" :size="iconSize" />
      </a>
    </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const iconSize = 24

const { data: settings } = await useFetch('/api/settings')

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const whatsappNumber = computed(() => settings.value?.whatsapp_number?.value || '5511999999999')
const contactEmail = computed(() => settings.value?.contact_email?.value || 'contato@example.com')
const linkedinUrl = computed(() => settings.value?.linkedin_url?.value || 'https://linkedin.com/in/patrickluz')
const githubUrl = computed(() => settings.value?.github_url?.value || 'https://github.com/patrickluz')

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) return

  isSubmitting.value = true

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      },
    })

    toast.success('🎉 Mensagem enviada com sucesso!', {
      description: 'Retornaremos em breve. Obrigado pelo contato!',
    })

    // Limpar formulário
    form.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (error: any) {
    toast.error('Erro ao enviar mensagem', {
      description: error.data?.statusMessage || 'Erro ao enviar mensagem. Tente novamente.',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
