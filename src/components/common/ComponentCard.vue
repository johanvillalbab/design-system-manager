<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { DesignComponent } from '@/types'
import StatusBadge from './StatusBadge.vue'
import PlatformBadge from './PlatformBadge.vue'
import { Clock, Users, Bug, GitPullRequest, AlertTriangle, TrendingUp, TrendingDown, CheckCircle2, CircleDot } from 'lucide-vue-next'
import { mockIssues } from '@/data/issues'
import { mockContributions } from '@/data/contributions'
import { alerts, componentHealth } from '@/data/analytics'

const props = defineProps<{
  component: DesignComponent
}>()

const router = useRouter()

const borderAccent = computed(() => {
  if (props.component.status === 'deprecated') return 'border-danger-500/15 hover:border-danger-500/25'
  if (props.component.needsUpdate) return 'border-warning-500/15 hover:border-warning-500/25'
  return 'border-border hover:border-accent-500/20'
})

// Health summary data
const openIssues = computed(() =>
  mockIssues.filter(i => i.componentId === props.component.id && (i.status === 'open' || i.status === 'in_progress'))
)

const openBugs = computed(() =>
  openIssues.value.filter(i => i.type === 'bug')
)

const pendingContributions = computed(() =>
  mockContributions.filter(c => c.componentId === props.component.id && (c.status === 'pending_review' || c.status === 'approved'))
)

const componentAlerts = computed(() =>
  alerts.filter(a => a.componentId === props.component.id)
)

const health = computed(() =>
  componentHealth.find(h => h.componentId === props.component.id)
)

const adoptionTrend = computed(() => health.value?.adoptionTrend ?? 0)

const criticalIssues = computed(() =>
  openIssues.value.filter(i => i.priority === 'critical')
)

// Overall health score: good, warning, critical
const healthStatus = computed(() => {
  if (props.component.status === 'deprecated') return 'deprecated'
  if (criticalIssues.value.length > 0) return 'critical'
  if (openBugs.value.length > 0 || props.component.needsUpdate) return 'warning'
  return 'healthy'
})

function navigateToDetail() {
  router.push(`/component/${props.component.id}`)
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <article
    @click="navigateToDetail"
    class="group bg-surface-800/40 border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-surface-800/70 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 card-glow"
    :class="borderAccent"
  >
    <!-- Preview Area -->
    <div class="aspect-[16/10] bg-surface-700/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-border/50">
      <div class="text-5xl font-display font-bold text-text-muted/15 select-none">
        {{ component.name.charAt(0) }}
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-3">
      <!-- Header -->
      <div class="flex items-start justify-between gap-2">
        <div>
          <h3 class="font-semibold text-text-primary group-hover:text-accent-400 transition-colors text-[15px]">
            {{ component.name }}
          </h3>
          <p class="text-xs text-text-muted mt-0.5 font-mono">v{{ component.version }}</p>
        </div>
        <StatusBadge :status="component.status" size="sm" />
      </div>

      <!-- Health Summary (replaces description) -->
      <div class="space-y-2">
        <!-- Status indicators row -->
        <div class="flex flex-wrap gap-1.5">
          <!-- Bugs -->
          <span
            v-if="openBugs.length > 0"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium"
            :class="criticalIssues.length > 0
              ? 'bg-danger-500/12 text-danger-400 border border-danger-500/15'
              : 'bg-warning-500/12 text-warning-400 border border-warning-500/15'"
          >
            <Bug class="w-3 h-3" />
            {{ openBugs.length }} bug{{ openBugs.length !== 1 ? 's' : '' }}
          </span>

          <!-- Open issues (non-bug) -->
          <span
            v-if="openIssues.length - openBugs.length > 0"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent-500/10 text-accent-400 border border-accent-500/15"
          >
            <CircleDot class="w-3 h-3" />
            {{ openIssues.length - openBugs.length }} issue{{ (openIssues.length - openBugs.length) !== 1 ? 's' : '' }}
          </span>

          <!-- Pending PRs -->
          <span
            v-if="pendingContributions.length > 0"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/15"
          >
            <GitPullRequest class="w-3 h-3" />
            {{ pendingContributions.length }} PR{{ pendingContributions.length !== 1 ? 's' : '' }}
          </span>

          <!-- Alerts -->
          <span
            v-if="componentAlerts.length > 0"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-warning-500/10 text-warning-400 border border-warning-500/15"
          >
            <AlertTriangle class="w-3 h-3" />
            {{ componentAlerts.length }} alert{{ componentAlerts.length !== 1 ? 's' : '' }}
          </span>

          <!-- Clean state -->
          <span
            v-if="openIssues.length === 0 && pendingContributions.length === 0 && componentAlerts.length === 0"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-success-500/10 text-success-400 border border-success-500/15"
          >
            <CheckCircle2 class="w-3 h-3" />
            No issues
          </span>
        </div>

        <!-- Adoption trend -->
        <div v-if="adoptionTrend !== 0" class="flex items-center gap-1.5 text-[11px]">
          <TrendingUp v-if="adoptionTrend > 0" class="w-3 h-3 text-success-400" />
          <TrendingDown v-else class="w-3 h-3 text-danger-400" />
          <span :class="adoptionTrend > 0 ? 'text-success-400' : 'text-danger-400'" class="font-medium">
            {{ adoptionTrend > 0 ? '+' : '' }}{{ adoptionTrend }}%
          </span>
          <span class="text-text-muted">adoption</span>
        </div>
      </div>

      <!-- Platforms -->
      <div class="flex flex-wrap gap-1.5">
        <PlatformBadge
          v-for="platform in component.platforms"
          :key="platform"
          :platform="platform"
        />
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-3 border-t border-border/50">
        <div class="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock class="w-3 h-3" />
          <span>{{ formatDate(component.lastUpdated) }}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-text-muted">
          <Users class="w-3 h-3" />
          <span class="font-mono">{{ component.usageCount.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Update indicator -->
      <div
        v-if="component.needsUpdate && component.status !== 'deprecated'"
        class="flex items-center gap-2 text-xs text-warning-400 bg-warning-500/8 px-3 py-2 rounded-lg border border-warning-500/10"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-warning-400 animate-subtle-pulse"></span>
        Update available
      </div>
    </div>
  </article>
</template>
