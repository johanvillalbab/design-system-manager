<script setup lang="ts">
import { ref } from 'vue'
import { X, Check } from 'lucide-vue-next'

const props = defineProps<{
  options: { id: string; label: string }[]
  selected: string[]
  label?: string
}>()

const emit = defineEmits<{
  toggle: [id: string]
  clear: []
}>()

// Track which chips are animating
const animatingChips = ref<Set<string>>(new Set())

function isSelected(id: string) {
  return props.selected.includes(id)
}

function handleToggle(id: string) {
  // Add to animating set
  animatingChips.value.add(id)
  
  // Emit toggle
  emit('toggle', id)
  
  // Remove from animating set after animation completes
  setTimeout(() => {
    animatingChips.value.delete(id)
  }, 300)
}

function isAnimating(id: string) {
  return animatingChips.value.has(id)
}
</script>

<template>
  <div class="space-y-2.5">
    <div v-if="label" class="flex items-center justify-between">
      <span class="text-[10px] font-semibold text-text-muted uppercase tracking-[0.15em]">{{ label }}</span>
      <Transition name="fade">
        <button
          v-if="selected.length > 0"
          @click="emit('clear')"
          class="text-[10px] text-text-muted hover:text-accent-400 transition-colors uppercase tracking-wider"
        >
          Clear
        </button>
      </Transition>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in options"
        :key="option.id"
        @click="handleToggle(option.id)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border chip-button"
        :class="[
          isSelected(option.id)
            ? 'bg-accent-500/15 text-accent-400 border-accent-500/25'
            : 'bg-surface-700/30 text-text-muted hover:bg-surface-600/40 hover:text-text-secondary border-border/50 hover:border-border',
          isAnimating(option.id) && isSelected(option.id) ? 'animate-pop-in' : '',
          isAnimating(option.id) && !isSelected(option.id) ? 'animate-pop-out' : ''
        ]"
      >
        <span 
          v-if="isSelected(option.id)" 
          class="check-icon"
          :class="{ 'animate-check-in': isAnimating(option.id) }"
        >
          <Check class="w-3 h-3" />
        </span>
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.chip-button {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.chip-button:active {
  transform: scale(0.95);
}

@keyframes pop-in {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pop-out {
  0% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pop-in {
  animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-pop-out {
  animation: pop-out 0.2s ease-out;
}

/* Check icon animation */
.check-icon {
  display: inline-flex;
}

@keyframes check-in {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.animate-check-in {
  animation: check-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
