<script setup lang="ts">
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

function isSelected(id: string) {
  return props.selected.includes(id)
}
</script>

<template>
  <div class="space-y-2">
    <div v-if="label" class="flex items-center justify-between">
      <span class="text-sm font-medium text-text-secondary">{{ label }}</span>
      <button 
        v-if="selected.length > 0"
        @click="emit('clear')"
        class="text-xs text-text-muted hover:text-text-primary transition-colors"
      >
        Clear
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="option in options"
        :key="option.id"
        @click="emit('toggle', option.id)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
        :class="[
          isSelected(option.id)
            ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
            : 'bg-surface-700 text-text-secondary hover:bg-surface-600 hover:text-text-primary'
        ]"
      >
        <Check v-if="isSelected(option.id)" class="w-3.5 h-3.5" />
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
