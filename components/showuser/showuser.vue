<template>
  <div>
    <edituser :toggle="a" @close="a = false" :sendvalue="send" />
    <v-card class="color">
      <v-card-title>
        จัดการสถานะสมาชิก
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-spacer></v-spacer>
      <div row>
        <v-flex xs12>
          <v-data-table class="text-center" :headers="headers" :search="search" :items="show">
            <template v-slot:item.edit="{ item }">
              <v-btn @click="modalToggle(item)" class="center">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.userStatus="{ item }">
              <div v-if="item.userStatus == 'online'">
                <v-btn color="green">{{item.userStatus}}</v-btn>
              </div>
              <div v-if="item.userStatus == 'offline'">
                <v-btn color="yellow">{{item.userStatus}}</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-flex>
      </div>
    </v-card>
  </div>
</template>

<script>
import edituser from "../showuser/edituser";
export default {
  components: {
    // deleteorder,
    // editorder,
    edituser,
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
          value: "userid",
        },
        { text: "ชื่อ", value: "firstname" },
        { text: "นามสกุล", value: "lastname" },
        { text: "อีเมล์สมาชิก", value: "email" },
        { text: "สถานะ", value: "userStatus" },
        { text: "แก้ไข", value: "edit" },
      ],
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/users");
    this.show = res.data.users;
  },
  methods: {
    modalToggle(item) {
      this.send = item;
      this.a = true;
      console.log("send", this.send);
    },
    ToggleDelete(pid) {
      this.id_delete = pid.orderid;
      this.b = true;
      console.log("hi", this.id_delete);
    },
  },
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