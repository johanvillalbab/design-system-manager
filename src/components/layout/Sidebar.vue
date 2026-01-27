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
  BarChart3,
  ChevronLeft,
  ChevronRight
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
  { path: '/audit', name: 'Audit', icon: AlertTriangle },
  { path: '/requests', name: 'Requests', icon: GitPullRequest },
  { path: '/analytics', name: 'Analytics', icon: BarChart3 }
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
    class="bg-surface-800 border-r border-border flex flex-col transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-64'"
  >
    <!-- Logo -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-border">
      <div v-if="!collapsed" class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <Box class="w-5 h-5 text-white" />
        </div>
        <span class="font-semibold text-text-primary">DS Manager</span>
      </div>
      <div v-else class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto">
        <Box class="w-5 h-5 text-white" />
      </div>
      <button 
        @click="collapsed = !collapsed"
        class="p-1.5 rounded-md hover:bg-surface-700 text-text-secondary transition-colors"
        :class="{ 'absolute right-2': collapsed }"
      >
        <ChevronLeft v-if="!collapsed" class="w-4 h-4" />
        <ChevronRight v-else class="w-4 h-4" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-4 overflow-y-auto">
      <!-- Main Navigation -->
      <div class="px-3 mb-6">
        <p v-if="!collapsed" class="px-3 mb-2 text-xs font-medium text-text-muted uppercase tracking-wider">
          Navigation
        </p>
        <ul class="space-y-1">
          <li v-for="item in navigation" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
              :class="[
                isActiveNav(item.path) 
                  ? 'bg-primary-600/20 text-primary-400' 
                  : 'text-text-secondary hover:bg-surface-700 hover:text-text-primary'
              ]"
              :title="collapsed ? item.name : ''"
            >
              <component :is="item.icon" class="w-5 h-5 shrink-0" />
              <span v-if="!collapsed" class="font-medium">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Categories -->
      <div class="px-3">
        <p v-if="!collapsed" class="px-3 mb-2 text-xs font-medium text-text-muted uppercase tracking-wider">
          Categories
        </p>
        <ul class="space-y-1">
          <li v-for="category in categories" :key="category.id">
            <button
              @click="handleCategoryClick(category.id)"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-text-secondary hover:bg-surface-700 hover:text-text-primary"
              :class="{ 'bg-surface-700 text-text-primary': store.filters.categories.includes(category.id as any) }"
              :title="collapsed ? category.name : ''"
            >
              <component :is="category.icon" class="w-5 h-5 shrink-0" />
              <span v-if="!collapsed" class="font-medium flex-1 text-left">{{ category.name }}</span>
              <span 
                v-if="!collapsed"
                class="text-xs px-2 py-0.5 rounded-full bg-surface-600 text-text-muted"
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
        <img 
          src="https://i.pravatar.cc/40?img=25" 
          alt="User" 
          class="w-9 h-9 rounded-full ring-2 ring-surface-600"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-text-primary truncate">Sarah Chen</p>
          <p class="text-xs text-text-muted truncate">Design Lead</p>
        </div>
      </div>
    </div>
  </aside>
</template>
