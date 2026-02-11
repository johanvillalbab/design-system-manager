<script setup lang="ts">
import { ref, computed } from 'vue'
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
  Check,
  FileText
} from 'lucide-vue-next'

const store = useAuditStore()

const isRunningAudit = ref(false)
const isExporting = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'info'>('success')

const severityFilters = computed(() => [
  { id: null, label: 'All', count: store.stats.totalIssues },
  { id: 'critical', label: 'Critical', count: store.stats.critical, icon: AlertTriangle, color: 'text-danger-400' },
  { id: 'high', label: 'High', count: store.stats.high, icon: AlertCircle, color: 'text-warning-400' },
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
  showNotification('All auto-fixable issues have been resolved!', 'success')
}

function showNotification(message: string, type: 'success' | 'info' = 'success') {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

async function runFullAudit() {
  isRunningAudit.value = true
  // Simulate audit process
  await new Promise(resolve => setTimeout(resolve, 2000))
  isRunningAudit.value = false
  showNotification('Audit completed! Found ' + store.stats.totalIssues + ' issues.', 'info')
}

async function exportPDF() {
  isExporting.value = true
  // Simulate export process
  await new Promise(resolve => setTimeout(resolve, 1500))
  isExporting.value = false
  showNotification('Audit report exported successfully!', 'success')
}

async function generateReport() {
  isExporting.value = true
  // Simulate report generation
  await new Promise(resolve => setTimeout(resolve, 1500))
  isExporting.value = false
  showNotification('Report generated and ready for download!', 'success')
}
</script>

<template>
  <div class="space-y-7">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Issues"
        :value="store.stats.totalIssues"
        :icon="AlertTriangle"
        color="danger"
        class="animate-fade-up stagger-1"
      />
      <MetricCard
        title="Auto-fixable"
        :value="store.stats.autoFixable"
        subtitle="Can be fixed automatically"
        :icon="Wand2"
        color="primary"
        class="animate-fade-up stagger-2"
      />
      <MetricCard
        title="Avg Coverage"
        :value="`${store.stats.avgCoverage}%`"
        :icon="CheckCircle2"
        color="success"
        :trend="3"
        class="animate-fade-up stagger-3"
      />
      <MetricCard
        title="Projects Audited"
        :value="store.projects.length"
        :icon="RefreshCw"
        color="primary"
        class="animate-fade-up stagger-4"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Issues List -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Header & Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-800/40 border border-border rounded-2xl p-4 animate-fade-up stagger-5">
          <div>
            <h2 class="font-display font-semibold text-text-primary tracking-tight">Design Inconsistencies</h2>
            <p class="text-xs text-text-muted mt-0.5">{{ store.filteredIssues.length }} issues found</p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="store.autoFixableIssues.length > 0"
              @click="handleFixAll"
              class="flex items-center gap-2 px-4 py-2 bg-accent-500/15 hover:bg-accent-500/25 text-accent-400 font-medium rounded-xl transition-all text-sm border border-accent-500/20"
            >
              <Wand2 class="w-4 h-4" />
              Fix All ({{ store.autoFixableIssues.length }})
            </button>
            <button 
              @click="exportPDF"
              :disabled="isExporting"
              class="flex items-center gap-2 px-4 py-2 bg-surface-700/50 hover:bg-surface-600/50 text-text-secondary font-medium rounded-xl transition-all text-sm border border-border disabled:opacity-50"
            >
              <Download class="w-4 h-4" :class="{ 'animate-bounce': isExporting }" />
              {{ isExporting ? 'Exporting...' : 'Export PDF' }}
            </button>
          </div>
        </div>

        <!-- Severity Filters -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="filter in severityFilters"
            :key="filter.label"
            @click="store.setSeverityFilter(filter.id as any)"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border"
            :class="[
              store.selectedSeverity === filter.id
                ? 'bg-accent-500/15 text-accent-400 border-accent-500/25'
                : 'bg-surface-800/40 text-text-muted hover:bg-surface-700/50 border-border'
            ]"
          >
            <component v-if="filter.icon" :is="filter.icon" class="w-3.5 h-3.5" :class="store.selectedSeverity !== filter.id && filter.color" />
            {{ filter.label }}
            <span
              class="px-1.5 py-0.5 rounded-md text-[10px] font-mono"
              :class="store.selectedSeverity === filter.id ? 'bg-accent-500/20' : 'bg-surface-600/50'"
            >
              {{ filter.count }}
            </span>
          </button>
        </div>

        <!-- Issues Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IssueCard
            v-for="(issue, index) in store.filteredIssues"
            :key="issue.id"
            :issue="issue"
            @fix="handleFix"
            @ignore="handleIgnore"
            :style="{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }"
            class="animate-fade-up"
          />
        </div>

        <!-- Empty State -->
        <div
          v-if="store.filteredIssues.length === 0"
          class="flex flex-col items-center justify-center py-20 text-center bg-surface-800/40 border border-border rounded-2xl animate-fade-up"
        >
          <div class="w-16 h-16 rounded-2xl bg-success-500/10 flex items-center justify-center mb-5 border border-success-500/15 animate-float">
            <CheckCircle2 class="w-7 h-7 text-success-400" />
          </div>
          <h3 class="text-lg font-display font-semibold text-text-primary mb-2">All Clear!</h3>
          <p class="text-sm text-text-muted max-w-md">
            No issues found matching your filters. Great job maintaining design consistency!
          </p>
        </div>
      </div>

      <!-- Right: Projects Sidebar -->
      <div class="space-y-4">
        <!-- Project Coverage -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5 animate-fade-up stagger-6">
          <h3 class="font-display font-semibold text-text-primary mb-5 text-sm tracking-tight">Project Coverage</h3>
          <div class="space-y-5">
            <div
              v-for="project in store.projects"
              :key="project.id"
              class="group cursor-pointer"
              @click="store.setProjectFilter(store.selectedProject === project.id ? null : project.id)"
            >
              <div class="flex items-center justify-between mb-2">
                <span
                  class="text-sm font-medium transition-colors"
                  :class="store.selectedProject === project.id ? 'text-accent-400' : 'text-text-primary group-hover:text-accent-400'"
                >
                  {{ project.name }}
                </span>
                <span class="text-xs text-text-muted font-mono">{{ project.coverage }}%</span>
              </div>
              <ProgressBar :value="project.coverage" size="sm" />
              <div class="flex items-center justify-between mt-1.5 text-[10px] text-text-muted">
                <span class="font-mono">{{ project.issues }} issues</span>
                <span>Last: {{ project.lastAudit }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Heatmap Visualization -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5 animate-fade-up stagger-7">
          <h3 class="font-display font-semibold text-text-primary mb-5 text-sm tracking-tight">Issue Heatmap</h3>
          <div class="grid grid-cols-5 gap-1.5">
            <div
              v-for="i in 25"
              :key="i"
              class="aspect-square rounded-lg transition-all cursor-pointer hover:ring-1 hover:ring-accent-500/40"
              :class="[
                i % 7 === 0 ? 'bg-danger-500/40' :
                i % 5 === 0 ? 'bg-warning-500/30' :
                i % 3 === 0 ? 'bg-warning-500/15' :
                'bg-success-500/10'
              ]"
              :title="`File ${i}: ${i % 7 === 0 ? 'Critical' : i % 5 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : 'No'} issues`"
            ></div>
          </div>
          <div class="flex items-center justify-between mt-4 text-[10px] text-text-muted">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded bg-success-500/10"></span>
                Clean
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded bg-warning-500/30"></span>
                Issues
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded bg-danger-500/40"></span>
                Critical
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-surface-800/40 border border-border rounded-2xl p-5 animate-fade-up stagger-8">
          <h3 class="font-display font-semibold text-text-primary mb-4 text-sm tracking-tight">Quick Actions</h3>
          <div class="space-y-2">
            <button 
              @click="runFullAudit"
              :disabled="isRunningAudit"
              class="w-full flex items-center gap-3 p-3 bg-surface-700/30 hover:bg-surface-600/40 rounded-xl transition-all text-left border border-border/50 hover:border-border disabled:opacity-50"
            >
              <RefreshCw class="w-4 h-4 text-accent-400" :class="{ 'animate-spin': isRunningAudit }" />
              <div>
                <p class="text-sm font-medium text-text-primary">{{ isRunningAudit ? 'Running Audit...' : 'Run Full Audit' }}</p>
                <p class="text-[10px] text-text-muted">Scan all Figma files</p>
              </div>
            </button>
            <button 
              @click="generateReport"
              :disabled="isExporting"
              class="w-full flex items-center gap-3 p-3 bg-surface-700/30 hover:bg-surface-600/40 rounded-xl transition-all text-left border border-border/50 hover:border-border disabled:opacity-50"
            >
              <FileText class="w-4 h-4 text-accent-400" />
              <div>
                <p class="text-sm font-medium text-text-primary">Generate Report</p>
                <p class="text-[10px] text-text-muted">Export for stakeholders</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl shadow-surface-400/25 border"
          :class="toastType === 'success' ? 'bg-success-500/15 border-success-500/20' : 'bg-accent-500/15 border-accent-500/20'"
        >
          <Check v-if="toastType === 'success'" class="w-5 h-5 text-success-400" />
          <Info v-else class="w-5 h-5 text-accent-400" />
          <p class="text-sm font-medium" :class="toastType === 'success' ? 'text-success-400' : 'text-accent-400'">
            {{ toastMessage }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
