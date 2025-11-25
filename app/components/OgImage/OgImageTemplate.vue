<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px',
      background: 'linear-gradient(135deg, #fafaf9 0%, #e7e5e4 100%)',
    }"
  >
    <!-- Top: Logo -->
    <div :style="{ display: 'flex', alignItems: 'center', gap: '16px' }">
      <img
        src="/logo.png"
        alt="Logo"
        :style="{
          width: '64px',
          height: '64px',
          borderRadius: '12px',
        }"
      />
      <span :style="{ fontSize: '28px', fontWeight: 600, color: '#44403c' }">
        Patrick Luz
      </span>
    </div>

    <!-- Center: Title -->
    <div :style="{ display: 'flex', flexDirection: 'column' }">
      <h1
        :style="{
          fontSize: '64px',
          fontWeight: 700,
          color: '#1c1917',
          lineHeight: 1.1,
        }"
      >
        {{ title || "Patrick Luz" }}
      </h1>
      <p
        v-if="description"
        :style="{
          fontSize: '24px',
          color: '#78716c',
          marginTop: '16px',
        }"
      >
        {{ description }}
      </p>
    </div>

    <!-- Bottom: URL -->
    <span :style="{ fontSize: '20px', color: '#a8a29e' }">
      patrickluz.dev
    </span>
  </div>
</template>
