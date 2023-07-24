<template>
  <v-app-bar color="rgba(233, 73, 93)" class="flex-grow-0" dark>
    <v-app-bar-title>
      <v-icon icon="mdi-chart-box" color="white" />
      <span class="ml-3" style="color: white">Charts Widget</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <p v-if="mainTitle" style="color: white">
      {{ mainTitle }}
      <v-icon size="small" color="white">mdi-pencil</v-icon>
    </p>
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
            <h4 class="mb-4 ml-6">Simple</h4>
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
        </div>
      </div>
    </div>
  </v-navigation-drawer>

  <v-main>
    <Home :title="mainTitle" :desc="description" />
    <ChartContainer />
    <!-- <PluggableWidget /> -->
  </v-main>
</template>

<script>
import Home from "@/views/Home.vue";
import line from "@/assets/line.png";
import bar from "@/assets/bar.png";
import pie from "@/assets/pie.png";
import scatter from "@/assets/scatter.png";
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
        { title: "Settings", value: "settings", icon: "mdi-cog" },
        { title: "Analytics", value: "analytics", icon: "mdi-chart-bar" },
      ],
      charts: [
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
          type: "Scatter Chart",
          value: "scatter",
          img: scatter,
        },
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
      this.settingsDrawer = val === 1;
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
