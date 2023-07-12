<template>
  <v-app-bar color="rgba(233, 73, 93)" class="flex-grow-0" app dark>
    <v-app-bar-title>
      <v-icon icon="mdi-chart-box" color="white" />
      <span class="ml-3" style="color: white">Charts Widget</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <!-- <p v-if="mainTitle" style="color: white">
      {{ mainTitle }}
      <v-icon size="small" color="white">mdi-pencil</v-icon>
    </p> -->
    <v-spacer></v-spacer>
    <v-btn class="mr-3" variant="outlined" size="small" color="primary"
      >Preview Changes</v-btn
    >
    <v-btn variant="flat" size="small" color="primary">Save Changes</v-btn>
  </v-app-bar>

  <v-navigation-drawer
    color="rgba(71,181,155)"
    class="bg-grey-lighten-2"
    rail
    app
  >
    <v-list color="rgba(70,60,110)" dense nav>
      <v-list-item
        v-for="(item, index) in sideMenuItems"
        :key="index"
        @click="onClickDrawer(index)"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
      >
        <v-tooltip activator="parent" location="right">
          {{ item.title }}
        </v-tooltip>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-model="drawer"
    color="rgba(211,220,230,1)"
    app
    width="300"
  >
    <div id="sidebar">
      <div class="d-flex justify-end sidebar-toggle mx-4 mt-3">
        <div class="" @click="drawer = !drawer" id="btn-toggle">
          <v-icon id="btn-toggle-icon" x-large>mdi-close</v-icon>
        </div>
      </div>
      <div class="sidebar-body">
        <div class="chartType">
          <h3 class="chartType-title mb-4 ml-6">Charts</h3>
          <v-select
            v-model="selectedChartLibrary"
            label="Select Charting Libraries"
            variant="outlined"
            class="mx-6"
            :items="chartLibraries"
            item-title="type"
            item-value="value"
          >
          </v-select>
          <div v-if="selectedChartLibrary" class="chartType">
            <v-row class="mb-6" no-gutters>
              <v-col
                cols="3"
                v-for="item in charts"
                class="mb-5 d-flex justify-center"
              >
                <img
                  :src="item.img"
                  style="width: 25px; height: 25px"
                  @click="selectedChart(item)"
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-model="appearanceDrawer"
    color="rgba(211,220,230,1)"
    app
    width="400"
  >
    <div id="sidebar">
      <div class="d-flex justify-end sidebar-toggle mx-4 mt-3">
        <div
          class="mb-2"
          @click="appearanceDrawer = !appearanceDrawer"
          id="btn-toggle"
        >
          <v-icon id="btn-toggle-icon" x-large>mdi-close</v-icon>
        </div>
      </div>
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="left">
        <v-tab value="basic" color="green">Basic</v-tab>
        <v-tab value="advanced" color="green">Advanced</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="basic">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-3">Font</h3>
                <v-row>
                  <v-col cols="4">
                    <p>Font Type</p>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      label="Select"
                      :items="fonts"
                      density="compact"
                      variant="outlined"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <hr />
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-3">Chart Color Scheme</h3>
                <v-row>
                  <v-col cols="10">
                    <p>Color Scheme <v-icon>mdi-information</v-icon></p>
                  </v-col>
                  <v-col cols="2">
                    <v-icon>mdi-select-color</v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <hr />
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-3">Custom Colors</h3>
                <v-row v-for="i in customColors" :key="i">
                  <v-col cols="10">
                    <p>{{ i }}</p>
                  </v-col>
                  <v-col cols="2">
                    <v-icon>mdi-select-color</v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <hr />
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-3">Custom Sizes</h3>
                <v-row v-for="i in customSizes" :key="i">
                  <v-col cols="6">
                    <p>
                      <!-- <v-icon>mdi-crown</v-icon> -->
                      {{ i }}
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      label="Select"
                      :items="sizes"
                      density="compact"
                      variant="outlined"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item value="advanced">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-3">Background</h3>
                <v-row>
                  <v-col cols="9">
                    <p>Transparent</p>
                  </v-col>
                  <v-col cols="3">
                    <v-switch inset></v-switch>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="9">
                    <p>Background</p>
                  </v-col>
                  <v-col cols="3">
                    <v-icon size="x-large">mdi-select-color</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <p>Image Behavior</p>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      label="Select"
                      :items="imageBehavior"
                      density="compact"
                      variant="outlined"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="9">
                    <p>Image</p>
                  </v-col>
                  <v-col cols="3">
                    <v-icon size="x-large">mdi-image-area</v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <hr />
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-3">Custom CSS</h3>
                <p>
                  Add custom CSS code to change the styling of any HTML element
                  in the widget.
                </p>
                <div class="text-center">
                  <v-btn variant="flat" class="mt-5" color="primary" outlined>
                    <!-- <v-icon>mdi-crown</v-icon>  -->
                    Edit CSS</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </div>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-model="settingsDrawer"
    color="rgba(211,220,230,1)"
    app
    width="400"
  >
    <div id="sidebar">
      <div class="d-flex justify-end sidebar-toggle mx-4 mt-3">
        <div
          class="mb-2"
          @click="settingsDrawer = !settingsDrawer"
          id="btn-toggle"
        >
          <v-icon id="btn-toggle-icon" x-large>mdi-close</v-icon>
        </div>
      </div>
      <div class="sidebar-body">
        <div class="mx-4">
          <h3 class="mb-3">Remove Common Startechup's Logo</h3>
          <p class="mb-2">
            Common Startechup's logo is only visible on widgets with the free
            plan.
          </p>
          <div class="text-center">
            <v-btn variant="flat" class="mt-2 mb-5" color="primary" outlined>
              <!-- <v-icon>mdi-crown</v-icon>  -->
              Remove Logo</v-btn
            >
          </div>
        </div>
        <hr class="mb-4" />
        <div class="data mx-4 mb-4">
          <h3 class="data-title mb-3">General Settings</h3>
          <p>Main Title</p>
          <v-text-field
            v-model="mainTitle"
            variant="outlined"
            @input="handleTitleChange"
          ></v-text-field>
          <p class="mt-3">Description</p>
          <v-textarea
            v-model="description"
            variant="outlined"
            @input="handleDescChange"
          ></v-textarea>
          <v-row>
            <v-col cols="7">
              <p>Chart Height</p>
            </v-col>
            <v-col cols="3">
              <v-text-field
                variant="outlined"
                hide-details
                single-line
                type="number"
              />
            </v-col>
            <v-col cols="2">
              <p>px</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p>
                <!-- <v-icon>mdi-crown</v-icon>  -->
                Auto Refresh <v-icon>mdi-information</v-icon>
              </p>
            </v-col>
            <v-col cols="6">
              <v-select
                label="Select"
                :items="autoRefresh"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
        </div>
        <hr />
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h3 class="mb-3">Visibility</h3>
              <v-row v-for="i in visibility" :key="i">
                <v-col cols="10">
                  <p>{{ i }}</p>
                </v-col>
                <v-col cols="2">
                  <v-switch inset></v-switch>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p>Legend Position</p>
            </v-col>
            <v-col cols="6">
              <v-select
                label="Select"
                :items="legendPosition"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <hr />
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h3 class="mb-3">Advanced Settings</h3>
              <v-row>
                <v-col cols="6">
                  <p>Value Display Type <v-icon>mdi-information</v-icon></p>
                </v-col>
                <v-col cols="6">
                  <v-select
                    label="Select"
                    :items="displayType"
                    density="compact"
                    variant="outlined"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p>Values Prefix</p>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined"> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <p>Values Suffix</p>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined"> </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-navigation-drawer>

  <v-main>
    <ChartContainer />
    <!-- <PluggableWidget /> -->
    <Home />
  </v-main>
