<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
const props = defineProps({
  option: Object,
});
</script>
