import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'dark' | 'light'

export const useThemeStore = defineStore('theme', () => {
  // Initialize from localStorage or default to 'light'
  const stored = localStorage.getItem('dsm-theme') as ThemeMode | null
  const mode = ref<ThemeMode>(stored || 'light')

  // Apply theme to DOM
  function applyTheme(theme: ThemeMode) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle between dark and light
  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  // Set specific theme
  function setTheme(theme: ThemeMode) {
    mode.value = theme
  }

  // Check helpers
  const isDark = () => mode.value === 'dark'
  const isLight = () => mode.value === 'light'

  // Watch for changes → persist + apply
  watch(mode, (newMode) => {
    localStorage.setItem('dsm-theme', newMode)
    applyTheme(newMode)
  }, { immediate: true })

  return {
    mode,
    toggle,
    setTheme,
    isDark,
    isLight,
  }
})
