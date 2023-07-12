import { defineStore } from "pinia";

export const useSelectedChart = defineStore("selectedChart", {
  state: () => ({ fetchChartOptions: {}}),
  getters: {
    
  },
  actions: {
    getChartOptions(val: {}){
      this.fetchChartOptions = val;
    }
  },
});

declare global {
  interface Window {
    useSelectedChart: typeof useSelectedChart;
  }
}
window.useSelectedChart = useSelectedChart;
