<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  steps: { id: string; label: string; description?: string }[]
  currentStep: number
}>()

function getStepStatus(index: number) {
  if (index < props.currentStep) return 'completed'
  if (index === props.currentStep) return 'current'
  return 'upcoming'
}
</script>

<template>
  <nav aria-label="Progress">
    <ol class="flex items-center">
      <li 
        v-for="(step, index) in steps" 
        :key="step.id"
        class="relative flex items-center"
        :class="{ 'flex-1': index < steps.length - 1 }"
      >
        <!-- Step Circle -->
        <div class="flex items-center">
          <div 
            class="relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300"
            :class="{
              'bg-primary-600 border-primary-600': getStepStatus(index) === 'completed',
              'bg-primary-600/20 border-primary-500': getStepStatus(index) === 'current',
              'bg-surface-700 border-surface-500': getStepStatus(index) === 'upcoming'
            }"
          >
            <Check 
              v-if="getStepStatus(index) === 'completed'" 
              class="w-5 h-5 text-white" 
            />
            <span 
              v-else 
              class="text-sm font-semibold"
              :class="{
                'text-primary-400': getStepStatus(index) === 'current',
                'text-text-muted': getStepStatus(index) === 'upcoming'
              }"
            >
              {{ index + 1 }}
            </span>
          </div>

          <!-- Step Label (visible on larger screens) -->
          <div class="hidden sm:block ml-4 min-w-0">
            <p 
              class="text-sm font-medium"
              :class="{
                'text-primary-400': getStepStatus(index) === 'current',
                'text-text-primary': getStepStatus(index) === 'completed',
                'text-text-muted': getStepStatus(index) === 'upcoming'
              }"
            >
              {{ step.label }}
            </p>
            <p v-if="step.description" class="text-xs text-text-muted mt-0.5">
              {{ step.description }}
            </p>
          </div>
        </div>

        <!-- Connector Line -->
        <div 
          v-if="index < steps.length - 1"
          class="flex-1 mx-4 h-0.5 rounded-full transition-all duration-300"
          :class="{
            'bg-primary-500': getStepStatus(index) === 'completed',
            'bg-surface-500': getStepStatus(index) !== 'completed'
          }"
        ></div>
      </li>
    </ol>
  </nav>
</template>
