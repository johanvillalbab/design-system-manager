<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps<{
  labels: string[]
  data: number[]
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{
    label: 'Adoption Rate',
    data: props.data,
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#6366f1',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1a24',
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      borderColor: '#2e2e3a',
      borderWidth: 1,
      padding: 12,
      displayColors: false
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(46, 46, 58, 0.5)' },
      ticks: { color: '#64748b' }
    },
    y: {
      grid: { color: 'rgba(46, 46, 58, 0.5)' },
      ticks: { color: '#64748b' },
      min: 0,
      max: 100
    }
  }
}
</script>

<template>
  <div class="h-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
