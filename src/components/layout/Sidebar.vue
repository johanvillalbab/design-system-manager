<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useComponentsStore } from '@/stores/components'
import {
  Layers,
  Box,
  LayoutGrid,
  FileCode,
  LayoutDashboard,
  AlertTriangle,
  GitPullRequest,
  GitMerge,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Bug,
  BookOpen,
  MessageSquare
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const store = useComponentsStore()

const collapsed = ref(false)

const categories = computed(() => [
  { id: 'foundations', name: 'Foundations', icon: Layers, count: store.categoryStats.foundations },
  { id: 'components', name: 'Components', icon: Box, count: store.categoryStats.components },
  { id: 'patterns', name: 'Patterns', icon: LayoutGrid, count: store.categoryStats.patterns },
  { id: 'templates', name: 'Templates', icon: FileCode, count: store.categoryStats.templates }
])

const navigation = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/issues', name: 'Issues', icon: Bug },
  { path: '/contributions', name: 'Contributions', icon: GitMerge },
  { path: '/requests', name: 'Requests', icon: GitPullRequest },
  { path: '/audit', name: 'Audit', icon: AlertTriangle },
  { path: '/analytics', name: 'Analytics', icon: BarChart3 },
  { path: '/docs', name: 'Documentation', icon: BookOpen },
  { path: '/chat', name: 'Chat', icon: MessageSquare }
]

function handleCategoryClick(categoryId: string) {
  store.clearFilters()
  store.toggleCategory(categoryId as any)
  router.push('/')
}

function isActiveNav(path: string) {
  return route.path === path
}
</script>

<template>
  <aside
    class="bg-surface-900 border-r border-border flex flex-col transition-all duration-300 relative h-screen sticky top-0"
    :class="collapsed ? 'w-[68px]' : 'w-[260px]'"
  >
    <!-- Accent line at top -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent-500/40 via-accent-500/10 to-transparent"></div>

    <!-- Logo -->
    <div class="h-18 flex items-center justify-between px-4 border-b border-border">
      <div v-if="!collapsed" class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center ">
          <Box class="w-5 h-5 text-surface-950" />
        </div>
        <div>
          <span class="font-display font-semibold text-text-primary text-sm tracking-tight">DS Manager</span>
          <span class="block text-[10px] text-text-muted tracking-widest uppercase">v2.5</span>
        </div>
      </div>
      <div v-else class="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mx-auto ">
        <Box class="w-5 h-5 text-surface-950" />
      </div>
      <button
        @click="collapsed = !collapsed"
        class="p-1.5 rounded-lg hover:bg-surface-700/50 text-text-muted transition-all duration-200"
        :class="{ 'absolute -right-3 top-5 bg-surface-800 border border-border shadow-lg z-10': collapsed }"
      >
        <ChevronLeft v-if="!collapsed" class="w-3.5 h-3.5" />
        <ChevronRight v-else class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-5 overflow-y-auto min-h-0">
      <!-- Main Navigation -->
      <div class="px-3 mb-8">
        <p v-if="!collapsed" class="px-3 mb-3 text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em]">
          Navigation
        </p>
        <ul class="space-y-0.5">
          <li v-for="item in navigation" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group"
              :class="[
                isActiveNav(item.path)
                  ? 'bg-accent-500/10 text-accent-400'
                  : 'text-text-muted hover:bg-surface-700/40 hover:text-text-secondary'
              ]"
              :title="collapsed ? item.name : ''"
            >
              <!-- Active indicator bar -->
              <span
                v-if="isActiveNav(item.path)"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent-500 rounded-r-full"
              ></span>
              <component :is="item.icon" class="w-[18px] h-[18px] shrink-0" />
              <span v-if="!collapsed" class="text-sm font-medium">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Categories -->
      <div class="px-3">
        <p v-if="!collapsed" class="px-3 mb-3 text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em]">
          Categories
        </p>
        <ul class="space-y-0.5">
          <li v-for="category in categories" :key="category.id">
            <button
              @click="handleCategoryClick(category.id)"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-text-muted hover:bg-surface-700/40 hover:text-text-secondary"
              :class="{ 'bg-surface-700/50 text-text-secondary': store.filters.categories.includes(category.id as any) }"
              :title="collapsed ? category.name : ''"
            >
              <component :is="category.icon" class="w-[18px] h-[18px] shrink-0" />
              <span v-if="!collapsed" class="text-sm font-medium flex-1 text-left">{{ category.name }}</span>
              <span
                v-if="!collapsed"
                class="text-[11px] px-2 py-0.5 rounded-md bg-surface-600/50 text-text-muted font-mono"
              >
                {{ category.count }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Footer -->
    <div v-if="!collapsed" class="p-4 border-t border-border">
      <div class="flex items-center gap-3">
        <div class="relative">
          <img 
            src="/profile.png" 
            alt="Sho Villalba" 
            class="w-9 h-9 rounded-xl object-cover ring-1 ring-border"
          />
          <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success-500 rounded-full ring-2 ring-surface-900"></span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-text-primary truncate">Sho Villalba</p>
          <p class="text-[11px] text-text-muted truncate">Design Lead</p>
        </div>
      </div>
    </div>
  </aside>
</template>
