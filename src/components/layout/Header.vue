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
  <header class="h-16 bg-surface-800/50 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
    <!-- Left: Page Title -->
    <div>
      <h1 class="text-xl font-semibold text-text-primary">{{ pageTitle }}</h1>
    </div>

    <!-- Center: Search -->
    <div class="flex-1 max-w-xl mx-8">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search components, patterns, tokens..."
          class="w-full pl-10 pr-4 py-2.5 bg-surface-700 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
        />
        <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-text-muted bg-surface-600 rounded-md">
          ⌘K
        </kbd>
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <button 
        class="p-2.5 rounded-xl hover:bg-surface-700 text-text-secondary hover:text-text-primary transition-colors"
        title="Help"
      >
        <HelpCircle class="w-5 h-5" />
      </button>
      
      <button 
        class="p-2.5 rounded-xl hover:bg-surface-700 text-text-secondary hover:text-text-primary transition-colors"
        title="Settings"
      >
        <Settings class="w-5 h-5" />
      </button>

      <!-- Notifications -->
      <div class="relative">
        <button 
          @click="showNotifications = !showNotifications"
          class="p-2.5 rounded-xl hover:bg-surface-700 text-text-secondary hover:text-text-primary transition-colors relative"
          title="Notifications"
        >
          <Bell class="w-5 h-5" />
          <span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger-500 rounded-full ring-2 ring-surface-800"></span>
        </button>

        <!-- Dropdown -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-80 bg-surface-700 border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div class="p-4 border-b border-border">
              <h3 class="font-semibold text-text-primary">Notifications</h3>
            </div>
            <ul class="max-h-64 overflow-y-auto">
              <li 
                v-for="notif in notifications" 
                :key="notif.id"
                class="px-4 py-3 hover:bg-surface-600 cursor-pointer transition-colors border-b border-border/50 last:border-0"
              >
                <p class="text-sm text-text-primary">{{ notif.message }}</p>
                <p class="text-xs text-text-muted mt-1">{{ notif.time }}</p>
              </li>
            </ul>
            <div class="p-3 border-t border-border">
              <button class="w-full text-sm text-primary-400 hover:text-primary-300 font-medium">
                View all notifications
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
