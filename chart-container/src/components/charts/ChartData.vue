<template>
  <EChart v-if="chartLib === 'eCharts'" :option="options" :id="chartId" />
  <ApexCharts v-if="chartLib === 'apexCharts'" :id="chartId" />
  <ChartJS v-if="chartLib === 'chartjs'" :id="chartId" />
  <div class="custom-toolbox">
    <v-icon color="#676767" @click="editDialog = !editDialog"
      >mdi-pencil-outline</v-icon
    >
    <v-icon color="#676767" @click="appearanceDialog = !appearanceDialog"
      >mdi-palette</v-icon
    >
    <v-icon color="#676767" @click="handleChartDom(chartId)"
      >mdi-download-outline</v-icon
    >
    <v-icon color="#676767" @click="embedDialog = !embedDialog"
      >mdi-import</v-icon
    >
  </div>
  <div class="toolbox-dialog">
    <v-dialog v-model="editDialog" persistent width="500px" style="z-index: 0">
      <v-card>
        <v-card-text>
          <v-row justify="space-between">
            <v-col>
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
              <p>Type</p>
            </v-col>
            <v-col>
              <v-dialog transition="dialog-bottom-transition" width="auto">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="modifiedType"
                    hide-details
                    class="ma-0 pa-0"
                    variant="outlined"
                    v-bind="props"
                  ></v-text-field>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-toolbar color="primary" title="Select Chart Type">
                      <v-spacer></v-spacer>
                      <v-icon
                        class="mr-3"
                        @click="isActive.value = !isActive.value"
                        >mdi-close</v-icon
                      >
                    </v-toolbar>
                    <v-card-text>
                      <div class="text-h2 pa-4">
                        <v-row class="mb-6" no-gutters>
                          <v-col
                            cols="3"
                            v-for="item in charts"
                            class="mb-5 d-flex justify-center"
                            @click="isActive.value = !isActive.value"
                          >
                            <img
                              :src="item.img"
                              style="width: 40px; height: 40px"
                              @click="handleSelectedChart(item.value)"
                            />
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p class="mb-2">X</p>
            </v-col>
            <v-col>
              <v-select
                v-model="xAxisData"
                :items="xCategories"
                label="Choose data..."
                variant="solo"
                @update:modelValue="selectedXaxisData"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p class="mb-2">Y</p>
            </v-col>
            <v-col>
              <v-select
                v-model="yAxisData"
                :items="yCategories"
                label="Choose data..."
                variant="solo"
                @update:modelValue="selectedYaxisData"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Series</p>
            </v-col>
            <v-col>
              <v-text-field
                v-model="numofseries"
                type="number"
                variant="outlined"
                @update:modelValue="handleNumberOfSeries"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="appearanceDialog"
      persistent
      width="500px"
      style="z-index: 0"
    >
      <v-card>
        <v-card-text>
          <v-row justify="space-between">
            <v-col cols="6">
              <v-sheet class="my-2"><h3>Look & Feel</h3></v-sheet>
            </v-col>
            <v-col cols="1">
              <v-sheet class="my-2"
                ><v-icon @click="appearanceDialog = !appearanceDialog"
                  >mdi-close</v-icon
                ></v-sheet
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Main Title</p>
            </v-col>
            <v-col>
              <v-text-field
                v-model="mainTitle"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Sub Title</p>
            </v-col>
            <v-col>
              <v-text-field
                v-model="subTitle"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Font Type</p>
            </v-col>
            <v-col>
              <v-select
                v-model="fontType"
                :items="fonts"
                label="Select font type"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Color Scheme</p>
            </v-col>
            <v-col>
              <div class="d-flex justify-center">
                <v-text-field
                  v-model="color"
                  hide-details
                  class="ma-0 pa-0"
                  variant="outlined"
                >
                  <template v-slot:append-inner>
                    <v-menu
                      v-model="menu"
                      location="end"
                      nudge-bottom="105"
                      nudge-left="16"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ props }">
                        <div :style="swatchStyle" v-bind="props"></div>
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="color" flat></v-color-picker>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>Date range</p>
            </v-col>
            <v-col>
              <v-menu
                v-model="datemenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    v-model="dateValue"
                    variant="outlined"
                    append-inner-icon="mdi-calendar"
                  ></v-text-field>
                </template>
                <v-date-picker color="primary"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="embedDialog" width="500px" style="z-index: 0">
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

