<template>
  <canvas :id="'chart' + id"></canvas>
</template>

<script>
import { Chart } from "chart.js";
import chartData from "./Chart";
export default {
  name: "ChartJS",
  props: {
    id: String,
    option: Object,
  },
  data: () => {
    return {
      chartData: chartData,
    };
  },
  computed: {
    datacollectionComputed() {
      return this.option;
    },
  },
  watch: {
    datacollectionComputed(newValue, oldValue) {
      this.chartData.data = newValue.data;
      this.chartData.type = newValue.type;
    },
  },
  mounted() {
    const ctx = document.getElementById("chart" + this.id);
    new Chart(ctx, this.chartData);
  },
};
</script>
