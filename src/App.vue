<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import { useThemeStore } from '@/stores/theme'

// Initialize theme — applies data-theme attribute on mount via the store's watcher
const themeStore = useThemeStore()

const route = useRoute()
const isChatRoute = computed(() => route.name === 'chat')
</script>

<template>
  <!-- Chat Mode: Fullscreen (no layout wrapper) -->
  <RouterView v-if="isChatRoute" v-slot="{ Component }">
    <Transition name="chat-mode" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>

  <!-- Normal Mode: Layout + Router -->
  <MainLayout v-else>
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </MainLayout>
</template>

<style>
/* Page Transitions — refined editorial feel */
.page-enter-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 1, 1),
              transform 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Up Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Scale Transition */
.scale-enter-active,
.scale-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* Chat Mode Transition */
.chat-mode-enter-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.chat-mode-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 1, 1),
              transform 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.chat-mode-enter-from {
  opacity: 0;
  transform: scale(1.02);
}

.chat-mode-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
