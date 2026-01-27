<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentRequest } from '@/types'
import { ThumbsUp, MessageSquare, Paperclip, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  request: ComponentRequest
  hasVoted?: boolean
}>()

const emit = defineEmits<{
  vote: [id: string]
  view: [id: string]
}>()

const statusConfig = computed(() => {
  const configs = {
    submitted: {
      label: 'Submitted',
      color: 'bg-surface-600 text-text-secondary'
    },
    under_review: {
      label: 'Under Review',
      color: 'bg-warning-500/15 text-warning-500'
    },
    in_development: {
      label: 'In Development',
      color: 'bg-primary-500/15 text-primary-400'
    },
    ready: {
      label: 'Ready',
      color: 'bg-success-500/15 text-success-500'
    }
  }
  return configs[props.request.status]
})

const priorityConfig = computed(() => {
  const configs = {
    low: { label: 'Low', color: 'text-text-muted' },
    medium: { label: 'Medium', color: 'text-text-secondary' },
    high: { label: 'High', color: 'text-warning-500' },
    critical: { label: 'Critical', color: 'text-danger-500' }
  }
  return configs[props.request.priority]
})

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <article class="bg-surface-800 border border-border rounded-xl p-5 transition-all duration-200 hover:bg-surface-700/50 hover:shadow-lg group">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex items-center gap-3">
        <img 
          :src="request.author.avatar" 
          :alt="request.author.name"
          class="w-10 h-10 rounded-full ring-2 ring-surface-600"
        />
        <div>
          <h3 class="font-semibold text-text-primary group-hover:text-primary-400 transition-colors">
            {{ request.title }}
          </h3>
          <p class="text-sm text-text-muted">
            by {{ request.author.name }} · {{ formatDate(request.createdAt) }}
          </p>
        </div>
      </div>
      <span 
        class="px-2.5 py-1 rounded-full text-xs font-medium shrink-0"
        :class="statusConfig.color"
      >
        {{ statusConfig.label }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-sm text-text-secondary mb-4 line-clamp-2">
      {{ request.description }}
    </p>

    <!-- Meta Info -->
    <div class="flex items-center gap-4 text-sm text-text-muted mb-4">
      <span :class="priorityConfig.color">
        {{ priorityConfig.label }} Priority
      </span>
      <span>{{ request.affectedProjects }} projects</span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-border">
      <div class="flex items-center gap-4">
        <!-- Vote Button -->
        <button
          @click.stop="emit('vote', request.id)"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
          :class="[
            hasVoted
              ? 'bg-primary-600/20 text-primary-400'
              : 'bg-surface-700 text-text-secondary hover:bg-surface-600 hover:text-text-primary'
          ]"
        >
          <ThumbsUp class="w-4 h-4" :class="{ 'fill-current': hasVoted }" />
          <span class="font-medium">{{ request.votes }}</span>
        </button>

        <!-- Comments -->
        <div class="flex items-center gap-1.5 text-text-muted">
          <MessageSquare class="w-4 h-4" />
          <span>{{ request.comments.length }}</span>
        </div>

        <!-- Attachments -->
        <div v-if="request.attachments.length > 0" class="flex items-center gap-1.5 text-text-muted">
          <Paperclip class="w-4 h-4" />
          <span>{{ request.attachments.length }}</span>
        </div>
      </div>

      <!-- View Details -->
      <button
        @click="emit('view', request.id)"
        class="flex items-center gap-1 text-sm text-text-muted hover:text-primary-400 transition-colors"
      >
        View
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </article>
</template>
