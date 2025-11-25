<template>
  <aside class="w-[180px]">
    <div>
      <!-- Avatar -->
      <div class="mb-8 pl-1">
        <NuxtLink to="/" class="block">
          <div class="w-[72px] h-[72px] rounded-full overflow-hidden ring-2 ring-stone-200 ring-offset-2">
            <img
              src="/logo.jpeg"
              alt="Patrick Luz"
              class="w-full h-full object-cover"
            />
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="space-y-0.5">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="block py-1.5 text-[15px] transition-colors relative"
          :class="[
            isActiveRoute(item.to)
              ? 'text-stone-900 font-medium before:absolute before:left-[-12px] before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-stone-400 before:rounded-full'
              : 'text-stone-500 hover:text-stone-900'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const menuItems = [
  { label: 'Home', to: '/' },
  { label: 'Sobre mim', to: '/sobre' },
  { label: 'Meus projetos', to: '/projetos' },
  { label: 'Contato', to: '/contato' }
]

const isActiveRoute = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
