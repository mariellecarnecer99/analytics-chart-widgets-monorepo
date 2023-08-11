<template>
  <!-- <router-view /> -->
  <div id="app">
    <v-chart class="chart" :option="option" autoresize style="height: 400px" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSelectedChart } from "../../chart-container/src/stores/fetchSelectedChart";
const store = useSelectedChart();
const { fetchChartOptions } = storeToRefs(store);
const option = fetchChartOptions;
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
