<template>
  <v-app class="app">
    <div class="profile">
      <v-container fluid ma-5 pa-5 fill-height>
        <v-layout row>
          <v-flex xs4 class="menu">
            <v-card class="mx-auto" max-width="300">
              <v-list rounded>
                <v-subheader
                  >โปรไฟล์ของคุณ {{ $auth.user[0].firstname }}</v-subheader
                >
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="select(item.number)"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex xs8>
            <div v-if="menu === 1">
              <info />
            </div>
            <div v-else-if="item === 0">
              <info />
            </div>
            <div v-else-if="item === undefined">
              <info />
            </div>
            <div v-else-if="menu === 2">
              <useraddress />
            </div>
            <div v-else-if="menu === 3">
              <userorder />
            </div>
            <div v-else-if="menu === 4 || item === 4">
              <userqua />
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import info from "../../components/user/userinfo";
import useraddress from "../../components/user/useraddress";
import userorder from "../../components/user/userorder";
import userqua from "../../components/user/userqua";
export default {
  components: {
    info,
    useraddress,
    userorder,
    userqua
  },
  watch: {
    item: {
      handler() {
        console.log("item", this.item);
      }
    },
    menu: {
      handler() {
        console.log("menu", this.menu);
      }
    }
  },
  created() {
    this.item = this.$route.params.tabs;
    console.log("test params", this.item);
  },

  data: () => ({
    tabs: "",
    menu: "",
    item: 0,
    items: [
      { text: "บัญชีของฉัน", icon: "mdi-account", number: 1 },
      { text: "ที่อยู่", icon: "mdi-home", number: 2 },
      { text: "การซื้อของฉัน", icon: "mdi-view-list-outline", number: 3 },
      { text: "รายการเสนอราคา", icon: "mdi-clipboard-list-outline", number: 4 }
    ]
  }),
  methods: {
    select(number) {
      this.menu = number;
    }
  }
};
</script>

<style>
.profile {
  font: "black";
}
</style>
