<template>
  <EChart v-if="chartLib === 'eCharts'" :option="options" :id="chartId" />
  <ApexCharts
    v-if="chartLib === 'apexCharts'"
    :option="apexOptions"
    :apexSeries="apexSeries"
    :id="chartId"
  />
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
    <v-dialog v-model="editDialog" width="750px" style="z-index: 0">
      <v-card>
        <v-card-text>
          <v-row justify="space-between">
            <v-col>
              <v-sheet class="my-2"><h3>Structure</h3></v-sheet>
            </v-col>
            <v-col cols="1">
              <v-sheet class="my-2"
                ><v-icon @click="editDialog = !editDialog"
                  >mdi-close</v-icon
                ></v-sheet
              >
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col cols="4">
                <p class="mb-3">Type</p>
                <v-dialog transition="dialog-bottom-transition" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="modifiedType"
                      placeholder="Select Chart"
                      hide-details
                      class="ma-0 pa-0"
                      variant="outlined"
                      density="compact"
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

              <v-col cols="4">
                <p class="mb-3">X</p>
                <v-select
                  v-model="xAxisData"
                  :items="xCategories"
                  label="Choose data..."
                  variant="outlined"
                  density="compact"
                  @update:modelValue="selectedXaxisData"
                ></v-select>
              </v-col>

              <v-col cols="4">
                <p class="mb-3">Y</p>
                <v-select
                  v-model="yAxisData"
                  :items="yCategories"
                  label="Choose data..."
                  variant="outlined"
                  density="compact"
                  @update:modelValue="selectedYaxisData"
                ></v-select>
              </v-col>
            </v-row>

            <p class="mb-3">Date Range</p>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="start"
                  label="Start date"
                  type="date"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="end"
                  label="End date"
                  type="date"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row justify="end">
              <v-col>
                <p class="mb-3">Data source</p>
                <v-btn
                  class="mr-3"
                  color="primary"
                  @click="handleNumberOfSeries"
                  ><v-icon>mdi-plus</v-icon> Add Series</v-btn
                >
                <v-btn
                  color="primary"
                  :loading="isSelecting"
                  @click="handleFileImport"
                  ><v-icon>mdi-plus</v-icon> Blend Data</v-btn
                >

                <!-- Create a File Input that will be hidden but triggered with JavaScript -->
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="application/json"
                  @change="onFileChanged"
                />
              </v-col>
            </v-row>

            <v-table
              v-if="this.options.series.length != 0"
              fixed-header
              height="250px"
              class="mt-5"
            >
              <thead>
                <tr>
                  <th class="text-left">Series</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in this.options.series" :key="item">
                  <td>
                    <v-row>
                      <v-col cols="8" class="mt-3">
                        <v-text-field
                          v-model="item.name"
                          :placeholder="'Series ' + (index + 1)"
                          variant="outlined"
                          density="compact"
                        >
                          <template v-slot:append-inner>
                            <v-menu
                              v-model="item.menu"
                              location="end"
                              nudge-bottom="105"
                              nudge-left="16"
                              :close-on-content-click="false"
                            >
                              <template v-slot:activator="{ props }">
                                <div
                                  v-bind="props"
                                  :style="{
                                    backgroundColor: item.color,
                                    cursor: 'pointer',
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: item.menu ? '50%' : '4px',
                                    transition:
                                      'border-radius 200ms ease-in-out',
                                  }"
                                ></div>
                              </template>
                              <v-card>
                                <v-card-text class="pa-0">
                                  <v-color-picker
                                    v-model="item.color"
                                    flat
                                  ></v-color-picker>
                                </v-card-text>
                              </v-card>
                            </v-menu>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                  <td>
                    <v-dialog
                      transition="dialog-bottom-transition"
                      width="400px"
                    >
                      <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-pencil</v-icon>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card>
                          <v-toolbar color="primary" title="Chart Data">
                            <v-spacer></v-spacer>
                            <v-icon
                              class="mr-3"
                              @click="isActive.value = !isActive.value"
                              >mdi-close</v-icon
                            >
                          </v-toolbar>
                          <v-card-text>
                            <div v-for="(s, idx) in item.data">
                              <v-text-field
                                v-model="s.value"
                                variant="outlined"
                                density="compact"
                              >
                              </v-text-field>
                            </div>
                          </v-card-text>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-icon @click="deleteSeries(index)">mdi-delete</v-icon>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="appearanceDialog" width="750px" style="z-index: 0">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>
              <v-sheet class="my-2"><h3>Style</h3></v-sheet>
            </v-col>
            <v-col cols="1">
              <v-sheet class="my-2 ml-3"
                ><v-icon @click="appearanceDialog = !appearanceDialog"
                  >mdi-close</v-icon
                ></v-sheet
              >
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-container>
            <h4 class="my-5">Defaults</h4>
            <v-row justify="start">
              <v-col cols="3">
                <p class="pa-3">Plot Background</p>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="gridColor"
                  hide-details
                  class="ma-0 pa-0"
                  variant="outlined"
                  density="compact"
                >
                  <template v-slot:append-inner>
                    <v-menu
                      v-model="gridColorMenu"
                      location="end"
                      nudge-bottom="105"
                      nudge-left="16"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ props }">
                        <div
                          v-bind="props"
                          :style="{
                            backgroundColor: getGridColor,
                            cursor: 'pointer',
                            width: '30px',
                            height: '30px',
                            borderRadius: gridColorMenu ? '50%' : '4px',
                            transition: 'border-radius 200ms ease-in-out',
                          }"
                        ></div>
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker
                            v-model="gridColor"
                            flat
                          ></v-color-picker>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="3">
                <p class="pa-3 ml-10">Font Type</p>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="fontType"
                  :items="fonts"
                  label="Select ..."
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <p class="pa-3">Font Size</p>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="fontSize"
                  type="number"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <p class="pa-3 ml-10">Font Color</p>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="labelColor"
                  hide-details
                  class="ma-0 pa-0"
                  variant="outlined"
                  density="compact"
                >
                  <template v-slot:append-inner>
                    <v-menu
                      v-model="menuLabelColor"
                      location="end"
                      nudge-bottom="105"
                      nudge-left="16"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ props }">
                        <div
                          v-bind="props"
                          :style="{
                            backgroundColor: labelColor,
                            cursor: 'pointer',
                            width: '30px',
                            height: '30px',
                            borderRadius: menuLabelColor ? '50%' : '4px',
                            transition: 'border-radius 200ms ease-in-out',
                          }"
                        ></div>
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker
                            v-model="labelColor"
                            flat
                          ></v-color-picker>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <h4 class="my-5">Title</h4>
            <v-row justify="start">
              <v-col cols="3">
                <p class="pa-3">Plot Title</p>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="mainTitle"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <p class="pa-3 ml-10">Font Type</p>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="titleFontType"
                  :items="fonts"
                  label="Select ..."
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <p class="pa-3">Font Size</p>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="titleFontSize"
                  type="number"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <p class="pa-3 ml-10">Font Color</p>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="titleColor"
                  hide-details
                  class="ma-0 pa-0"
                  variant="outlined"
                  density="compact"
                >
                  <template v-slot:append-inner>
                    <v-menu
                      v-model="menuTitleColor"
                      location="end"
                      nudge-bottom="105"
                      nudge-left="16"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ props }">
                        <div
                          v-bind="props"
                          :style="{
                            backgroundColor: titleColor,
                            cursor: 'pointer',
                            width: '30px',
                            height: '30px',
                            borderRadius: menuTitleColor ? '50%' : '4px',
                            transition: 'border-radius 200ms ease-in-out',
                          }"
                        ></div>
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker
                            v-model="titleColor"
                            flat
                          ></v-color-picker>
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <h4 class="my-5">Visibility</h4>
            <v-row column>
              <v-col cols="">
                <p class="pa-3">Plot Title</p>
              </v-col>
              <v-col>
                <v-switch v-model="titleSwitch"></v-switch>
              </v-col>

              <v-col>
                <p class="pa-3">Grid Lines</p>
              </v-col>
              <v-col>
                <v-switch v-model="gridLinesSwitch"></v-switch>
              </v-col>

              <v-col cols="">
                <p class="pa-3">Tick Labels</p>
              </v-col>
              <v-col>
                <v-switch v-model="tickLabelsSwitch"></v-switch>
              </v-col>

              <v-col cols="">
                <p class="pa-3">Tick Markers</p>
              </v-col>
              <v-col>
                <v-switch v-model="tickMarkersSwitch"></v-switch>
              </v-col>

              <!-- <v-col>
                <p class="pa-3">Tooltips</p>
              </v-col>
              <v-col>
                <v-switch v-model="toogleSwitch"></v-switch>
              </v-col>
              <v-col>
                <p class="pa-3">Legend</p>
              </v-col>
              <v-col>
                <v-switch v-model="toogleSwitch"></v-switch>
              </v-col> -->
            </v-row>
          </v-container>
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
      apexOptions: null,
      apexSeries: [],
      editDialog: false,
      embedDialog: false,
      appearanceDialog: false,
      menu: false,
      gridColorMenu: false,
      menuLabelColor: false,
      menuTitleColor: false,
      dateValue: null,
      datemenu: false,
      modifiedType: null,
      numofseries: 1,
      color: "#1976D2FF",
      gridColor: "#ccc",
      fontType: "sans-serif",
      titleFontType: "sans-serif",
      titleFontSize: 18,
      titlePosition: "right",
      mainTitle: "My Chart",
      xAxisData: [],
      titleSwitch: false,
      tickLabelsSwitch: true,
      tickMarkersSwitch: false,
      gridLinesSwitch: false,
      fontSize: 12,
      labelColor: "#333",
      titleColor: "#333",
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
      start: null,
      end: null,
      seriesData: [],
      randomColor: null,
      seriesName: null,
      isSelecting: false,
      selectedFile: null,
    };
  },
  computed: {
    getGridColor() {
      const { gridColor } = this;
      this.handleOptions();
      return gridColor;
    },
  },
  mounted() {
    this.handleOptions();
    this.handleApexOptions();
    this.$nextTick(() => {
      window.dispatchEvent(new Event("resize"));
    });
  },
  methods: {
    handleSelectedChart(val) {
      this.modifiedType = val;
      this.handleOptions();
    },

    handleOptions(val) {
      this.options = {
        title: {
          text: this.titleSwitch === true ? this.mainTitle : null,
          left: "center",
          textStyle: {
            fontSize: this.titleFontSize,
            fontFamily: this.titleFontType,
            color: this.titleColor,
          },
        },
        grid: {
          backgroundColor: this.gridColor,
          show: this.gridLinesSwitch,
        },
        tooltip: {},
        legend: {},
        xAxis: {
          type: "category",
          // boundaryGap: false,
          show: this.tickLabelsSwitch,
          data: [
            { value: "Direct", label: "Direct" },
            { value: "Email", label: "Email" },
            { value: "Ad Networks", label: "Ad Networks" },
            { value: "Video Ads", label: "Video Ads" },
            { value: "Search Engines", label: "Search Engines" },
          ],
          axisLabel: {
            fontSize: this.fontSize,
            color: this.labelColor,
            fontFamily: this.fontType,
          },
          axisTick: {
            show: this.tickMarkersSwitch,
          },
        },
        yAxis: {
          type: "value",
          show: this.tickLabelsSwitch,
          axisLabel: {
            fontSize: this.fontSize,
            color: this.labelColor,
            fontFamily: this.fontType,
          },
          axisTick: {
            show: this.tickMarkersSwitch,
          },
        },
        series: [
          {
            name: this.seriesName,
            color: this.color,
            data: [
              { value: 120 },
              { value: 200 },
              { value: 150 },
              { value: 80 },
              { value: 70 },
            ],
            type: this.modifiedType ? this.modifiedType : this.chartType,
            // areaStyle: {}
          },
        ],
      };

      if (val) {
        this.options.series = val;
      }
      store.getChartOptions(this.options);
    },

    handleApexOptions() {
      this.apexOptions = {
        chart: {
          type: this.modifiedType ? this.modifiedType : this.chartType,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "straight",
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: this.titleSwitch === true ? this.mainTitle : "",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      };
      this.apexSeries = [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ];
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

    getRandomColor() {
      this.randomColor = Math.floor(Math.random() * 16777215).toString(16);
    },

    handleNumberOfSeries() {
      this.getRandomColor();
      const seriesData = {
        name: this.seriesName,
        color: "#" + this.randomColor,
        data: [
          { value: 30 },
          { value: 67 },
          { value: 96 },
          { value: 85 },
          { value: 105 },
        ],
        type: this.modifiedType ? this.modifiedType : this.chartType,
      };
      this.options.series.push(seriesData);
    },

    deleteSeries(val) {
      const index = this.options.series
        .map((item, index) => index)
        .indexOf(val);
      this.options.series.splice(index, 1);
      this.handleOptions(this.options.series);
    },

    handleFileImport() {
      this.isSelecting = true;

      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },

    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.getRandomColor();
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFile = JSON.parse(e.target.result);
        this.options.xAxis.data = this.selectedFile.map((row) => row["label"]);

        const blendData = {
          name: this.seriesName,
          color: "#" + this.randomColor,
          data: this.selectedFile,
          type: this.modifiedType ? this.modifiedType : this.chartType,
        };
        this.options.series.push(blendData);
      };
      reader.readAsText(e.target.files[0]);
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
