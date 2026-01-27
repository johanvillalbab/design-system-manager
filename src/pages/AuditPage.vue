<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuditStore } from '@/stores/audit'
import IssueCard from '@/components/common/IssueCard.vue'
import MetricCard from '@/components/common/MetricCard.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Wand2, 
  Download, 
  RefreshCw,
  CheckCircle2,
  Cloud,
  Database,
  Bug
} from 'lucide-vue-next'

const store = useAuditStore()

const severityFilters = computed(() => [
  { id: null, label: 'All', count: store.stats.totalIssues },
  { id: 'critical', label: 'Critical', count: store.stats.critical, icon: AlertTriangle, color: 'text-danger-500' },
  { id: 'high', label: 'High', count: store.stats.high, icon: AlertCircle, color: 'text-warning-500' },
  { id: 'medium', label: 'Medium', count: store.stats.medium, icon: Info, color: 'text-text-muted' }
])

function handleFix(id: string) {
  store.fixIssue(id)
}

function handleIgnore(id: string) {
  store.ignoreIssue(id)
}

function handleFixAll() {
  store.fixAllAutoFixable()
}

// Fetch data from API on mount
onMounted(async () => {
  await store.fetchAuditData()
})

// Toggle between API and mock data
function toggleDataSource() {
  if (store.dataSource === 'api') {
    store.useMockData()
  } else {
    store.fetchAuditData()
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
          :class="store.dataSource === 'api' ? 'bg-danger-500/10' : 'bg-surface-700'"
        >
          <Bug v-if="store.dataSource === 'api'" class="w-5 h-5 text-danger-500" />
          <Database v-else class="w-5 h-5 text-text-muted" />
        </div>
        <div>
          <p class="text-sm font-medium text-text-primary">
            {{ store.dataSource === 'api' ? 'GitHub Bug Issues' : 'Mock Data' }}
          </p>
          <p class="text-xs text-text-muted">
            {{ store.dataSource === 'api' ? 'Real bug reports from ant-design/ant-design' : 'Using local sample data' }}
          </p>
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
          {{ store.dataSource === 'api' ? 'Use Mock Data' : 'Load from GitHub' }}
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
        <p class="text-sm font-medium text-danger-500">Error loading audit data</p>
        <p class="text-sm text-danger-400 mt-1">{{ store.error }}</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <RefreshCw class="w-8 h-8 text-primary-500 animate-spin" />
        <p class="text-text-secondary">Loading bug issues from GitHub...</p>
      </div>
    </div>

    <template v-else>
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Total Issues"
        :value="store.stats.totalIssues"
        :icon="AlertTriangle"
        color="danger"
      />
      <MetricCard 
        title="Auto-fixable"
        :value="store.stats.autoFixable"
        subtitle="Can be fixed automatically"
        :icon="Wand2"
        color="primary"
      />
      <MetricCard 
        title="Avg Coverage"
        :value="`${store.stats.avgCoverage}%`"
        :icon="CheckCircle2"
        color="success"
        :trend="3"
      />
      <MetricCard 
        title="Projects Audited"
        :value="store.projects.length"
        :icon="RefreshCw"
        color="primary"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Issues List -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Header & Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-800 border border-border rounded-2xl p-4">
          <div>
            <h2 class="font-semibold text-text-primary">Design Inconsistencies</h2>
            <p class="text-sm text-text-muted">{{ store.filteredIssues.length }} issues found</p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="store.autoFixableIssues.length > 0"
              @click="handleFixAll"
              class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
            >
              <Wand2 class="w-4 h-4" />
              Fix All ({{ store.autoFixableIssues.length }})
            </button>
            <button class="flex items-center gap-2 px-4 py-2 bg-surface-700 hover:bg-surface-600 text-text-primary font-medium rounded-lg transition-colors">
              <Download class="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        <!-- Severity Filters -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="filter in severityFilters"
            :key="filter.label"
            @click="store.setSeverityFilter(filter.id as any)"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
            :class="[
              store.selectedSeverity === filter.id
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                : 'bg-surface-800 text-text-secondary hover:bg-surface-700 border border-border'
            ]"
          >
            <component v-if="filter.icon" :is="filter.icon" class="w-4 h-4" :class="store.selectedSeverity !== filter.id && filter.color" />
            {{ filter.label }}
            <span 
              class="px-2 py-0.5 rounded-full text-xs"
              :class="store.selectedSeverity === filter.id ? 'bg-white/20' : 'bg-surface-600'"
            >
              {{ filter.count }}
            </span>
          </button>
        </div>

        <!-- Issues Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IssueCard 
            v-for="issue in store.filteredIssues"
            :key="issue.id"
            :issue="issue"
            @fix="handleFix"
            @ignore="handleIgnore"
          />
        </div>

        <!-- Empty State -->
        <div 
          v-if="store.filteredIssues.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center bg-surface-800 border border-border rounded-2xl"
        >
          <div class="w-16 h-16 rounded-2xl bg-success-500/20 flex items-center justify-center mb-4">
            <CheckCircle2 class="w-8 h-8 text-success-500" />
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">All Clear!</h3>
          <p class="text-text-secondary max-w-md">
            No issues found matching your filters. Great job maintaining design consistency!
          </p>
        </div>
      </div>

      <!-- Right: Projects Sidebar -->
      <div class="space-y-4">
        <!-- Project Coverage -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <h3 class="font-semibold text-text-primary mb-4">Project Coverage</h3>
          <div class="space-y-4">
            <div 
              v-for="project in store.projects"
              :key="project.id"
              class="group cursor-pointer"
              @click="store.setProjectFilter(store.selectedProject === project.id ? null : project.id)"
            >
              <div class="flex items-center justify-between mb-2">
                <span 
                  class="text-sm font-medium transition-colors"
                  :class="store.selectedProject === project.id ? 'text-primary-400' : 'text-text-primary group-hover:text-primary-400'"
                >
                  {{ project.name }}
                </span>
                <span class="text-sm text-text-muted">{{ project.coverage }}%</span>
              </div>
              <ProgressBar :value="project.coverage" size="sm" />
              <div class="flex items-center justify-between mt-1.5 text-xs text-text-muted">
                <span>{{ project.issues }} issues</span>
                <span>Last: {{ project.lastAudit }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Heatmap Visualization -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <h3 class="font-semibold text-text-primary mb-4">Issue Heatmap</h3>
          <div class="grid grid-cols-5 gap-1.5">
            <div 
              v-for="i in 25" 
              :key="i"
              class="aspect-square rounded-md transition-colors cursor-pointer hover:ring-2 hover:ring-primary-500"
              :class="[
                i % 7 === 0 ? 'bg-danger-500/60' :
                i % 5 === 0 ? 'bg-warning-500/50' :
                i % 3 === 0 ? 'bg-warning-500/30' :
                'bg-success-500/20'
              ]"
              :title="`File ${i}: ${i % 7 === 0 ? 'Critical' : i % 5 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : 'No'} issues`"
            ></div>
          </div>
          <div class="flex items-center justify-between mt-4 text-xs text-text-muted">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-success-500/20"></span>
                Clean
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-warning-500/50"></span>
                Issues
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded bg-danger-500/60"></span>
                Critical
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-surface-800 border border-border rounded-2xl p-5">
          <h3 class="font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <button class="w-full flex items-center gap-3 p-3 bg-surface-700 hover:bg-surface-600 rounded-xl transition-colors text-left">
              <RefreshCw class="w-5 h-5 text-primary-400" />
              <div>
                <p class="text-sm font-medium text-text-primary">Run Full Audit</p>
                <p class="text-xs text-text-muted">Scan all Figma files</p>
              </div>
            </button>
            <button class="w-full flex items-center gap-3 p-3 bg-surface-700 hover:bg-surface-600 rounded-xl transition-colors text-left">
              <Download class="w-5 h-5 text-primary-400" />
              <div>
                <p class="text-sm font-medium text-text-primary">Generate Report</p>
                <p class="text-xs text-text-muted">Export for stakeholders</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>
