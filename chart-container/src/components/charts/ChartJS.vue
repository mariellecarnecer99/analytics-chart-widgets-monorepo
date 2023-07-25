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
    chartType: String,
    option: Object,
    modifiedType: String,
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

    charttypeComputed() {
      return this.modifiedType;
    },
  },
  watch: {
    datacollectionComputed(newValue, oldValue) {
      this.chartData.data = newValue;
    },

    charttypeComputed(newValue, oldValue) {
      console.log(newValue);
    },
  },
  mounted() {
    this.chartData.type = this.chartType;
    const ctx = document.getElementById("chart" + this.id);
    new Chart(ctx, this.chartData);
  },
};
</script>
