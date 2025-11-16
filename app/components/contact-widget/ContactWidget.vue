<template>
  <Card class="sticky top-20">
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
        />
      </div>

      <div>
        <Input
          v-model="form.email"
          type="email"
          placeholder="Seu email"
          required
          class="h-12 rounded-xl text-base"
        />
      </div>

      <div>
        <Textarea
          v-model="form.message"
          placeholder="Conte-me sobre seu projeto..."
          required
          class="rounded-xl text-base min-h-[100px]"
        />
      </div>

      <Button
        type="submit"
        class="w-full h-14 text-lg rounded-full"
        size="lg"
      >
        Enviar Mensagem
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
        href="https://wa.me/5511999999999"
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
        href="mailto:contato@patrickluz.dev"
        class="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors group"
      >
        <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <Icon name="mdi:email" class="text-white" :size="iconSize"/>
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
        <Icon name="lucide:external-link" class="text-muted-foreground group-hover:text-foreground" :size="iconSize" />
      </a>
    </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const iconSize = 24

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form.value)

  const message = `Olá! Meu nome é ${form.value.name}. ${form.value.message}`
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')

  form.value = {
    name: '',
    email: '',
    message: ''
  }
}
</script>