<script>
import EChart from "./EChart.vue";
import ApexCharts from "./ApexChart.vue";
import ChartJS from "./ChartJS.vue";
import { useSelectedChart } from "../../stores/fetchSelectedChart";
import { VDatePicker } from "vuetify/labs/VDatePicker";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import line from "@/assets/line.png";
import bar from "@/assets/bar.png";
import column from "@/assets/column.png";
import combination from "@/assets/combination.png";
import area from "@/assets/area.png";
import pie from "@/assets/pie.png";
import rose from "@/assets/rose.png";
import vertical_combination from "@/assets/vertical_combination.png";
import doughnut from "@/assets/doughnut.png";
const store = useSelectedChart();
export default {
  components: {
    EChart,
    ApexCharts,
    ChartJS,
    VDatePicker,
  },
  props: {
    chartType: String,
    chartLib: String,
    chartId: String,
  },
  data: () => {
    return {
      options: null,
      editDialog: false,
      embedDialog: false,
      appearanceDialog: false,
      menu: false,
      dateValue: null,
      datemenu: false,
      modifiedType: null,
      numofseries: 1,
      color: "#1976D2FF",
      fontType: null,
      mainTitle: null,
      subTitle: null,
      xAxisData: [],
      xCategories: ["Days", "Number", "Category", "Time"],
      yAxisData: [],
      yCategories: [
        "Default",
        "Days",
        "Precipitation",
        "Temperature",
        "Category",
      ],
      fonts: ["sans-serif", "serif", "monospace", "Arial", "Courier New"],
      charts: [
        {
          type: "Column Chart",
          value: "column",
          img: column,
        },
        {
          type: "Line Chart",
          value: "line",
          img: line,
        },
        {
          type: "Bar Chart",
          value: "bar",
          img: bar,
        },
        {
          type: "Pie Chart",
          value: "pie",
          img: pie,
        },
        {
          type: "Doughnut Chart",
          value: "doughnut",
          img: doughnut,
        },
        {
          type: "Combination Chart",
          value: "combination",
          img: combination,
        },
        {
          type: "Area Chart",
          value: "area",
          img: area,
        },
        {
          type: "Vertical Combination Chart",
          value: "vertical_combination",
          img: vertical_combination,
        },
        {
          type: "Nightingale Chart",
          value: "nightingale",
          img: rose,
        },
      ],
    };
  },
  computed: {
    swatchStyle() {
      const { color, menu } = this;
      this.handleOptions(color);
      return {
        backgroundColor: color,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: menu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
  },
  mounted() {
    this.handleOptions(this.color);
  },
  methods: {
    handleSelectedChart(val) {
      this.modifiedType = val;
      this.handleOptions();
    },

    handleOptions(color) {
      this.options = {
        title: {
          text: this.mainTitle,
          subtext: this.subTitle,
          left: "center",
          textStyle: {
            fontSize: 20,
            fontFamily: this.fontType,
          },
          subtextStyle: {
            fontSize: 15,
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
          nameTextStyle: {
            fontFamily: this.fontType,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            color: color,
            data: [120, 200, 150, 80, 70],
            type: this.modifiedType ? this.modifiedType : this.chartType,
          },
        ],
      };
      store.getChartOptions(this.options);
    },

    handleChartDom(id) {
      domtoimage
        .toBlob(document.getElementById("chart" + id))
        .then(function (blob) {
          window.saveAs(blob, "my-chart.png");
        });
    },

    copyText() {
      const input = document.getElementById("tocopy");
      input.select();
      document.execCommand("copy");
    },

    selectedXaxisData(x) {
      if (x === "Days") {
        const daysItem = {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          values: {
            data: [60, 35, 110, 80, 95, 140, 185],
          },
        };
        this.options.xAxis.data = daysItem.categories;
        this.options.series = daysItem.values;
      } else if (x === "Number") {
        const numberItem = {
          categories: [1, 2, 3, 4, 5],
          values: {
            data: [50, 100, 150, 200, 250],
          },
        };
        this.options.xAxis.data = numberItem.categories;
        this.options.series = numberItem.values;
      } else if (x === "Category") {
        const categoryItem = [
          "Direct",
          "Email",
          "Ad Networks",
          "Video Ads",
          "Search Engines",
        ];
        this.options.xAxis.data = categoryItem;
      } else if (x === "Time") {
        const timeItem = {
          categories: [10, 40, 70, 100, 130],
          values: {
            data: [55, 75, 95, 115, 135],
          },
        };
        this.options.xAxis.data = timeItem.categories;
        this.options.series = timeItem.values;
      }
    },

    selectedYaxisData(y) {
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
        this.options.yAxis = defaultItem;
      } else if (y === "Days") {
        const daysItem = {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        };
        this.options.yAxis = daysItem;
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
        this.options.yAxis = precipitationItem;
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
        this.options.yAxis = tempItem;
      } else if (y === "Category") {
        const categoryItem = {
          type: "category",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        };
        this.options.yAxis = categoryItem;
      }
    },

    handleNumberOfSeries(val) {
      if (val) {
        const seriesData = {
          // color: color,
          data: [120, 200, 150, 80, 70],
          type: this.modifiedType ? this.modifiedType : this.chartType,
        };
        this.options.series.push(seriesData);
      }
    },
  },
};
</script>

<style scoped>
.custom-toolbox {
  position: absolute;
  right: 2px;
  top: 30px;
  cursor: pointer;
}
</style>
