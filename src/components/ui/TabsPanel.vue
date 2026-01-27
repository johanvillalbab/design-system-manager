<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  tabs: { id: string; label: string; icon?: any }[]
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = ref(props.modelValue || props.tabs[0]?.id || '')

watch(() => props.modelValue, (newVal) => {
  if (newVal) activeTab.value = newVal
})

function selectTab(tabId: string) {
  activeTab.value = tabId
  emit('update:modelValue', tabId)
}
</script>

<template>
  <div>
    <!-- Tab Headers -->
    <div class="flex border-b border-border">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        class="relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
        :class="[
          activeTab === tab.id
            ? 'text-primary-400'
            : 'text-text-secondary hover:text-text-primary'
        ]"
      >
        <component v-if="tab.icon" :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
        
        <!-- Active indicator -->
        <span 
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-t-full"
        ></span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="py-4">
      <slot :name="activeTab" :active-tab="activeTab">
        <slot />
      </slot>
    </div>
  </div>
</template>
