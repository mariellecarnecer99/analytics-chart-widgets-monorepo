<template>
  <div class="my-5 text-center py-15 px-3">
    <!-- <div class="mt-7">
      <v-row justify="space-between" no-gutters>
        <v-col cols="2">
          <v-icon>mdi-tune</v-icon> <span class="filter">Filters</span></v-col
        >
        <v-col cols="2">
          Assigned: <span class="filter">Everyone can edit</span>
        </v-col>
      </v-row>
    </div> -->
    <grid-layout
      :layout="reports"
      :col-num="12"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in reports"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <div class="text-left ml-5 mb-3">
          <h3>{{ item.name }}</h3>
          <p>Description: {{ item.description }}</p>
          <p>Widget Count: {{ item.widgetCount }}</p>
        </div>
        <v-divider></v-divider>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      reports: [],
      index: 0,
    };
  },
  mounted() {
    this.getReports();
  },
  methods: {
    getReports() {
      axios
        .get("https://retoolapi.dev/4RV8By/reports")
        .then((response) => {
          const responseData = response.data;
          responseData.forEach((obj) => {
            obj.x = 0;
            obj.y = 0;
            obj.w = 4;
            obj.h = 3;
            obj.i = this.index;
            this.index++;
          });
          this.reports = responseData;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally();
    },
  },
};
</script>

<style scoped>
.layoutJSON {
  background: #ddd;
  margin-top: 10px;
  padding: 10px;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  box-shadow: 0 0 4px #463c6e;
  padding: 25px 0 15px 0;
}

.vue-grid-item.resizing {
  opacity: 0.9;
}

.filter {
  color: #463c6e;
}
</style>
