<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import type { ChatMessage, ChatAction } from '@/types/chat'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  message: ChatMessage
}>()

const router = useRouter()
const chatStore = useChatStore()

const timeFormatted = computed(() => {
  const d = new Date(props.message.timestamp)
  return d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
})

const isUser = computed(() => props.message.role === 'user')

function handleAction(action: ChatAction) {
  if (action.type === 'navigate') {
    chatStore.deactivate()
    router.push(action.payload)
  } else if (action.type === 'trigger') {
    chatStore.sendMessage(action.payload)
  }
}

function badgeClasses(color?: string) {
  switch (color) {
    case 'success': return 'bg-success-500/15 text-success-400 border-success-500/20'
    case 'warning': return 'bg-warning-500/15 text-warning-400 border-warning-500/20'
    case 'danger': return 'bg-danger-500/15 text-danger-400 border-danger-500/20'
    case 'info': return 'bg-secondary-500/15 text-secondary-400 border-secondary-500/20'
    case 'accent': return 'bg-accent-500/15 text-accent-400 border-accent-500/20'
    default: return 'bg-surface-600/30 text-text-muted border-border/50'
  }
}

function statusDotClass(status?: string) {
  switch (status) {
    case 'success': return 'bg-success-500'
    case 'warning': return 'bg-warning-500'
    case 'danger': return 'bg-danger-500'
    case 'info': return 'bg-secondary-500'
    default: return 'bg-text-muted'
  }
}

/** Simple inline markdown: **bold** and `code` */
function formatText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-text-primary">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-surface-600/50 text-accent-400 text-[11px] font-mono">$1</code>')
}
</script>

<template>
  <div
    class="flex gap-3 animate-fade-up"
    :class="isUser ? 'justify-end' : 'justify-start'"
  >
    <!-- Assistant avatar -->
    <div
      v-if="!isUser"
      class="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center flex-shrink-0 mt-0.5"
    >
      <span class="text-surface-950 font-bold text-xs">DS</span>
    </div>

    <!-- Message bubble -->
    <div
      class="max-w-[85%] min-w-0"
      :class="isUser ? 'order-first' : ''"
    >
      <div
        class="rounded-2xl px-4 py-3 text-sm leading-relaxed"
        :class="[
          isUser
            ? 'bg-accent-500/15 border border-accent-500/25 text-text-primary rounded-br-md'
            : 'bg-surface-800/60 border border-border text-text-secondary rounded-bl-md'
        ]"
      >
        <!-- Text content with inline markdown -->
        <p v-html="formatText(message.content)" class="whitespace-pre-wrap"></p>

        <!-- Structured data items -->
        <div v-if="message.data?.items" class="mt-3 space-y-1.5">
          <div
            v-for="(item, idx) in message.data.items"
            :key="idx"
            class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-surface-700/20 border border-border/30"
          >
            <span class="text-xs text-text-muted">{{ item.label }}</span>
            <div class="flex items-center gap-2">
              <span
                v-if="item.status"
                class="w-1.5 h-1.5 rounded-full"
                :class="statusDotClass(item.status)"
              ></span>
              <span class="text-xs font-mono font-medium text-text-primary">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- List items -->
        <div v-if="message.data?.list" class="mt-3 space-y-1.5">
          <div
            v-for="(item, idx) in message.data.list"
            :key="idx"
            class="flex items-start justify-between gap-3 py-2 px-3 rounded-lg bg-surface-700/20 border border-border/30"
          >
            <p v-html="formatText(item.text)" class="text-xs leading-snug flex-1 min-w-0"></p>
            <span
              v-if="item.badge"
              class="text-[10px] px-2 py-0.5 rounded-md border font-medium flex-shrink-0"
              :class="badgeClasses(item.badgeColor)"
            >
              {{ item.badge }}
            </span>
          </div>
        </div>

        <!-- Action buttons -->
        <div v-if="message.actions?.length" class="mt-3 flex flex-wrap gap-2">
          <button
            v-for="action in message.actions"
            :key="action.payload"
            @click="handleAction(action)"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border"
            :class="[
              action.type === 'navigate'
                ? 'bg-accent-500/10 text-accent-400 border-accent-500/20 hover:bg-accent-500/20'
                : 'bg-surface-600/30 text-text-secondary border-border/50 hover:bg-surface-600/50'
            ]"
          >
            {{ action.label }}
            <ArrowRight v-if="action.type === 'navigate'" class="w-3 h-3" />
          </button>
        </div>
      </div>

      <!-- Timestamp -->
      <p
        class="text-[10px] text-text-muted mt-1.5 px-1"
        :class="isUser ? 'text-right' : 'text-left'"
      >
        {{ timeFormatted }}
      </p>
    </div>
  </div>
</template>
