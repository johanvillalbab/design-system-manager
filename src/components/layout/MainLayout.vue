<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="min-h-screen bg-surface-950 flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <Header />

      <!-- Page Content -->
      <main class="flex-1 overflow-auto px-8 py-7">
        <slot />
      </main>
    </div>
  </div>
</template>
