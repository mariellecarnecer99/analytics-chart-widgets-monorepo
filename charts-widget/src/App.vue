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

    <canvas v-if="chartLib === 'chartjs'" :id="'chart' + id"></canvas>
  </div>
</template>

<script setup>
import { Chart } from "chart.js";

const props = defineProps({
  option: Object,
  chartLib: String,
  id: String,
});

if (props.chartLib === "chartjs") {
  const ctx = document.getElementById("chart" + props.id);
  console.log("ctx: ", ctx);

  var chartExist = Chart.getChart("chart" + props.id);
  if (chartExist != undefined) {
    chartExist.destroy();
    chartExist = new Chart(ctx, props.option);
    console.log("props.option: ", props.option);
  } else {
    chartExist = new Chart(ctx, props.option);
    console.log("props.option: ", props.option);
  }
}
</script>
