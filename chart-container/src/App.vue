<template>
  <div>
    <grid-layout
      :layout="selectedCharts"
      :col-num="12"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in selectedCharts"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <ChartData
          :chartType="item.chart?.value"
          :chartLib="item.selectedLib"
          :chartId="item.i"
          :control="item.selectedControl"
          :selectedChartsLength="selectedChartsLength"
        />
        <span class="remove" @click="removeItem(item.i)"
          ><v-icon size="small">mdi-close</v-icon></span
        >
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup>
import ChartData from "./components/charts/ChartData";
import { ref, watch, inject } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../dashboard/src/stores/selectedChartItems";

const store = useStore();
const { selectedCharts } = storeToRefs(store);

const eventBus = inject("eventBus");

let selectedChartsLength = ref();

watch(
  selectedCharts,
  (state) => {
    console.log("state: ", state);
    selectedChartsLength = state.length;
    eventBus.emit("widgetsCounter", selectedChartsLength);
    eventBus.emit("selectedWidgets", state);
  },
  { deep: true }
);

// functions
function removeItem(i) {
  const index = this.selectedCharts.map((item) => item.i).indexOf(i);
  this.selectedCharts.splice(index, 1);
}
</script>

<style scoped>
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  /* background: #ccc; */
  border: 1px solid black;
  padding: 65px 0 35px 0;
}

.vue-grid-item.resizing {
  opacity: 0.9;
}

.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
</style>
