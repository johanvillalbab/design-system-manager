import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/npm-api': {
        target: 'https://api.npmjs.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/npm-api/, '')
      }
    }
  }
})
