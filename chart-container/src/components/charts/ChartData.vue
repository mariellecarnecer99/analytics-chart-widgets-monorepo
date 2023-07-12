<template>
  <EChart v-if="chartLib === 'eCharts'" :option="options" />
  <ApexCharts v-if="chartLib === 'apexCharts'" />
  <ChartJS v-if="chartLib === 'chartjs'" />
</template>

<script>
import EChart from "./EChart.vue";
import ApexCharts from "./ApexChart.vue";
import ChartJS from "./ChartJS.vue";
import { useSelectedChart } from "../../stores/fetchSelectedChart";
const store = useSelectedChart();
export default {
  components: {
    EChart,
    ApexCharts,
    ChartJS,
  },
  props: {
    chartType: String,
    chartLib: String,
  },
  data: () => {
    return {
      options: null,
    };
  },
  mounted() {
    this.handleOptions();
  },
  methods: {
    handleOptions() {
      this.options = {
        xAxis: {
          type: "category",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70],
            type: this.chartType,
          },
        ],
      };
      store.getChartOptions(this.options);
    },
  },
};
</script>
