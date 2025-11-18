<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold">Site Settings</h1>
        <p class="text-muted-foreground mt-1">Gerencie as configurações do site</p>
      </div>
      <NuxtLink to="/admin/site-settings/criar">
        <Button>
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Nova Configuração
        </Button>
      </NuxtLink>
    </div>

    <Card>
      <CardContent class="p-0">
        <Table v-if="!pending && settings.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Chave</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead class="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="setting in settings" :key="setting.id">
              <TableCell class="font-medium">{{ setting.key }}</TableCell>
              <TableCell class="max-w-xs truncate">{{ setting.value || '-' }}</TableCell>
              <TableCell>
                <Badge variant="outline">{{ setting.type }}</Badge>
              </TableCell>
              <TableCell class="max-w-xs truncate text-muted-foreground">
                {{ setting.description || '-' }}
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink :to="`/admin/site-settings/${setting.id}/editar`">
                    <Button variant="ghost" size="icon">
                      <Icon name="lucide:pencil" class="h-4 w-4" />
                    </Button>
                  </NuxtLink>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="handleDelete(setting.id)"
                  >
                    <Icon name="lucide:trash-2" class="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-else-if="pending" class="p-8 text-center">
          <p class="text-muted-foreground">Carregando...</p>
        </div>

        <div v-else class="p-8 text-center">
          <p class="text-muted-foreground mb-4">Nenhuma configuração encontrada</p>
          <NuxtLink to="/admin/site-settings/criar">
            <Button>
              <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
              Criar primeira configuração
            </Button>
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin'
})

const { data, pending, refresh } = await useFetch('/api/admin/site-settings')

const settings = computed(() => data.value?.data || [])

async function handleDelete(id: number) {
  if (!confirm('Tem certeza que deseja deletar esta configuração?')) {
    return
  }

  try {
    await $fetch(`/api/admin/site-settings/${id}`, {
      method: 'DELETE'
    })

    toast.success('Configuração deletada com sucesso')
    refresh()
  } catch (error) {
    console.error('Erro ao deletar configuração:', error)
    toast.error('Erro ao deletar configuração')
  }
}
</script>
