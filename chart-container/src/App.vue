<template>
  <div style="width: 100%">
    <div class="content">
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
          />
          <span class="remove" @click="removeItem(item.i)"
            ><v-icon size="small">mdi-close</v-icon></span
          >
          <div class="custom-toolbox">
            <v-icon color="#676767" @click="editDialog = !editDialog"
              >mdi-pencil-outline</v-icon
            >
            <v-icon color="#676767">mdi-download-outline</v-icon>
            <v-icon color="#676767" @click="embedDialog = !embedDialog"
              >mdi-import</v-icon
            >
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
  <div class="toolbox-dialog">
    <v-dialog v-model="editDialog" width="500px">
      <v-card>
        <v-card-text>
          <v-row justify="space-between">
            <v-col cols="6">
              <v-sheet class="my-2"><h3>Parameter Area</h3></v-sheet>
            </v-col>
            <v-col cols="1">
              <v-sheet class="my-2"
                ><v-icon @click="editDialog = !editDialog"
                  >mdi-close</v-icon
                ></v-sheet
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p class="text-center mb-2">x-Axis</p>
              <v-select
                v-model="xAxisData"
                label="Select x-axis data"
                :items="xCategories"
                variant="solo"
                @update:modelValue="selectedXaxisData"
              ></v-select>
            </v-col>
            <v-col>
              <p class="text-center mb-2">y-Axis</p>
              <v-select
                v-model="yAxisData"
                label="Select y-axis data"
                :items="yCategories"
                variant="solo"
                @update:modelValue="selectedYaxisData"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="embedDialog" width="500px">
      <v-card>
        <v-card-text>
          <v-row justify="space-between">
            <v-col cols="8">
              <v-sheet class="my-2"
                ><h3>Add the widget to your website</h3>
              </v-sheet>
            </v-col>
            <v-col cols="1">
              <v-sheet class="my-2"
                ><v-icon @click="embedDialog = !embedDialog"
                  >mdi-close</v-icon
                ></v-sheet
              >
            </v-col>
          </v-row>
          <v-textarea
            id="tocopy"
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-content-copy"
            @click:append-inner="copyText"
          ></v-textarea>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import ChartData from "./components/charts/ChartData";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../dashboard/src/stores/selectedChartItems";
const store = useStore();
const { selectedCharts } = storeToRefs(store);
const editDialog = ref(false);
const embedDialog = ref(false);
const xAxisData = ref([]);
const yAxisData = ref([]);
const xCategories = ref(["Days", "Number", "Category", "Time"]);
const yCategories = ref([
  "Default",
  "Days",
  "Precipitation",
  "Temperature",
  "Category",
]);

// functions
function removeItem(i) {
  const index = this.selectedCharts.map((item) => item.i).indexOf(i);
  this.selectedCharts.splice(index, 1);
}

function selectedXaxisData(x) {
  if (x === "Days") {
    const daysItem = {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: {
        data: [60, 35, 110, 80, 95, 140, 185],
      },
    };
    this.selectedCharts.xAxis.data = daysItem.categories;
    this.selectedCharts.series = daysItem.values;
  } else if (x === "Number") {
    const numberItem = {
      categories: [1, 2, 3, 4, 5],
      values: {
        data: [50, 100, 150, 200, 250],
      },
    };
    this.selectedCharts.xAxis.data = numberItem.categories;
    this.selectedCharts.series = numberItem.values;
  } else if (x === "Category") {
    const categoryItem = [
      "Direct",
      "Email",
      "Ad Networks",
      "Video Ads",
      "Search Engines",
    ];
    this.selectedCharts.xAxis.data = categoryItem;
  } else if (x === "Time") {
    const timeItem = {
      categories: [10, 40, 70, 100, 130],
      values: {
        data: [55, 75, 95, 115, 135],
      },
    };
    this.selectedCharts.xAxis.data = timeItem.categories;
    this.selectedCharts.series = timeItem.values;
  }
}

function selectedYaxisData(y) {
  if (y === "Default") {
    const defaultItem = {
      type: "value",
      min: 0,
      max: 200,
      interval: 50,
      axisLabel: {
        formatter: "{value}",
      },
    };
    this.selectedCharts.yAxis = defaultItem;
  } else if (y === "Days") {
    const daysItem = {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
    this.selectedCharts.yAxis = daysItem;
  } else if (y === "Precipitation") {
    const precipitationItem = {
      type: "value",
      name: "Precipitation",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} ml",
      },
    };
    this.selectedCharts.yAxis = precipitationItem;
  } else if (y === "Temperature") {
    const tempItem = {
      type: "value",
      name: "Temperature",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} °C",
      },
    };
    this.selectedCharts.yAxis = tempItem;
  } else if (y === "Category") {
    const categoryItem = {
      type: "category",
      data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
    };
    this.selectedCharts.yAxis = categoryItem;
  }
}

function copyText() {
  const input = document.getElementById("tocopy");
  input.select();
  document.execCommand("copy");
}
</script>

<style scoped>
.content {
  width: 100%;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}

.vue-resizable-handle {
  z-index: 5000;
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=");
  background-position: bottom right;
  padding: 0 3px 3px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: se-resize;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
  padding: 25px 0 15px 0;
}

.vue-grid-item.resizing {
  opacity: 0.9;
}

.vue-grid-item.static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 24px;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}

.custom-toolbox {
  position: absolute;
  right: 2px;
  top: 30px;
  cursor: pointer;
}
</style>
