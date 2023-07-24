<template>
  <canvas :id="'chart' + id"></canvas>
</template>

<script>
import { Chart } from "chart.js";
import planetChartData from "./Chart";
export default {
  name: "ChartJS",
  props: {
    id: String,
    chartType: String,
  },
  data: () => {
    return {
      planetChartData: planetChartData,
    };
  },
  mounted() {
    this.planetChartData.type = this.chartType;
    const ctx = document.getElementById("chart" + this.id);
    new Chart(ctx, this.planetChartData);
  },
};
</script>
