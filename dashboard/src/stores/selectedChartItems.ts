import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({ selectedCharts: [], index: 0 }),
  getters: {
    getSelectedCharts(): [] {
      return this.selectedCharts;
    },
  },
  actions: {
    increment(i: [], selectedChartLibrary: string) {
      const item = {
        x: 0,
        y: 0,
        w: 6,
        h: 3,
        i: this.index,
        chart: i,
        selectedLib: selectedChartLibrary,
      };
      this.index++;
      this.selectedCharts.push(item);
    },
    addedControl(control: boolean) {
      const item = {
        x: 0,
        y: 0,
        w: 3,
        h: 1,
        i: this.index,
        selectedControl: control,
      };
      this.index++;
      this.selectedCharts.push(item);
    },
  },
});

declare global {
  interface Window {
    useStore: typeof useStore;
  }
}
window.useStore = useStore;
