<script setup lang="ts">
import { computed } from 'vue'
import { useAnalyticsStore } from '@/stores/analytics'
import MetricCard from '@/components/common/MetricCard.vue'
import {
  TrendingUp,
  Box,
  Users,
  Clock,
  AlertTriangle,
  Bell,
  Lightbulb,
  BarChart3,
  PieChart,
  Activity,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  RefreshCw,
  Star
} from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)

const store = useAnalyticsStore()

// Chart configurations — amber/gold theme
const adoptionChartData = computed(() => ({
  labels: store.chartData.adoption.labels,
  datasets: [{
    label: 'Adoption Rate',
    data: store.chartData.adoption.data,
    borderColor: '#fbbf24',
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#fbbf24',
    pointBorderColor: '#050507',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6
  }]
}))

const adoptionChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#09090b',
      titleColor: '#f0f0f5',
      bodyColor: '#9898a8',
      borderColor: 'rgba(255,255,255,0.06)',
      borderWidth: 1,
      padding: 12,
      displayColors: false
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.03)' },
      ticks: { color: '#5c5c6f', font: { family: 'Inter' } }
    },
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.03)' },
      ticks: { color: '#5c5c6f', font: { family: 'Inter' } },
      min: 0,
      max: 100
    }
  }
}

const topComponentsChartData = computed(() => ({
  labels: store.chartData.topComponents.labels,
  datasets: [{
    label: 'Usage Count',
    data: store.chartData.topComponents.data,
    backgroundColor: [
      '#fbbf24',
      '#f59e0b',
      '#d97706',
      '#b45309',
      '#92400e',
      '#fbbf24',
      '#f59e0b',
      '#d97706'
    ],
    borderRadius: 6,
    borderSkipped: false
  }]
}))

const topComponentsChartOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#09090b',
      titleColor: '#f0f0f5',
      bodyColor: '#9898a8',
      borderColor: 'rgba(255,255,255,0.06)',
      borderWidth: 1,
      padding: 12
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.03)' },
      ticks: { color: '#5c5c6f', font: { family: 'Inter' } }
    },
    y: {
      grid: { display: false },
      ticks: { color: '#f0f0f5', font: { family: 'Inter' } }
    }
  }
}

const platformChartData = computed(() => ({
  labels: store.chartData.platform.labels,
  datasets: [{
    data: store.chartData.platform.data,
    backgroundColor: ['#fbbf24', '#22c55e', '#8b5cf6'],
    borderWidth: 0,
    hoverOffset: 10
  }]
}))

const platformChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#9898a8',
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: { family: 'Inter' }
      }
    },
    tooltip: {
      backgroundColor: '#09090b',
      titleColor: '#f0f0f5',
      bodyColor: '#9898a8',
      borderColor: 'rgba(255,255,255,0.06)',
      borderWidth: 1,
      padding: 12
    }
  },
  cutout: '70%'
}

function getAlertIcon(type: string) {
  switch (type) {
    case 'warning': return AlertTriangle
    case 'success': return TrendingUp
    default: return Bell
  }
}

function getAlertColor(type: string) {
  switch (type) {
    case 'warning': return 'text-warning-400 bg-warning-500/10'
    case 'success': return 'text-success-400 bg-success-500/10'
    default: return 'text-accent-400 bg-accent-500/10'
  }
}

function getRecommendationIcon(type: string) {
  switch (type) {
    case 'deprecate': return Trash2
    case 'update': return RefreshCw
    case 'promote': return Star
    default: return Lightbulb
  }
}
</script>

