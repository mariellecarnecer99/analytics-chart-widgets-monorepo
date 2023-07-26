<template>
  <canvas :id="'chart' + id"></canvas>
</template>

<script>
import { Chart } from "chart.js";
export default {
  name: "ChartJS",
  props: {
    id: String,
    option: Object,
  },
  data: () => {
    return {};
  },
  watch: {
    option: [
      {
        handler: "getOptions",
      },
    ],
  },
  mounted() {},
  methods: {
    getOptions(el) {
      console.log(el);
      const ctx = document.getElementById("chart" + this.id);
      // new Chart(ctx, el);

      var chartExist = Chart.getChart("chart" + this.id); // <canvas> id
      console.log(chartExist);
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
