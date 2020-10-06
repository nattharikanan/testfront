<template>
  <div>
    <loading :toggle="loadingme" />
    <editorder :toggle="a" @close="a = false" :sendvalue="send" />
    <deleteorder :deletetoggle="b" @closed="b = false" :delete_id="id_delete" />
    <v-card class="color">
      <v-card-title>
        ข้อมูลการสั่งซื้อสินค้า
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาจากหมายเลขคำสั่งซื้อ"
          single-line
          hide-details
        ></v-text-field>
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
            <template v-slot:item.orderid="{ item }">
              <nuxt-link
                :to="{
                  name: 'admin-showorder-detail',
                  params: { orderq: item.orderid }
                }"
              >
                <v-list-item-title>{{ item.orderid }}</v-list-item-title>
              </nuxt-link>
            </template>
            <template v-slot:item.edit="{ item }">
              <v-btn @click="modalToggle(item)" class="center">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="ToggleDelete(item)" class="center">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.orderStatus="{ item }">
              <div v-if="item.orderStatus === 'รอการชำระเงิน'">
                <v-btn color="yellow">{{ item.orderStatus }}</v-btn>
              </div>
              <div v-if="item.orderStatus === 'กำลังดำเนินการ'">
                <v-btn color="blue lighten-3">{{ item.orderStatus }}</v-btn>
              </div>
              <div v-else-if="item.orderStatus === 'กำลังจัดส่ง'">
                <v-btn color="orange">{{ item.orderStatus }}</v-btn>
              </div>
              <div v-else-if="item.orderStatus === 'สำเร็จ'">
                <v-btn color="green">{{ item.orderStatus }}</v-btn>
              </div>
              <div v-else-if="item.orderStatus === 'ยกเลิก'">
                <v-btn color="red">{{ item.orderStatus }}</v-btn>
              </div>
              <div v-else-if="item.orderStatus === 'การชำระเงินไม่สำเร็จ'">
                <v-btn color="red">{{ item.orderStatus }}</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-flex>
      </div>
    </v-card>
  </div>
</template>

<script>
import editorder from "../../components/order/editorder";
import deleteorder from "../../components/order/deleteorder";
import loading from "@/components/loading/loading";
export default {
  components: {
    deleteorder,
    editorder,
    loading
  },
  data() {
    return {
      loadingme: false,
      a: false,
      b: false,
      id_delete: 0,
      show: [],
      search: "",
      send: {},
      headers: [
        {
          text: "หมายเลขคำสั่งซื้อ (คลิกเพื่อดูข้อมูลเพิ่มเติม)",
          align: "start",
          sortable: true,
          value: "orderid"
        },
        { text: "ชื่อผู้สั่ง", value: "firstname" },
        { text: "นามสกุล", value: "lastname" },
        { text: "วันที่สั่งสินค้า", value: "orderdate" },
        { text: "เลขพัสดุ", value: "tracking" },
        { text: "สถานะ", value: "orderStatus" },
        { text: "แก้ไข", value: "edit" }
      ]
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    this.loadingme = true;
    let res = await this.$http.get("/orders/showorder");
    this.show = res.data.carts;
    if (res.data.ok) {
      this.loadingme = false;
    }
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
