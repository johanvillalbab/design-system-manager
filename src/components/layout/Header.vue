<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useComponentsStore } from '@/stores/components'
import { useChatStore } from '@/stores/chat'
import { useThemeStore } from '@/stores/theme'
import { Search, Bell, Settings, HelpCircle, ExternalLink, MessageSquare, Sun, Moon } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const store = useComponentsStore()
const chatStore = useChatStore()
const themeStore = useThemeStore()

const searchQuery = ref('')
const showHelpModal = ref(false)
const showSettingsModal = ref(false)

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
  { id: 1, message: 'Button v3.2.1 released', time: '2h ago', read: false },
  { id: 2, message: 'New request: Date Picker', time: '5h ago', read: false },
  { id: 3, message: '3 audit issues fixed', time: '1d ago', read: true }
])

const showNotifications = ref(false)
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function handleSearch() {
  store.setSearch(searchQuery.value)
}

function openHelp() {
  showHelpModal.value = true
}

function openSettings() {
  showSettingsModal.value = true
}

function markAsRead(id: number) {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.read = true
}

function markAllAsRead() {
  notifications.value.forEach(n => n.read = true)
}

function viewAllNotifications() {
  markAllAsRead()
  showNotifications.value = false
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
      <!-- Chat Mode Toggle -->
      <button
        @click="chatStore.activate()"
        class="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 mr-1 bg-surface-800/50 border-border hover:bg-accent-500/10 hover:border-accent-500/25 hover:text-accent-400 text-text-muted"
        title="Modo Chat"
      >
        <MessageSquare class="w-4 h-4" />
        <span class="text-xs font-medium hidden sm:inline">Modo Chat</span>
      </button>

      <!-- Theme Toggle -->
      <button
        @click="themeStore.toggle()"
        class="p-2.5 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-accent-400 transition-all duration-300 relative"
        :title="themeStore.mode === 'dark' ? 'Cambiar a Light Mode' : 'Cambiar a Dark Mode'"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 rotate-[-90deg] scale-50"
          enter-to-class="opacity-100 rotate-0 scale-100"
          leave-active-class="transition-all duration-200 ease-in absolute"
          leave-from-class="opacity-100 rotate-0 scale-100"
          leave-to-class="opacity-0 rotate-90 scale-50"
          mode="out-in"
        >
          <Moon v-if="themeStore.mode === 'dark'" :key="'dark'" class="w-[18px] h-[18px]" />
          <Sun v-else :key="'light'" class="w-[18px] h-[18px]" />
        </Transition>
      </button>

      <button
        @click="openHelp"
        class="p-2.5 rounded-xl hover:bg-surface-700/50 text-text-muted hover:text-text-secondary transition-all duration-200"
        title="Help"
      >
        <HelpCircle class="w-[18px] h-[18px]" />
      </button>

      <button
        @click="openSettings"
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
          <span v-if="unreadCount > 0" class="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-surface-900"></span>
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
            class="absolute right-0 mt-3 w-80 bg-surface-900/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div class="p-4 border-b border-border flex items-center justify-between">
              <h3 class="font-semibold text-text-primary text-sm">Notifications</h3>
              <button 
                v-if="unreadCount > 0"
                @click="markAllAsRead"
                class="text-xs text-accent-400 hover:text-accent-300 transition-colors"
              >
                Mark all read
              </button>
            </div>
            <ul class="max-h-64 overflow-y-auto">
              <li
                v-for="notif in notifications"
                :key="notif.id"
                @click="markAsRead(notif.id)"
                class="px-4 py-3.5 hover:bg-surface-700/40 cursor-pointer transition-colors border-b border-border last:border-0"
                :class="{ 'bg-accent-500/5': !notif.read }"
              >
                <div class="flex items-start gap-2">
                  <span v-if="!notif.read" class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <p class="text-sm text-text-primary leading-snug">{{ notif.message }}</p>
                    <p class="text-xs text-text-muted mt-1.5">{{ notif.time }}</p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="p-3 border-t border-border">
              <button 
                @click="viewAllNotifications"
                class="w-full text-xs text-accent-400 hover:text-accent-300 font-medium tracking-wide uppercase transition-colors"
              >
                View all notifications
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>

  <!-- Help Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showHelpModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-md"
        @click.self="showHelpModal = false"
      >
        <div class="w-full max-w-md bg-surface-800 border border-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <div class="p-5 border-b border-border">
            <h2 class="text-lg font-semibold text-text-primary">Help & Resources</h2>
          </div>
          <div class="p-5 space-y-3">
            <a href="#" class="flex items-center gap-3 p-3 bg-surface-700/30 hover:bg-surface-700/50 rounded-xl transition-all border border-border/50">
              <ExternalLink class="w-4 h-4 text-accent-400" />
              <div>
                <p class="text-sm font-medium text-text-primary">Documentation</p>
                <p class="text-xs text-text-muted">Learn how to use the design system</p>
              </div>
            </a>
            <a href="#" class="flex items-center gap-3 p-3 bg-surface-700/30 hover:bg-surface-700/50 rounded-xl transition-all border border-border/50">
              <ExternalLink class="w-4 h-4 text-accent-400" />
              <div>
                <p class="text-sm font-medium text-text-primary">Component Guidelines</p>
                <p class="text-xs text-text-muted">Best practices and usage patterns</p>
              </div>
            </a>
            <a href="#" class="flex items-center gap-3 p-3 bg-surface-700/30 hover:bg-surface-700/50 rounded-xl transition-all border border-border/50">
              <ExternalLink class="w-4 h-4 text-accent-400" />
              <div>
                <p class="text-sm font-medium text-text-primary">Report an Issue</p>
                <p class="text-xs text-text-muted">Found a bug? Let us know</p>
              </div>
            </a>
          </div>
          <div class="p-4 border-t border-border">
            <button
              @click="showHelpModal = false"
              class="w-full py-2.5 bg-surface-700/50 hover:bg-surface-600/50 text-text-secondary font-medium rounded-xl transition-all text-sm border border-border"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Settings Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showSettingsModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-md"
        @click.self="showSettingsModal = false"
      >
        <div class="w-full max-w-md bg-surface-800 border border-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <div class="p-5 border-b border-border">
            <h2 class="text-lg font-semibold text-text-primary">Settings</h2>
          </div>
          <div class="p-5 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-1.5 rounded-lg bg-surface-600/50">
                  <Moon v-if="themeStore.mode === 'dark'" class="w-4 h-4 text-accent-400" />
                  <Sun v-else class="w-4 h-4 text-accent-500" />
                </div>
                <div>
                  <p class="text-sm font-medium text-text-primary">{{ themeStore.mode === 'dark' ? 'Dark Mode' : 'Light Mode' }}</p>
                  <p class="text-xs text-text-muted">{{ themeStore.mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme' }}</p>
                </div>
              </div>
              <button
                @click="themeStore.toggle()"
                class="w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
                :class="themeStore.mode === 'dark' ? 'bg-accent-500' : 'bg-surface-500'"
              >
                <span
                  class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300"
                  :class="themeStore.mode === 'dark' ? 'right-1' : 'left-1'"
                ></span>
              </button>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-primary">Notifications</p>
                <p class="text-xs text-text-muted">Receive update alerts</p>
              </div>
              <div class="w-10 h-6 bg-accent-500 rounded-full relative cursor-pointer">
                <span class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-text-primary">Compact View</p>
                <p class="text-xs text-text-muted">Show more items per page</p>
              </div>
              <div class="w-10 h-6 bg-surface-600 rounded-full relative cursor-pointer">
                <span class="absolute left-1 top-1 w-4 h-4 bg-text-muted rounded-full"></span>
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-border">
            <button
              @click="showSettingsModal = false"
              class="w-full py-2.5 bg-surface-700/50 hover:bg-surface-600/50 text-text-secondary font-medium rounded-xl transition-all text-sm border border-border"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
