<template>
  <v-row justify="end" class="mr-3">
    <v-col cols="3">
      <VueDatePicker
        v-model="dates"
        class="mb-3"
        placeholder="Select Date"
        format="MM/dd/yyyy"
        range
        multi-calendars
        teleport-center
        @update:model-value="handleDates"
      />
    </v-col>
  </v-row>
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
          :chartType="item.chart.value"
          :chartLib="item.selectedLib"
          :chartId="item.i"
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
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { storeToRefs } from "pinia";
import { useStore } from "../../dashboard/src/stores/selectedChartItems";
import { useSelectedChart } from "../src/stores/fetchSelectedChart";
const storeForDates = useSelectedChart();
const store = useStore();
const { selectedCharts } = storeToRefs(store);
const dates = ref();
let datesSelected = ref();

// functions
function removeItem(i) {
  const index = this.selectedCharts.map((item) => item.i).indexOf(i);
  this.selectedCharts.splice(index, 1);
}

function handleDates(date) {
  if (date) {
    const dateMapped = date.map((item) => {
      return moment(item).format("L");
    });
    getDaysBetweenDates(dateMapped);
  }
}

function getDaysBetweenDates(dates) {
  const resultObject = {
    startDate: dates[0],
    endDate: dates[1],
  };

  const newDates = [];
  const currDate = moment(resultObject.startDate).startOf("day");
  const lastDate = moment(resultObject.endDate).startOf("day");

  while (currDate.clone().isSameOrBefore(lastDate)) {
    newDates.push(currDate.format("YYYY-MM-DD"));
    currDate.add(1, "days");
  }
  datesSelected = newDates;
  storeForDates.getSelectedDates(newDates);
  return datesSelected;
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
  padding: 65px 0 15px 0;
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
