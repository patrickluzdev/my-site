<template>
  <div>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4">Entre em Contato 📬</h1>
        <p class="text-muted-foreground text-xl max-w-2xl mx-auto">
          Vamos conversar sobre seu próximo projeto ou oportunidade de colaboração.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <div class="lg:col-span-3">
          <Card class="h-full">
            <CardHeader>
              <CardTitle class="text-2xl">Envie uma mensagem 💬</CardTitle>
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

            <CardContent>
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium mb-2">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    class="h-12 rounded-xl text-base"
                  />
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    class="h-12 rounded-xl text-base"
                  />
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium mb-2">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    placeholder="Sobre o que você quer falar?"
                    required
                    class="h-12 rounded-xl text-base"
                  />
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    v-model="form.message"
                    placeholder="Conte-me sobre seu projeto ou ideia..."
                    required
                    class="rounded-xl text-base min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  class="w-full h-14 text-lg rounded-full"
                  size="lg"
                  :disabled="isSubmitting"
                >
                  <Icon
                    v-if="!isSubmitting"
                    name="lucide:send"
                    class="w-5 h-5 mr-2"
                  />
                  <Icon
                    v-else
                    name="lucide:loader-2"
                    class="w-5 h-5 mr-2 animate-spin"
                  />
                  {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div class="lg:col-span-2 flex flex-col gap-6">
          <Card class="flex-1">
            <CardHeader>
              <CardTitle class="text-lg">Contato Direto 📞</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <a
                :href="contactLinks.whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
              >
                <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:whatsapp" class="text-white" :size="24"/>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm">WhatsApp</p>
                  <p class="text-xs text-muted-foreground">Resposta rápida</p>
                </div>
                <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </a>

              <a
                :href="`mailto:${contactLinks.email}`"
                class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
              >
                <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:email" class="text-white" :size="24"/>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm">Email</p>
                  <p class="text-xs text-muted-foreground truncate">{{ contactLinks.email }}</p>
                </div>
                <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </a>

              <a
                :href="contactLinks.linkedin"
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
                <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </a>
            </CardContent>
          </Card>

          <Card class="flex-1">
            <CardHeader>
              <CardTitle class="text-lg">Redes Sociais 🌐</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <a
                :href="contactLinks.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
              >
                <div class="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:github" class="text-white" :size="20"/>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm">GitHub</p>
                </div>
                <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </a>

              <a
                :href="contactLinks.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
              >
                <div class="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:twitter" class="text-white" :size="20"/>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm">Twitter</p>
                </div>
                <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </a>

              <a
                :href="contactLinks.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:instagram" class="text-white" :size="20"/>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm">Instagram</p>
                </div>
                <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card class="border-2">
        <CardHeader>
          <CardTitle class="text-2xl">Disponibilidade & Serviços ✨</CardTitle>
        </CardHeader>

        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <Icon name="lucide:briefcase" class="w-5 h-5 text-blue-500" />
                <h3 class="font-semibold">Tipos de Projeto</h3>
              </div>
              <div class="space-y-2.5 text-sm">
                <div class="flex items-start gap-2">
                  <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span class="text-muted-foreground">Aplicações web completas</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span class="text-muted-foreground">APIs e backend</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span class="text-muted-foreground">Automações e integrações</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span class="text-muted-foreground">Consultoria técnica</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span class="text-muted-foreground">Code review & mentoria</span>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <Icon name="lucide:clock" class="w-5 h-5 text-orange-500" />
                <h3 class="font-semibold">Modalidades</h3>
              </div>
              <div class="space-y-2.5 text-sm">
                <div class="flex items-start gap-2">
                  <Icon name="lucide:zap" class="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-foreground">Freelance</p>
                    <p class="text-xs text-muted-foreground">Projetos pontuais</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:calendar" class="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-foreground">Contratos</p>
                    <p class="text-xs text-muted-foreground">Dedicação mensal</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:users" class="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-foreground">Consultoria</p>
                    <p class="text-xs text-muted-foreground">Por hora ou pacote</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <Icon name="lucide:info" class="w-5 h-5 text-cyan-500" />
                <h3 class="font-semibold">Informações</h3>
              </div>
              <div class="space-y-2.5 text-sm">
                <div class="flex items-start gap-2">
                  <Icon name="lucide:message-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-foreground">Resposta em 24h</p>
                    <p class="text-xs text-muted-foreground">Dias úteis</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:globe" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-foreground">Remoto</p>
                    <p class="text-xs text-muted-foreground">Trabalho 100% remoto</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <Icon name="lucide:languages" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-foreground">Português (BR)</p>
                    <p class="text-xs text-muted-foreground">Fluência completa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'default'
})

// Buscar configurações do site
const { data: settings } = await useFetch('/api/settings')

// Links de contato com valores padrão
const contactLinks = computed(() => ({
  whatsapp: settings.value?.whatsapp?.value || 'https://wa.me/5511999999999',
  email: settings.value?.email?.value || 'contato@patrickluz.dev',
  linkedin: settings.value?.linkedin?.value || 'https://linkedin.com/in/patrickluz',
  github: settings.value?.github?.value || 'https://github.com/patrickluz',
  twitter: settings.value?.twitter?.value || 'https://twitter.com/patrickluz',
  instagram: settings.value?.instagram?.value || 'https://instagram.com/patrickluz'
}))

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) return

  isSubmitting.value = true

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
      }
    })

    toast.success('🎉 Mensagem enviada com sucesso!', {
      description: 'Retornaremos em breve. Obrigado pelo contato!',
    })

    // Limpar formulário
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error: any) {
    console.error('Erro ao enviar mensagem:', error)

    toast.error('Erro ao enviar mensagem', {
      description: error.data?.statusMessage || 'Tente novamente mais tarde.',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
