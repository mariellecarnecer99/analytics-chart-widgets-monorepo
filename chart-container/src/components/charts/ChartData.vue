<template>
  <EChart v-if="chartLib === 'eCharts'" :option="options" />
  <ApexCharts v-if="chartLib === 'apexCharts'" />
  <ChartJS v-if="chartLib === 'chartjs'" />
</template>

<script>
import EChart from "./EChart.vue";
import ApexCharts from "./ApexChart.vue";
import ChartJS from "./ChartJS.vue";
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
        toolbox: {
          feature: {
            myEditFeature: {
              show: true,
              title: "Edit Data",
              icon: "M33.87,8.32,28,2.42a2.07,2.07,0,0,0-2.92,0L4.27,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13.09,32,33.87,11.24A2.07,2.07,0,0,0,33.87,8.32ZM12.09,30.2,4.32,31.83l1.77-7.62L21.66,8.7l6,6ZM29,13.25l-6-6,3.48-3.46,5.9,6Z",
              onclick: () => {},
            },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
            myEmbedFeature: {
              show: true,
              title: "Add to website",
              icon: "M27,31.36H3c-1.301,0-2.36-1.059-2.36-2.36V5c0-1.301,1.059-2.36,2.36-2.36h13v0.72H3C2.096,3.36,1.36,4.096,1.36,5v24c0,0.904,0.736,1.64,1.64,1.64h24c0.904,0,1.64-0.735,1.64-1.64V16h0.721v13C29.36,30.302,28.302,31.36,27,31.36z M23,18.36h-9.36V9h0.72v8.131L30.745,0.746l0.51,0.509L14.869,17.64H23V18.36z",
              onclick: () => {},
            },
          },
        },
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
    },
  },
};
</script>
