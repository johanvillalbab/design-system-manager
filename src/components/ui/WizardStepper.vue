<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  steps: { id: string; label: string; description?: string }[]
  currentStep: number
}>()

// Track recently completed steps for animation
const recentlyCompleted = ref<Set<number>>(new Set())

watch(() => props.currentStep, (newStep, oldStep) => {
  if (newStep > oldStep) {
    recentlyCompleted.value.add(oldStep)
    setTimeout(() => {
      recentlyCompleted.value.delete(oldStep)
    }, 500)
  }
})

function getStepStatus(index: number) {
  if (index < props.currentStep) return 'completed'
  if (index === props.currentStep) return 'current'
  return 'upcoming'
}

function isRecentlyCompleted(index: number) {
  return recentlyCompleted.value.has(index)
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
        <!-- Step Circle with Animation -->
        <div class="flex items-center">
          <div
            class="relative flex items-center justify-center w-9 h-9 rounded-xl border step-circle"
            :class="{
              'bg-accent-500/20 border-accent-500/40': getStepStatus(index) === 'completed',
              'bg-accent-500/10 border-accent-500/30 step-current': getStepStatus(index) === 'current',
              'bg-surface-700/50 border-border': getStepStatus(index) === 'upcoming',
              'step-complete-animation': isRecentlyCompleted(index)
            }"
          >
            <!-- Animated Check Icon -->
            <Transition name="check" mode="out-in">
              <Check
                v-if="getStepStatus(index) === 'completed'"
                class="w-4 h-4 text-accent-400"
                :class="{ 'check-animate': isRecentlyCompleted(index) }"
              />
              <span
                v-else
                class="text-xs font-semibold font-mono transition-all duration-300"
                :class="{
                  'text-accent-400 scale-110': getStepStatus(index) === 'current',
                  'text-text-muted': getStepStatus(index) === 'upcoming'
                }"
              >
                {{ index + 1 }}
              </span>
            </Transition>

            <!-- Pulse ring for current step -->
            <span 
              v-if="getStepStatus(index) === 'current'"
              class="absolute inset-0 rounded-xl animate-pulse-ring"
            ></span>
          </div>

          <!-- Step Label (visible on larger screens) -->
          <div class="hidden sm:block ml-3 min-w-0">
            <p
              class="text-xs font-medium transition-all duration-300"
              :class="{
                'text-accent-400': getStepStatus(index) === 'current',
                'text-text-secondary': getStepStatus(index) === 'completed',
                'text-text-muted': getStepStatus(index) === 'upcoming'
              }"
            >
              {{ step.label }}
            </p>
            <p v-if="step.description" class="text-[10px] text-text-muted mt-0.5 transition-opacity duration-300">
              {{ step.description }}
            </p>
          </div>
        </div>

        <!-- Animated Connector Line -->
        <div
          v-if="index < steps.length - 1"
          class="flex-1 mx-4 h-px relative overflow-hidden"
        >
          <!-- Background line -->
          <div class="absolute inset-0 bg-surface-500/30"></div>
          <!-- Progress fill -->
          <div 
            class="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-500/50 to-accent-500/20 transition-all duration-500 ease-out"
            :style="{ width: getStepStatus(index) === 'completed' ? '100%' : '0%' }"
          ></div>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.step-circle {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.step-current {
  animation: step-pulse 2s ease-in-out infinite;
}

@keyframes step-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.1);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.05);
  }
}

.step-complete-animation {
  animation: step-complete 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes step-complete {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.check-animate {
  animation: check-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes check-pop {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* Check icon transition */
.check-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.check-leave-active {
  transition: all 0.2s ease-out;
}

.check-enter-from {
  opacity: 0;
  transform: scale(0) rotate(-45deg);
}

.check-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.animate-pulse-ring {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.2);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(251, 191, 36, 0);
  }
}
</style>
