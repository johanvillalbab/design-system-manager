<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'
import { Send } from 'lucide-vue-next'

const emit = defineEmits<{
  send: [text: string]
}>()

const chatStore = useChatStore()
const input = ref('')
const inputRef = ref<HTMLTextAreaElement | null>(null)
const showSuggestions = ref(false)
const triggerSelected = ref(false)

const filteredTriggers = computed(() => {
  if (!input.value.startsWith('/')) return []
  const cmd = input.value.toLowerCase().split(' ')[0] ?? ''
  return chatStore.triggers.filter(t => t.command.startsWith(cmd))
})

watch(() => input.value, (val) => {
  if (triggerSelected.value) {
    triggerSelected.value = false
    return
  }
  showSuggestions.value = val.startsWith('/') && filteredTriggers.value.length > 0
})

function handleSend() {
  const text = input.value.trim()
  if (!text) return
  emit('send', text)
  input.value = ''
  showSuggestions.value = false
  nextTick(() => inputRef.value?.focus())
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
  if (e.key === 'Escape') {
    showSuggestions.value = false
  }
}

function selectTrigger(command: string) {
  triggerSelected.value = true
  input.value = command + ' '
  showSuggestions.value = false
  nextTick(() => inputRef.value?.focus())
}

function autoResize(e: Event) {
  const target = e.target as HTMLTextAreaElement
  target.style.height = 'auto'
  target.style.height = Math.min(target.scrollHeight, 120) + 'px'
}

defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<template>
  <div class="relative">
    <!-- Trigger autocomplete -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="showSuggestions && filteredTriggers.length > 0"
        class="absolute bottom-full left-0 right-0 mb-2 bg-surface-800/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/30 overflow-hidden z-10"
      >
        <div class="p-2">
          <p class="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em]">Comandos</p>
          <button
            v-for="trigger in filteredTriggers"
            :key="trigger.command"
            @click="selectTrigger(trigger.command)"
            class="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-surface-700/50 transition-colors group"
          >
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-text-primary font-mono">{{ trigger.command }}</p>
              <p class="text-xs text-text-muted mt-0.5 truncate">{{ trigger.description }}</p>
            </div>
            <span v-if="trigger.example" class="text-[10px] text-text-muted font-mono mt-1">{{ trigger.example }}</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Input area -->
    <div class="bg-surface-800/60 border border-border rounded-2xl overflow-hidden focus-within:border-accent-500/30 focus-within:ring-1 focus-within:ring-accent-500/15 transition-all">
      <div class="flex items-end gap-2 p-3">
        <textarea
          ref="inputRef"
          v-model="input"
          @keydown="handleKeydown"
          @input="autoResize"
          placeholder="Escribe un mensaje o usa / para ver comandos..."
          rows="1"
          class="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none min-h-[36px] max-h-[120px] py-1.5 px-1 leading-relaxed"
        ></textarea>
        <button
          @click="handleSend"
          :disabled="!input.trim()"
          class="p-2.5 rounded-xl transition-all duration-200 flex-shrink-0"
          :class="[
            input.trim()
              ? 'bg-accent-500 text-surface-950 hover:bg-accent-400'
              : 'bg-surface-700/50 text-text-muted cursor-not-allowed'
          ]"
        >
          <Send class="w-4 h-4" />
        </button>
      </div>
      <div class="px-4 pb-2.5 flex items-center">
        <span class="text-[10px] text-text-muted/50">Enter para enviar · Shift+Enter nueva línea</span>
      </div>
    </div>
  </div>
</template>
