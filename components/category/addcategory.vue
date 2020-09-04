<template>
  <div>
    <update :toggle="a" @close="a = false" :sendvalue="send" />
    <!-- <deleteproduct :deletetoggle="b" @closed="b=false" :delete_id="id_delete" /> -->
    <v-card>
      <v-card-title>
        ข้อมูลประเภทสินค้า
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาชื่อประเภทสินค้า"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
        <insert />
      </v-card-title>

      <v-data-table :headers="headers" :search="search" :items="show" class="elevation-1">
        <template v-slot:item.edit="{ item }">
          <v-btn @click="modalToggle(item)" class="center">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import insert from "../category/insert";
import update from "../category/update";

export default {
  components: {
    insert,
    update,
  },
  data() {
    return {
      menu: "",
      id_delete: 0,
      send: {},
      a: false,
      b: false,
      categoryid: "",
      categoryname: "",
      show: [],
      search: "",
      headers: [
        {
          text: "หมายเลข",
          align: "start",
          sortable: false,
          value: "categoryid",
        },
        { text: "ชื่อประเภทสินค้า", value: "categoryname" },
        { text: "แก้ไข", value: "edit" },
      ],
    };
  },

  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    // let res = await this.$http.get("/categories");
    // console.log("ประเภทสินค้า", res.data);
    this.getcategory();
  },

  methods: {
    modalToggle(item) {
      this.send = item;
      this.a = true;
      console.log("modalToggle");
    },
    ToggleDelete(pid) {
      this.id_delete = pid.productid;
      this.b = true;
      console.log("hi", this.id_delete);
    },
    async getcategory() {
      let res = await this.$http.get("/categories", {});

      this.show = res.data.categories;
      console.log("ประเภทสินค้า", this.show);
    },
  },
};
</script>

<style>
.table {
  border: none;
}
.head {
  text-align: center;
}
</style>