<template>
  <div class="space-y-7">

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Adoption Rate"
        :value="`${store.stats.adoptionRate}%`"
        :icon="TrendingUp"
        color="success"
        :trend="8"
        class="animate-fade-up stagger-1"
      />
        <MetricCard
          title="Total Instances"
          :value="store.stats.totalInstances"
          :icon="Box"
          color="primary"
          :trend="12"
          class="animate-fade-up stagger-3"
        />
        <MetricCard
          title="Active Projects"
          :value="store.stats.activeProjects"
          :icon="Users"
          color="warning"
          class="animate-fade-up stagger-4"
        />
        <MetricCard
          title="Avg Implementation"
          :value="`${store.avgImplementationTime} days`"
          :icon="Clock"
          color="warning"
          :trend="-15"
          class="animate-fade-up stagger-5"
        />
      </div>

      <!-- Date Range Filter -->
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-display font-semibold text-text-primary tracking-tight">Usage Analytics</h2>
        <div class="flex gap-1 bg-surface-800/40 p-1 rounded-xl border border-border">
          <button
            v-for="range in ['1m', '3m', '6m', '1y']"
            :key="range"
            @click="store.selectDateRange(range as any)"
            class="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="[
              store.selectedDateRange === range
                ? 'bg-accent-500/15 text-accent-400'
                : 'text-text-muted hover:text-text-secondary'
            ]"
          >
            {{ range.toUpperCase() }}
          </button>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Adoption Over Time -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-display font-semibold text-text-primary text-sm tracking-tight">Adoption Rate Over Time</h3>
              <p class="text-xs text-text-muted mt-0.5">Design system coverage across projects</p>
            </div>
            <Activity class="w-4 h-4 text-text-muted" />
          </div>
          <div class="h-[300px]">
            <Line :data="adoptionChartData" :options="adoptionChartOptions" />
          </div>
        </div>

        <!-- Top Components -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-display font-semibold text-text-primary text-sm tracking-tight">Most Used Components</h3>
              <p class="text-xs text-text-muted mt-0.5">By instance count</p>
            </div>
            <BarChart3 class="w-4 h-4 text-text-muted" />
          </div>
          <div class="h-[300px]">
            <Bar :data="topComponentsChartData" :options="topComponentsChartOptions" />
          </div>
        </div>

        <!-- Platform Usage -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-display font-semibold text-text-primary text-sm tracking-tight">Usage by Platform</h3>
              <p class="text-xs text-text-muted mt-0.5">Distribution across platforms</p>
            </div>
            <PieChart class="w-4 h-4 text-text-muted" />
          </div>
          <div class="h-[250px] flex items-center justify-center">
            <div class="w-[200px] h-[200px]">
              <Doughnut :data="platformChartData" :options="platformChartOptions" />
            </div>
          </div>
        </div>

        <!-- Project Coverage Scatter -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-display font-semibold text-text-primary text-sm tracking-tight">Project Coverage</h3>
              <p class="text-xs text-text-muted mt-0.5">Adoption by project</p>
            </div>
          </div>
          <div class="space-y-3">
            <div
              v-for="project in store.filteredProjectCoverage"
              :key="project.projectId"
              class="flex items-center gap-4"
            >
              <span class="w-32 text-xs text-text-secondary truncate">{{ project.projectName }}</span>
              <div class="flex-1 h-2 bg-surface-600/30 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="[
                    project.coverage >= 80 ? 'bg-success-500' :
                    project.coverage >= 50 ? 'bg-warning-500' : 'bg-danger-500'
                  ]"
                  :style="{ width: `${project.coverage}%` }"
                ></div>
              </div>
              <span class="w-12 text-xs text-text-primary text-right font-mono">{{ project.coverage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts & Recommendations -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-display font-semibold text-text-primary text-sm tracking-tight flex items-center gap-2">
              <Bell class="w-4 h-4 text-text-muted" />
              Alerts
            </h3>
            <span class="text-[10px] text-text-muted font-mono">{{ store.activeAlerts.length }} active</span>
          </div>
          <div class="space-y-3">
            <div
              v-for="alert in store.activeAlerts"
              :key="alert.id"
              class="flex items-start gap-3 p-3 rounded-xl bg-surface-700/20 border border-border/30"
            >
              <div
                class="p-2 rounded-lg shrink-0"
                :class="getAlertColor(alert.type)"
              >
                <component :is="getAlertIcon(alert.type)" class="w-3.5 h-3.5" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-text-primary leading-snug">{{ alert.message }}</p>
                <p class="text-[10px] text-text-muted mt-1 font-mono">{{ alert.date }}</p>
              </div>
              <button
                @click="store.dismissAlert(alert.id)"
                class="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-600/40 transition-all"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-display font-semibold text-text-primary text-sm tracking-tight flex items-center gap-2">
              <Lightbulb class="w-4 h-4 text-accent-400" />
              Recommendations
            </h3>
          </div>
          <div class="space-y-3">
            <div
              v-for="rec in store.activeRecommendations"
              :key="rec.id"
              class="flex items-start gap-3 p-3 rounded-xl bg-surface-700/20 hover:bg-surface-700/30 transition-all cursor-pointer border border-border/30 hover:border-border/50"
            >
              <div
                class="p-2 rounded-lg shrink-0"
                :class="[
                  rec.type === 'deprecate' ? 'bg-danger-500/10 text-danger-400' :
                  rec.type === 'update' ? 'bg-warning-500/10 text-warning-400' :
                  'bg-success-500/10 text-success-400'
                ]"
              >
                <component :is="getRecommendationIcon(rec.type)" class="w-3.5 h-3.5" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-text-primary">
                  {{ rec.type === 'deprecate' ? 'Deprecate' : rec.type === 'update' ? 'Update' : 'Promote' }}
                  <span class="text-accent-400">{{ rec.componentName }}</span>
                </p>
                <p class="text-xs text-text-muted mt-1">{{ rec.reason }}</p>
                <span class="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-surface-600/30 rounded text-[10px] text-text-muted font-mono border border-border/30">
                  {{ rec.metric }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dependency Graph Preview -->
      <div class="bg-surface-800/40 border border-border rounded-2xl p-5">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="font-display font-semibold text-text-primary text-sm tracking-tight">Component Dependencies</h3>
            <p class="text-xs text-text-muted mt-0.5">How components are connected</p>
          </div>
        </div>
        <div class="h-[300px] flex items-center justify-center bg-surface-900/30 rounded-xl border border-border/50">
          <!-- Simplified dependency visualization -->
          <div class="relative w-full h-full">
            <!-- Nodes -->
            <div
              v-for="(node, index) in store.graph.nodes"
              :key="node.id"
              class="absolute w-16 h-16 rounded-xl flex items-center justify-center text-[10px] font-medium transition-all hover:scale-110 cursor-pointer border"
              :class="[
                node.group === 'foundations' ? 'bg-accent-500/10 text-accent-400 border-accent-500/20' :
                node.group === 'patterns' ? 'bg-success-500/10 text-success-400 border-success-500/20' :
                'bg-surface-700/50 text-text-primary border-border'
              ]"
              :style="{
                left: `${15 + (index % 4) * 22}%`,
                top: `${20 + Math.floor(index / 4) * 35}%`
              }"
            >
              {{ node.name }}
            </div>

            <!-- Legend -->
            <div class="absolute bottom-4 right-4 flex gap-4 text-[10px] text-text-muted">
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded bg-accent-500/10 border border-accent-500/20"></span>
                Foundations
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded bg-surface-700/50 border border-border"></span>
                Components
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded bg-success-500/10 border border-success-500/20"></span>
                Patterns
              </span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