</template>

<script>
import Home from "@/views/Home.vue";
import line from "@/assets/line.png";
import bar from "@/assets/bar.png";
import column from "@/assets/column.png";
import combination from "@/assets/combination.png";
import area from "@/assets/area.png";
import pie from "@/assets/pie.png";
import rose from "@/assets/rose.png";
import vertical_combination from "@/assets/vertical_combination.png";
import doughnut from "@/assets/doughnut.png";
import { useStore } from "../../stores/selectedChartItems";
const store = useStore();
export default {
  name: "AppBar",
  components: {
    Home,
  },
  data: () => {
    return {
      drawer: false,
      appearanceDrawer: false,
      settingsDrawer: false,
      tab: null,
      chartType: null,
      chartDataType: null,
      dialog: false,
      mainTitle: null,
      description: null,
      layout: [],
      index: 0,
      selectedChartLibrary: null,
      sideMenuItems: [
        {
          title: "Chart & Data",
          value: "chartData",
          icon: "mdi-chart-box-outline",
        },
        { title: "Look & Feel", value: "lookfeel", icon: "mdi-palette" },
        { title: "Settings", value: "settings", icon: "mdi-cog" },
        { title: "Analytics", value: "analytics", icon: "mdi-chart-bar" },
      ],
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
      fonts: [
        "Arial",
        "Arial Black",
        "Comic Sans MS",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Lucida Sans Unicode",
        "Palatino Linotype",
        "Tahoma",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana",
      ],
      chartData: [
        {
          dataType: "Static Data",
          value: "static",
        },
        {
          dataType: "Remote Data(From a URL)",
          value: "remote",
        },
      ],
      customColors: [
        "Title",
        "Subtitle",
        "Description",
        "Data Labels",
        "Tooltip Background",
        "Tooltip Border",
        "Tooltip Text",
        "Legend Background",
        "Legend Text",
        "Legend Border",
      ],
      customSizes: ["Title", "Description", "Data Labels"],
      sizes: [
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
      ],
      imageBehavior: ["Cover", "Contain", "Stretch", "Center", "Original"],
      autoRefresh: [
        "Off",
        "Every 5 minutes",
        "Every 10 minutes",
        "Every 15 minutes",
        "Every 30 minutes",
        "Every 1 hour",
        "Every 2 hours",
        "Every 3 hours",
        "Every 4 hours",
        "Every 5 hours",
        "Every 6 hours",
        "Every 7 hours",
        "Every 8 hours",
        "Every 9 hours",
        "Every 10 hours",
        "Every 11 hours",
        "Every 12 hours",
        "Every 13 hours",
        "Every 14 hours",
        "Every 15 hours",
        "Every 16 hours",
        "Every 17 hours",
        "Every 18 hours",
        "Every 19 hours",
        "Every 20 hours",
        "Every 21 hours",
        "Every 22 hours",
        "Every 23 hours",
        "Every 24 hours",
      ],
      visibility: [
        "Title",
        "Subtitle",
        "Description",
        "Grid Lines",
        "Tooltips",
        "Data Labels",
        "Legend",
      ],
      legendPosition: [
        "Top Center",
        "Top Left",
        "Top Right",
        "Middle Left",
        "Middle Right",
        "Bottom Center",
        "Bottom Left",
        "Bottom Right",
      ],
      displayType: ["Value", "Percentage"],
      profileItems: [
        { title: "Dashboard" },
        { title: "Support" },
        { title: "Logout" },
      ],
      chartLibraries: [
        // {
        //   type: "JSCharting",
        //   value: "jsCharting",
        // },
        {
          type: "ApexCharts",
          value: "apexCharts",
        },
        // {
        //   type: "Google Charts",
        //   value: "googlecharts",
        // },
        {
          type: "Apache ECharts",
          value: "eCharts",
        },
        {
          type: "Chart.js",
          value: "chartjs",
        },
        // {
        //   type: "amCharts",
        //   value: "amCharts",
        // },
      ],
    };
  },
  methods: {
    onClickDrawer(val) {
      this.drawer = val === 0;
      this.appearanceDrawer = val === 1;
      this.settingsDrawer = val === 2;
    },

    selectedChart(val) {
      store.increment(val, this.selectedChartLibrary);
    },

    handleTitleChange(event) {
      this.mainTitle = event.target.value;
    },

    handleDescChange(event) {
      this.description = event.target.value;
    },
  },
};
</script>
