<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6"></v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
          <v-card-text>
            <div v-if="tab == '0'">
              <normal />
            </div>
            <div v-else-if="tab == '1'">
              <personal />
            </div>
            <div v-else-if="tab == '2'">
              <company />
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import normal from "../user/showqua/normal";
import personal from "../user/showqua/personal";
import company from "../user/showqua/company";
export default {
  components: {
    normal,
    personal,
    company
  },
  data() {
    return {
      tab: null,
      items: ["ทั่วไป", "บุคคลธรรมดา", "บริษัท"]
    };
  },
  watch: {
    tab: {
      handler() {
        console.log(this.tab);
      }
    }
  }
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
