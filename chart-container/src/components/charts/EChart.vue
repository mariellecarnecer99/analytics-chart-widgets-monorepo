<template>
  <v-chart :id="'chart' + id" class="chart" :option="option" autoresize />
</template>

<script setup>
const props = defineProps({
  option: Object,
  id: String,
});
</script>
