/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp, defineAsyncComponent } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import VueGridLayout from 'vue-grid-layout'

import { createPinia } from "pinia";
// import { state } from "../../shared/shared";
import "./stores/selectedChartItems";

import VueApexCharts from "vue3-apexcharts";

import ECharts from 'vue-echarts'
import { use } from "echarts/core"
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart, LineChart, PieChart, ScatterChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    ToolboxComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
])

// state.message = "Hello from dashboard!";

const app = createApp(App)

registerPlugins(app)

const PluggableWidget = defineAsyncComponent(() => import("../../charts-widget/src/App.vue"));
const ChartContainer = defineAsyncComponent(() => import("../../chart-container/src/App.vue"));

app.component("PluggableWidget", PluggableWidget);
app.component("ChartContainer", ChartContainer);

// register globally (or you can do it locally)
app.component('v-chart', ECharts)
app.component('apexchart', VueApexCharts)

app.use(createPinia()).use(VueGridLayout).mount('#app')
