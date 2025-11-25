<template>
  <div class="min-h-screen bg-white">
    <!-- Mobile Header -->
    <div class="lg:hidden">
      <Header />
    </div>

    <div class="max-w-4xl mx-auto px-6 lg:px-8">
      <div class="flex gap-16 lg:gap-20">
        <!-- Sidebar (hidden on mobile) - Fixed -->
        <div class="hidden lg:block shrink-0">
          <div class="sticky top-0 h-screen py-16 overflow-y-auto">
            <Sidebar />
          </div>
        </div>

        <!-- Main Content - Scrollable -->
        <main class="flex-1 min-w-0 py-10 lg:py-16">
          <slot />

          <!-- Simple Footer -->
          <footer
            class="mt-20 pt-8 border-t border-stone-100 text-[13px] text-stone-400"
          >
            <p>Copyright © 2022 - {{ currentYear }} | Patrick Luz</p>
          </footer>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/sidebar/Sidebar.vue";

const currentYear = new Date().getFullYear();
</script>
