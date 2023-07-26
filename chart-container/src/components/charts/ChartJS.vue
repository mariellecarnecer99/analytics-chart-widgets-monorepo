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
      new Chart(ctx, el);
    },
  },
};
</script>
