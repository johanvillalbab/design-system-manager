<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useComponentsStore } from '@/stores/components'
import { Search, Bell, Settings, HelpCircle } from 'lucide-vue-next'

const route = useRoute()
const store = useComponentsStore()

const searchQuery = ref('')

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': 'Component Library',
    '/audit': 'Design Audit',
    '/requests': 'Component Requests',
    '/analytics': 'Analytics Dashboard'
  }
  return titles[route.path] || 'Design System Manager'
})

const pageSubtitle = computed(() => {
  const subtitles: Record<string, string> = {
    '/': 'Browse, search and manage your design system',
    '/audit': 'Track and resolve design inconsistencies',
    '/requests': 'Submit and vote on new components',
    '/analytics': 'Monitor adoption and usage metrics'
  }
  return subtitles[route.path] || ''
})

const notifications = ref([
  { id: 1, message: 'Button v3.2.1 released', time: '2h ago' },
  { id: 2, message: 'New request: Date Picker', time: '5h ago' },
  { id: 3, message: '3 audit issues fixed', time: '1d ago' }
])

const showNotifications = ref(false)

function handleSearch() {
  store.setSearch(searchQuery.value)
}
</script>

<template>
  <header class="h-18 glass border-b border-border flex items-center justify-between px-8 sticky top-0 z-40">
    <!-- Left: Page Title -->
    <div class="min-w-0">
      <h1 class="heading-display text-lg font-semibold text-text-primary tracking-tight">{{ pageTitle }}</h1>
      <p class="text-xs text-text-muted mt-0.5 tracking-wide uppercase">{{ pageSubtitle }}</p>
    </div>

    <!-- Center: Search -->
    <div class="flex-1 max-w-lg mx-10">
      <div class="relative group">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-400 transition-colors" />
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search components, patterns, tokens..."
          class="w-full pl-10 pr-4 py-2.5 bg-surface-800/80 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500/40 focus:bg-surface-800 focus:ring-1 focus:ring-accent-500/20 transition-all"
        />
        <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] text-text-muted bg-surface-600/50 rounded-md border border-border font-mono">
          ⌘K
        </kbd>
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-1">
      <button
        class="p-2.5 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-secondary transition-all duration-200"
        title="Help"
      >
        <HelpCircle class="w-[18px] h-[18px]" />
      </button>

      <button
        class="p-2.5 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-secondary transition-all duration-200"
        title="Settings"
      >
        <Settings class="w-[18px] h-[18px]" />
      </button>

      <!-- Notifications -->
      <div class="relative">
        <button
          @click="showNotifications = !showNotifications"
          class="p-2.5 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-secondary transition-all duration-200 relative"
          title="Notifications"
        >
          <Bell class="w-[18px] h-[18px]" />
          <span class="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-surface-900"></span>
        </button>

        <!-- Dropdown -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1 scale-98"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-1 scale-98"
        >
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-3 w-80 glass border border-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div class="p-4 border-b border-border">
              <h3 class="font-semibold text-text-primary text-sm">Notifications</h3>
            </div>
            <ul class="max-h-64 overflow-y-auto">
              <li
                v-for="notif in notifications"
                :key="notif.id"
                class="px-4 py-3.5 hover:bg-surface-700/40 cursor-pointer transition-colors border-b border-border last:border-0"
              >
                <p class="text-sm text-text-primary leading-snug">{{ notif.message }}</p>
                <p class="text-xs text-text-muted mt-1.5">{{ notif.time }}</p>
              </li>
            </ul>
            <div class="p-3 border-t border-border">
              <button class="w-full text-xs text-accent-400 hover:text-accent-300 font-medium tracking-wide uppercase transition-colors">
                View all notifications
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
