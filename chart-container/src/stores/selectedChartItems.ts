import { defineStore } from "pinia";
import { useStore } from "../../../dashboard/src/stores/selectedChartItems";

export const useChartItemsStore = defineStore("chartItems", {
  state: () => ({ selectedCharts: [] }),
  // getters: {
  //   getSelectedCharts(): [] {
  //     return this.selectedCharts;
  //   },
  // },
  actions: {
    fetchSelectedChartItems() {
      console.log(useStore)
      return useStore
    }
  },
});

// declare global {
//   interface Window {
//     useStore: typeof _useStore;
//   }
// }

// export const useStore = window.useStore || _useStore;
