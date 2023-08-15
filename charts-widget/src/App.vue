<template>
  <div id="app">
    <v-chart
      v-if="chartLib === 'eCharts'"
      :id="'chart' + id"
      :option="option"
      autoresize
      style="height: 400px"
    />

    <apexchart
      v-if="chartLib === 'apexCharts'"
      :id="'chart' + id"
      :key="option.length"
      :options="option"
      :series="option.series"
    ></apexchart>

    <ChartJS v-if="chartLib === 'chartjs'" :id="id" :option="option" />
  </div>
</template>

<script setup>
import ChartJS from "../../chart-container/src/components/charts/ChartJS.vue";

const props = defineProps({
  option: Object,
  chartLib: String,
  id: String,
});
</script>
