<template>
    <div class="sticky top-0 z-50">
        <header class="bg-white border-b border-border">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <HeaderProfile />
                    <HeaderDesktopNav />
                    <!-- <HeaderActions /> -->
                </div>
            </div>
        </header>

        <HeaderMobileTabs />
    </div>
</template>

<script setup lang="ts">
import HeaderProfile from './components/HeaderProfile.vue'
import HeaderDesktopNav from './components/HeaderDesktopNav.vue'
// import HeaderActions from './components/HeaderActions.vue'
import HeaderMobileTabs from './components/HeaderMobileTabs.vue'
</script>
