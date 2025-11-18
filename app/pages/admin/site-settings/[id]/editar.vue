<template>
  <div>
    <div class="mb-6">
      <NuxtLink to="/admin/site-settings" class="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
        <Icon name="lucide:arrow-left" class="h-4 w-4" />
        Voltar
      </NuxtLink>
      <h1 class="text-3xl font-bold">Editar Configuração</h1>
      <p class="text-muted-foreground mt-1">Atualize a configuração do site</p>
    </div>

    <Card v-if="!pending">
      <CardContent class="pt-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <Label for="key">Chave *</Label>
            <Input
              id="key"
              v-model="form.key"
              placeholder="Ex: site_name"
              required
            />
            <p class="text-sm text-muted-foreground">
              Identificador único da configuração
            </p>
          </div>

          <div class="space-y-2">
            <Label for="value">Valor</Label>
            <Textarea
              id="value"
              v-model="form.value"
              placeholder="Digite o valor da configuração"
              rows="4"
            />
          </div>

          <div class="space-y-2">
            <Label for="type">Tipo</Label>
            <Select v-model="form.type">
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="description">Descrição</Label>
            <Textarea
              id="description"
              v-model="form.description"
              placeholder="Descrição da configuração (opcional)"
              rows="3"
            />
          </div>

          <div class="flex gap-4">
            <Button type="submit" :disabled="loading">
              <Icon v-if="loading" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              <Icon v-else name="lucide:save" class="mr-2 h-4 w-4" />
              {{ loading ? 'Salvando...' : 'Salvar' }}
            </Button>
            <NuxtLink to="/admin/site-settings">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </NuxtLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <Card v-else>
      <CardContent class="p-8 text-center">
        <p class="text-muted-foreground">Carregando...</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id)

const { data, pending } = await useFetch(`/api/admin/site-settings/${id.value}`)

const setting = computed(() => data.value?.data)

const form = reactive({
  key: '',
  value: '',
  type: 'string',
  description: ''
})

// Preencher o formulário com os dados da configuração
watch(setting, (newSetting) => {
  if (newSetting) {
    form.key = newSetting.key
    form.value = newSetting.value || ''
    form.type = newSetting.type
    form.description = newSetting.description || ''
  }
}, { immediate: true })

const loading = ref(false)

async function handleSubmit() {
  loading.value = true

  try {
    await $fetch(`/api/admin/site-settings/${id.value}`, {
      method: 'PUT',
      body: form
    })

    toast.success('Configuração atualizada com sucesso')
    router.push('/admin/site-settings')
  } catch (error: any) {
    console.error('Erro ao atualizar configuração:', error)
    toast.error(error?.data?.message || 'Erro ao atualizar configuração')
  } finally {
    loading.value = false
  }
}
</script>
