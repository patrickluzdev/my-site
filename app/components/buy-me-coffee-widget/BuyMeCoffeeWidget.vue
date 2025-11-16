<template>
  <Card class="sticky top-8">
    <CardHeader>
      <div class="flex items-center gap-2">
        <CardTitle class="text-2xl flex-1">Pague um café para Patrick Luz</CardTitle>
        <button class="text-muted-foreground hover:text-foreground">
          <Icon name="lucide:info" class="w-5 h-5" />
        </button>
      </div>
    </CardHeader>

    <CardContent class="space-y-4">
    <div class="bg-muted rounded-2xl p-4">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <div class="w-12 h-12 bg-card rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
            ☕
          </div>
          <button class="text-muted-foreground hover:text-foreground">
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>

        <div class="flex gap-2 flex-1">
          <button
            v-for="amount in coffeeAmounts"
            :key="amount"
            :class="[
              'flex-1 py-2.5 px-3 rounded-full font-semibold text-base transition-all',
              selectedAmount === amount
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground hover:bg-card/80'
            ]"
            @click="selectedAmount = amount"
          >
            {{ amount }}
          </button>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <input
        type="text"
        placeholder="Nome ou @seusocial"
        class="w-full px-4 py-3.5 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-base"
      />
    </div>

    <div class="mb-4">
      <div class="relative">
        <textarea
          rows="4"
          placeholder="Diga algo legal..."
          class="w-full px-4 py-3.5 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none text-base"
        />
        <button class="absolute bottom-3 right-3 text-muted-foreground hover:text-foreground">
          <Icon name="lucide:video" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div class="mb-6">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          class="w-4 h-4 rounded border-input focus:ring-ring accent-primary cursor-pointer"
        />
        <span class="text-sm text-foreground">Tornar mensal</span>
        <button class="text-muted-foreground hover:text-foreground ml-auto">
          <Icon name="lucide:info" class="w-4 h-4" />
        </button>
      </label>
    </div>

    <button class="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-full transition-colors">
      Apoiar R$ {{ selectedAmount * 5 }}
    </button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const coffeeAmounts = [1, 3, 5, 10]
const selectedAmount = ref(1)
</script>
