<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from 'vue'

const props = defineProps<{
  tabs: { id: string; label: string; icon?: any }[]
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = ref(props.modelValue || props.tabs[0]?.id || '')
const tabRefs = ref<HTMLElement[]>([])
const indicatorStyle = ref({ left: '0px', width: '0px' })
const isInitialized = ref(false)
const direction = ref<'left' | 'right'>('right')

// Track previous tab for animation direction
const previousTab = ref(activeTab.value)

watch(() => props.modelValue, (newVal) => {
  if (newVal && newVal !== activeTab.value) {
    const oldIndex = props.tabs.findIndex(t => t.id === activeTab.value)
    const newIndex = props.tabs.findIndex(t => t.id === newVal)
    direction.value = newIndex > oldIndex ? 'right' : 'left'
    previousTab.value = activeTab.value
    activeTab.value = newVal
    updateIndicator()
  }
})

function selectTab(tabId: string) {
  if (tabId === activeTab.value) return
  
  const oldIndex = props.tabs.findIndex(t => t.id === activeTab.value)
  const newIndex = props.tabs.findIndex(t => t.id === tabId)
  direction.value = newIndex > oldIndex ? 'right' : 'left'
  previousTab.value = activeTab.value
  activeTab.value = tabId
  emit('update:modelValue', tabId)
  updateIndicator()
}

function updateIndicator() {
  nextTick(() => {
    const activeIndex = props.tabs.findIndex(t => t.id === activeTab.value)
    const activeElement = tabRefs.value[activeIndex]
    if (activeElement) {
      indicatorStyle.value = {
        left: `${activeElement.offsetLeft}px`,
        width: `${activeElement.offsetWidth}px`
      }
    }
  })
}

function setTabRef(el: any, index: number) {
  if (el) tabRefs.value[index] = el
}

onMounted(() => {
  nextTick(() => {
    updateIndicator()
    // Small delay to enable animations after initial render
    setTimeout(() => {
      isInitialized.value = true
    }, 100)
  })
})

// Computed class for content transition direction
const transitionName = computed(() => {
  return direction.value === 'right' ? 'tab-slide-right' : 'tab-slide-left'
})
</script>

<template>
  <div>
    <!-- Tab Headers -->
    <div class="relative flex border-b border-border">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :ref="(el) => setTabRef(el, index)"
        @click="selectTab(tab.id)"
        class="relative flex items-center gap-2 px-4 py-3.5 text-xs font-medium uppercase tracking-wider z-10"
        :class="[
          activeTab === tab.id
            ? 'text-accent-400'
            : 'text-text-muted hover:text-text-secondary',
          'transition-colors duration-200'
        ]"
      >
        <component 
          v-if="tab.icon" 
          :is="tab.icon" 
          class="w-3.5 h-3.5 transition-transform duration-200"
          :class="{ 'scale-110': activeTab === tab.id }"
        />
        {{ tab.label }}
      </button>

      <!-- Animated Active Indicator -->
      <span
        class="absolute bottom-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-500/50 rounded-full"
        :class="isInitialized ? 'transition-all duration-300 ease-out' : ''"
        :style="indicatorStyle"
      ></span>
    </div>

    <!-- Tab Content with Transitions -->
    <div class="py-4 relative overflow-hidden">
      <Transition :name="transitionName" mode="out-in">
        <div :key="activeTab" class="animate-content-reveal">
          <slot :name="activeTab" :active-tab="activeTab">
            <slot />
          </slot>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Slide Right Transition */
.tab-slide-right-enter-active,
.tab-slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-slide-right-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.tab-slide-right-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Slide Left Transition */
.tab-slide-left-enter-active,
.tab-slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-slide-left-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.tab-slide-left-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
