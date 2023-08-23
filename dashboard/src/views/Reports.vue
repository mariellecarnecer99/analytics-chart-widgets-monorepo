<template>
  <div class="my-5 py-15 px-10">
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
    <!-- <grid-layout
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
          <v-row justify="space-between">
            <v-col>
              <h3 @click="handleEditReport(item.id)" class="filter">
                {{ item.name }}
              </h3>
              <p>Description: {{ item.description }}</p>
              <p>Widget Count: {{ item.widgetCount }}</p>
            </v-col>
            <v-col class="actionsMenu">
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="mr-5"
                    variant="outlined"
                    size="small"
                    color="primary"
                    v-bind="props"
                    >Actions <v-icon>mdi-menu-down</v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-item
                    v-for="(itm, index) in actionItems"
                    :key="index"
                    density="compact"
                  >
                    <v-list-item-title
                      @click="handleActionItems(itm.title, item.id)"
                      >{{ itm.title }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
      </grid-item>
    </grid-layout> -->

    <v-list density="compact" lines="one">
      <v-list-subheader color="primary">REPORTS</v-list-subheader>

      <v-list-item
        v-for="(item, i) in reports"
        :key="i"
        :value="item"
        :title="item.name"
        :subtitle="item.description"
        prepend-icon="mdi-file"
        color="primary"
      >
        <template v-slot:append>
          <v-btn
            size="small"
            color="primary"
            icon="mdi-pencil"
            variant="text"
            @click="handleEditReport(item.id)"
          ></v-btn>
          <v-btn
            size="small"
            color="primary"
            icon="mdi-content-copy"
            variant="text"
          ></v-btn>
          <v-dialog transition="dialog-bottom-transition" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn
                size="small"
                variant="text"
                color="primary"
                icon="mdi-delete"
                v-bind="props"
              ></v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card class="text-center">
                <v-icon size="80" color="red" class="iconDelete"
                  >mdi-close-circle-outline</v-icon
                >
                <v-card-title class="text-h5"> Are you sure? </v-card-title>
                <v-card-text
                  >Do you really want to delete this report? This process cannot
                  be undone.
                </v-card-text>
                <v-card-actions class="d-block mb-5">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    variant="outlined"
                    @click="isActive.value = !isActive.value"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="red"
                    variant="outlined"
                    @click="handleDeleteItem(item.id)"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return {
      reports: [],
      index: 0,
      actionItems: [{ title: "Clone" }, { title: "Delete" }],
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

    handleEditReport(e) {
      this.$router.push({ name: "Edit Report", params: { id: e } });
    },

    handleDeleteItem(id) {
      axios
        .delete(`https://retoolapi.dev/4RV8By/reports/${id}`)
        .then((response) => {
          this.getReports();
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

.actionsMenu {
  display: flex;
  justify-content: end;
}

.iconDelete {
  display: block;
  margin: 20px auto;
}
</style>
