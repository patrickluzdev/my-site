<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground mt-1">Bem-vindo ao painel administrativo</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Site Settings</CardTitle>
          <Icon name="lucide:settings" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.settings }}</div>
          <p class="text-xs text-muted-foreground">
            Configurações do site
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Posts</CardTitle>
          <Icon name="lucide:file-text" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">-</div>
          <p class="text-xs text-muted-foreground">
            Em breve
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Projetos</CardTitle>
          <Icon name="lucide:folder" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">-</div>
          <p class="text-xs text-muted-foreground">
            Em breve
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Usuários</CardTitle>
          <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">-</div>
          <p class="text-xs text-muted-foreground">
            Em breve
          </p>
        </CardContent>
      </Card>
    </div>

    <div class="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Links Rápidos</CardTitle>
          <CardDescription>Acesse rapidamente as principais seções</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4 md:grid-cols-2">
          <NuxtLink to="/admin/site-settings" class="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors">
            <Icon name="lucide:settings" class="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 class="font-semibold">Site Settings</h3>
              <p class="text-sm text-muted-foreground">Gerencie as configurações do site</p>
            </div>
          </NuxtLink>

          <div class="flex items-center gap-4 p-4 border rounded-lg opacity-50 cursor-not-allowed">
            <Icon name="lucide:file-text" class="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 class="font-semibold">Posts</h3>
              <p class="text-sm text-muted-foreground">Em breve</p>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 border rounded-lg opacity-50 cursor-not-allowed">
            <Icon name="lucide:folder" class="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 class="font-semibold">Projetos</h3>
              <p class="text-sm text-muted-foreground">Em breve</p>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 border rounded-lg opacity-50 cursor-not-allowed">
            <Icon name="lucide:users" class="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 class="font-semibold">Usuários</h3>
              <p class="text-sm text-muted-foreground">Em breve</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { data } = await useFetch('/api/admin/site-settings')

const stats = computed(() => ({
  settings: data.value?.data?.length || 0
}))
</script>
