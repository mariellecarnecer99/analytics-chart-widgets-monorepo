<template>
  <canvas :id="'chart' + id"></canvas>
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "ChartJS",
  props: {
    id: Number,
    option: Object,
  },
  watch: {
    option: [
      {
        handler: "getOptions",
      },
    ],
  },
  methods: {
    getOptions(el) {
      const ctx = document.getElementById("chart" + this.id);

      var chartExist = Chart.getChart("chart" + this.id);
      if (chartExist != undefined) {
        chartExist.destroy();
        chartExist = new Chart(ctx, el);
      } else {
        chartExist = new Chart(ctx, el);
      }
    },
  },
};
</script>
