<template>
  <div class="">
    <v-app-bar color="rgba(233, 73, 93)" class="flex-grow-0" dark>
      <v-app-bar-title>
        <v-icon icon="mdi-file-chart-outline" color="white" />
        <span class="ml-3" style="color: white">Dashboard</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-3" variant="outlined" size="small" color="primary"
        >Actions <v-icon>mdi-menu-down</v-icon></v-btn
      >
      <v-btn variant="flat" size="small" color="primary" href="/widget"
        >Add report</v-btn
      >
    </v-app-bar>
  </div>
</template>
