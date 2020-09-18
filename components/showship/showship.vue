<template>
  <div>
    <editship :toggle="a" @close="a = false" :sendvalue="send" />
    <delship :deletetoggle="b" @closed="b = false" :delete_id="id_delete" />
    <v-card class="color">
      <v-card-title>
        ข้อมูลการจัดส่ง
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
        <add />
      </v-card-title>
      <v-spacer></v-spacer>
      <div row>
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :search="search"
            class="elevation-1"
            :items="show"
          >
            <template v-slot:item.edit="{ item }">
              <v-btn @click="modalToggle(item)" class="center">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="ToggleDelete(item)" class="center">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </div>
    </v-card>
  </div>
</template>

<script>
// import editorder from "../../components/order/editorder";
// import deleteorder from "../../components/order/deleteorder";
import add from "../showship/add";
import delship from "../showship/delete";
import editship from "../showship/edit";
export default {
  components: {
    // deleteorder,
    // editorder,
    add,
    delship,
    editship
  },
  data() {
    return {
      a: false,
      b: false,
      id_delete: 0,
      show: [],
      search: "",
      send: {},
      headers: [
        {
          text: "หมายเลข",
          align: "start",
          sortable: true,
          value: "shmId"
        },
        { text: "ชื่อ", value: "shmName" },
        { text: "แก้ไข", value: "edit" }
      ]
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/ship_medthod/");
    this.show = res.data.ship_medthod;
    console.log("show", res.data.ship_medthod);
  },
  methods: {
    modalToggle(item) {
      this.send = item;
      this.a = true;
      console.log("send", this.send);
    },
    ToggleDelete(pid) {
      this.id_delete = pid.shmId;
      this.b = true;
      console.log("hi", this.id_delete, this.b);
    }
  }
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.center {
  text-align: center;
}
</style>
