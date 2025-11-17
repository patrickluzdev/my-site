<template>
  <div>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4">Entre em Contato 📬</h1>
        <p class="text-muted-foreground text-xl max-w-2xl mx-auto">
          Vamos conversar sobre seu próximo projeto ou oportunidade de colaboração.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-3">
          <Card>
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
                >
                  <Icon name="lucide:send" class="w-5 h-5 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div class="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Contato Direto</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <a
                href="https://wa.me/5511999999999"
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
                href="mailto:contato@patrickluz.dev"
                class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
              >
                <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:email" class="text-white" :size="24"/>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm">Email</p>
                  <p class="text-xs text-muted-foreground truncate">contato@patrickluz.dev</p>
                </div>
                <Icon name="lucide:external-link" class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </a>

              <a
                href="https://linkedin.com/in/patrickluz"
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

          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <a
                href="https://github.com/patrickluz"
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
                href="https://twitter.com/patrickluz"
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
                href="https://instagram.com/patrickluz"
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

          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent class="space-y-3 text-sm text-muted-foreground">
              <div class="flex items-start gap-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Projetos de desenvolvimento web</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Automações e integrações</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Consultoria técnica</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Trabalho freelance</span>
              </div>
              <div class="flex items-start gap-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>Mentorias e ensino</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'

definePageMeta({
  layout: 'default'
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form.value)

  const message = `Olá! Meu nome é ${form.value.name}.\n\nAssunto: ${form.value.subject}\n\n${form.value.message}\n\nEmail: ${form.value.email}`
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')

  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>
