<template>
  <div class="my-5 text-center py-15">
    <div>
      <v-row justify="space-between">
        <v-col cols="1">
          <v-icon>mdi-tune</v-icon> <span class="filter">Filters</span></v-col
        >
        <v-col cols="2" offset="2">
          Assigned: <span class="filter">Everyone can edit</span>
        </v-col>
      </v-row>
    </div>
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
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
const testLayout = [
  { x: 0, y: 0, w: 4, h: 3, i: 0 },
  { x: 2, y: 0, w: 4, h: 3, i: 1 },
  { x: 4, y: 0, w: 4, h: 3, i: 2 },
  { x: 6, y: 0, w: 4, h: 3, i: 3 },
  { x: 8, y: 0, w: 4, h: 3, i: 4 },
  { x: 4, y: 0, w: 4, h: 3, i: 5 },
  { x: 0, y: 5, w: 4, h: 3, i: 6 },
  { x: 2, y: 5, w: 4, h: 3, i: 7 },
  { x: 4, y: 5, w: 4, h: 3, i: 8 },
  { x: 6, y: 4, w: 4, h: 3, i: 9 },
  { x: 8, y: 4, w: 4, h: 3, i: 10 },
];
export default {
  data: () => {
    return {
      reports: JSON.parse(JSON.stringify(testLayout)),
    };
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
  padding: 65px 0 15px 0;
}

.vue-grid-item.resizing {
  opacity: 0.9;
}

.filter {
  color: #463c6e;
}
</style>
