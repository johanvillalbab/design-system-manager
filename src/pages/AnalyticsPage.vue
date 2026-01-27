<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAnalyticsStore } from '@/stores/analytics'
import { useComponentsStore } from '@/stores/components'
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
  Star,
  Cloud,
  Database,
  Download,
  GitFork
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
const componentsStore = useComponentsStore()

const dateRange = ref('6m')

// Fetch analytics data on mount
onMounted(async () => {
  // First make sure components are loaded (analytics depends on them)
  if (componentsStore.dataSource === 'mock') {
    await componentsStore.fetchComponents()
  }
  await store.fetchAnalytics()
})

// Toggle between API and mock data
function toggleDataSource() {
  if (store.dataSource === 'api') {
    store.useMockData()
  } else {
    store.fetchAnalytics()
  }
}

// Chart configurations
const adoptionChartData = computed(() => ({
  labels: store.chartData.adoption.labels,
  datasets: [{
    label: 'Adoption Rate',
    data: store.chartData.adoption.data,
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#6366f1',
    pointBorderColor: '#fff',
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
      backgroundColor: '#1a1a24',
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      borderColor: '#2e2e3a',
      borderWidth: 1,
      padding: 12,
      displayColors: false
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(46, 46, 58, 0.5)' },
      ticks: { color: '#64748b' }
    },
    y: {
      grid: { color: 'rgba(46, 46, 58, 0.5)' },
      ticks: { color: '#64748b' },
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
      '#6366f1',
      '#818cf8',
      '#a5b4fc',
      '#c7d2fe',
      '#e0e7ff',
      '#6366f1',
      '#818cf8',
      '#a5b4fc'
    ],
    borderRadius: 8,
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
      backgroundColor: '#1a1a24',
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      borderColor: '#2e2e3a',
      borderWidth: 1,
      padding: 12
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(46, 46, 58, 0.5)' },
      ticks: { color: '#64748b' }
    },
    y: {
      grid: { display: false },
      ticks: { color: '#f1f5f9' }
    }
  }
}

const platformChartData = computed(() => ({
  labels: store.chartData.platform.labels,
  datasets: [{
    data: store.chartData.platform.data,
    backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
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
        color: '#94a3b8',
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      backgroundColor: '#1a1a24',
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      borderColor: '#2e2e3a',
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
    case 'warning': return 'text-warning-500 bg-warning-500/10'
    case 'success': return 'text-success-500 bg-success-500/10'
    default: return 'text-primary-400 bg-primary-500/10'
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
  <div class="space-y-6">
    <!-- Data Source Toggle & Status -->
    <div class="flex items-center justify-between bg-surface-800 border border-border rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div 
          class="p-2 rounded-lg"
          :class="store.dataSource === 'api' ? 'bg-primary-500/10' : 'bg-surface-700'"
        >
          <Cloud v-if="store.dataSource === 'api'" class="w-5 h-5 text-primary-500" />
          <Database v-else class="w-5 h-5 text-text-muted" />
        </div>
        <div>
          <p class="text-sm font-medium text-text-primary">
            {{ store.dataSource === 'api' ? 'Ant Design (npm + GitHub)' : 'Mock Data' }}
          </p>
          <p class="text-xs text-text-muted">
            {{ store.dataSource === 'api' ? 'Real download stats from npm registry' : 'Using local sample data' }}
          </p>
        </div>
        <!-- API Stats badges -->
        <div v-if="store.dataSource === 'api' && store.stats.weeklyDownloads" class="hidden md:flex items-center gap-3 ml-4">
          <div class="flex items-center gap-1 px-2 py-1 bg-success-500/10 rounded-md">
            <Download class="w-4 h-4 text-success-500" />
            <span class="text-sm font-medium text-success-500">{{ (store.stats.weeklyDownloads / 1000000).toFixed(1) }}M/month</span>
          </div>
          <div v-if="store.stats.latestVersion" class="flex items-center gap-1 px-2 py-1 bg-primary-500/10 rounded-md">
            <span class="text-sm font-medium text-primary-400">v{{ store.stats.latestVersion }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="store.dataSource === 'api'"
          @click="store.refreshData()"
          :disabled="store.loading"
          class="p-2 rounded-lg hover:bg-surface-700 transition-colors disabled:opacity-50"
          title="Refresh data"
        >
          <RefreshCw class="w-5 h-5 text-text-secondary" :class="{ 'animate-spin': store.loading }" />
        </button>
        <button
          @click="toggleDataSource()"
          :disabled="store.loading"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          :class="store.dataSource === 'api' 
            ? 'bg-surface-700 text-text-secondary hover:bg-surface-600' 
            : 'bg-primary-600 text-white hover:bg-primary-500'"
        >
          {{ store.dataSource === 'api' ? 'Use Mock Data' : 'Load from API' }}
        </button>
      </div>
    </div>

    <!-- Error Alert -->
    <div 
      v-if="store.error" 
      class="bg-danger-500/10 border border-danger-500/20 rounded-xl p-4 flex items-start gap-3"
    >
      <AlertTriangle class="w-5 h-5 text-danger-500 flex-shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-medium text-danger-500">Error loading analytics</p>
        <p class="text-sm text-danger-400 mt-1">{{ store.error }}</p>
        <p class="text-xs text-text-muted mt-2">Showing fallback mock data instead.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <RefreshCw class="w-8 h-8 text-primary-500 animate-spin" />
        <p class="text-text-secondary">Loading analytics from npm...</p>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Adoption Rate"
          :value="`${store.stats.adoptionRate}%`"
          :icon="TrendingUp"
          color="success"
          :trend="8"
        />
        <MetricCard 
          :title="store.dataSource === 'api' ? 'Monthly Downloads' : 'Total Instances'"
          :value="store.dataSource === 'api' ? `${(store.stats.totalInstances / 1000000).toFixed(1)}M` : store.stats.totalInstances"
          :icon="store.dataSource === 'api' ? Download : Box"
          color="primary"
          :trend="12"
        />
        <MetricCard 
          :title="store.dataSource === 'api' ? 'GitHub Stars' : 'Active Projects'"
          :value="store.dataSource === 'api' ? `${(store.stats.stars / 1000).toFixed(0)}K` : store.stats.activeProjects"
          :icon="store.dataSource === 'api' ? Star : Users"
          color="warning"
        />
        <MetricCard 
          :title="store.dataSource === 'api' ? 'Open Issues' : 'Avg Implementation'"
          :value="store.dataSource === 'api' ? store.stats.issuesResolved : `${store.avgImplementationTime} days`"
          :icon="store.dataSource === 'api' ? AlertTriangle : Clock"
          :color="store.dataSource === 'api' ? 'warning' : 'warning'"
          :trend="store.dataSource === 'api' ? undefined : -15"
        />
      </div>

      <!-- Date Range Filter -->
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-text-primary">Usage Analytics</h2>
        <div class="flex gap-2 bg-surface-800 p-1 rounded-xl border border-border">
          <button
            v-for="range in ['1m', '3m', '6m', '1y']"
            :key="range"
            @click="dateRange = range"
            class="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            :class="[
              dateRange === range
                ? 'bg-primary-600 text-white'
                : 'text-text-secondary hover:text-text-primary'
            ]"
          >
            {{ range.toUpperCase() }}
          </button>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Adoption Over Time -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-semibold text-text-primary">{{ store.dataSource === 'api' ? 'Weekly Downloads' : 'Adoption Rate Over Time' }}</h3>
              <p class="text-sm text-text-muted">{{ store.dataSource === 'api' ? 'npm download statistics' : 'Design system coverage across projects' }}</p>
            </div>
            <Activity class="w-5 h-5 text-text-muted" />
          </div>
          <div class="h-[300px]">
            <Line :data="adoptionChartData" :options="adoptionChartOptions" />
          </div>
        </div>

        <!-- Top Components -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-semibold text-text-primary">Most Used Components</h3>
              <p class="text-sm text-text-muted">By instance count</p>
            </div>
            <BarChart3 class="w-5 h-5 text-text-muted" />
          </div>
          <div class="h-[300px]">
            <Bar :data="topComponentsChartData" :options="topComponentsChartOptions" />
          </div>
        </div>

        <!-- Platform Usage -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-semibold text-text-primary">Usage by Platform</h3>
              <p class="text-sm text-text-muted">Distribution across platforms</p>
            </div>
            <PieChart class="w-5 h-5 text-text-muted" />
          </div>
          <div class="h-[250px] flex items-center justify-center">
            <div class="w-[200px] h-[200px]">
              <Doughnut :data="platformChartData" :options="platformChartOptions" />
            </div>
          </div>
        </div>

        <!-- Project Coverage Scatter -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-semibold text-text-primary">Project Coverage</h3>
              <p class="text-sm text-text-muted">Adoption by project</p>
            </div>
          </div>
          <div class="space-y-3">
            <div 
              v-for="project in store.filteredProjectCoverage"
              :key="project.projectId"
              class="flex items-center gap-4"
            >
              <span class="w-32 text-sm text-text-secondary truncate">{{ project.projectName }}</span>
              <div class="flex-1 h-3 bg-surface-700 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  :class="[
                    project.coverage >= 80 ? 'bg-success-500' :
                    project.coverage >= 50 ? 'bg-warning-500' : 'bg-danger-500'
                  ]"
                  :style="{ width: `${project.coverage}%` }"
                ></div>
              </div>
              <span class="w-12 text-sm text-text-primary text-right">{{ project.coverage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts & Recommendations -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-text-primary flex items-center gap-2">
              <Bell class="w-5 h-5 text-text-muted" />
              Alerts
            </h3>
            <span class="text-xs text-text-muted">{{ store.activeAlerts.length }} active</span>
          </div>
          <div class="space-y-3">
            <div 
              v-for="alert in store.activeAlerts"
              :key="alert.id"
              class="flex items-start gap-3 p-3 rounded-xl bg-surface-700/50"
            >
              <div 
                class="p-2 rounded-lg shrink-0"
                :class="getAlertColor(alert.type)"
              >
                <component :is="getAlertIcon(alert.type)" class="w-4 h-4" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-text-primary">{{ alert.message }}</p>
                <p class="text-xs text-text-muted mt-1">{{ alert.date }}</p>
              </div>
              <button 
                @click="store.dismissAlert(alert.id)"
                class="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-600 transition-colors"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-text-primary flex items-center gap-2">
              <Lightbulb class="w-5 h-5 text-warning-500" />
              Recommendations
            </h3>
          </div>
          <div class="space-y-3">
            <div 
              v-for="rec in store.activeRecommendations"
              :key="rec.id"
              class="flex items-start gap-3 p-3 rounded-xl bg-surface-700/50 hover:bg-surface-700 transition-colors cursor-pointer"
            >
              <div 
                class="p-2 rounded-lg shrink-0"
                :class="[
                  rec.type === 'deprecate' ? 'bg-danger-500/10 text-danger-500' :
                  rec.type === 'update' ? 'bg-warning-500/10 text-warning-500' :
                  'bg-success-500/10 text-success-500'
                ]"
              >
                <component :is="getRecommendationIcon(rec.type)" class="w-4 h-4" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-text-primary">
                  {{ rec.type === 'deprecate' ? 'Deprecate' : rec.type === 'update' ? 'Update' : 'Promote' }}
                  <span class="text-primary-400">{{ rec.componentName }}</span>
                </p>
                <p class="text-xs text-text-muted mt-1">{{ rec.reason }}</p>
                <span class="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-surface-600 rounded text-xs text-text-muted">
                  {{ rec.metric }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dependency Graph Preview -->
      <div class="bg-surface-800 border border-border rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-semibold text-text-primary">Component Dependencies</h3>
            <p class="text-sm text-text-muted">How components are connected</p>
          </div>
        </div>
        <div class="h-[300px] flex items-center justify-center bg-surface-900/50 rounded-xl border border-border">
          <!-- Simplified dependency visualization -->
          <div class="relative w-full h-full">
            <!-- Nodes -->
            <div 
              v-for="(node, index) in store.graph.nodes"
              :key="node.id"
              class="absolute w-16 h-16 rounded-xl flex items-center justify-center text-xs font-medium transition-transform hover:scale-110 cursor-pointer"
              :class="[
                node.group === 'foundations' ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30' :
                node.group === 'patterns' ? 'bg-success-500/20 text-success-500 border border-success-500/30' :
                'bg-surface-700 text-text-primary border border-border'
              ]"
              :style="{
                left: `${15 + (index % 4) * 22}%`,
                top: `${20 + Math.floor(index / 4) * 35}%`
              }"
            >
              {{ node.name }}
            </div>
            
            <!-- Legend -->
            <div class="absolute bottom-4 right-4 flex gap-4 text-xs text-text-muted">
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-primary-600/20 border border-primary-500/30"></span>
                Foundations
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-surface-700 border border-border"></span>
                Components
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-success-500/20 border border-success-500/30"></span>
                Patterns
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
