<template>
  <div>
    <updatepayment :toggle="a" @close="a = false" :sendvalue="send" />
    <!-- <deleteorder :deletetoggle="b" @closed="b=false" :delete_id="id_delete" /> -->
    <v-card class="color">
      <v-card-title>
        แจ้งการชำระเงิน
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
          <v-data-table :headers="headers" :search="search" class="elevation-1" :items="show">
            <template v-slot:item.paymentImage="{ item }">
              <div class="img">
                <img :src="item.paymentImage" height="150px" width="150px" />
              </div>
            </template>

            <template v-slot:item.paymentstatus="{ item }">
              <div v-if="item.paymentstatus =='สำเร็จ' ">
                <v-btn color="green" :style="{color:'white'}">{{item.paymentstatus}}</v-btn>
              </div>
              <div v-else-if="item.paymentstatus =='กำลังดำเนินการ' ">
                <v-btn color="amber darken-2" :style="{color:'white'}">{{item.paymentstatus}}</v-btn>
              </div>
              <div v-else-if="item.paymentstatus =='ไม่สำเร็จ' ">
                <v-btn color="red darken-2" :style="{color:'white'}">{{item.paymentstatus}}</v-btn>
              </div>
            </template>

            <template v-slot:item.edit="{ item }">
              <v-btn @click="modalToggle(item)" class="center">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </div>
    </v-card>
  </div>
</template>

<script>
import updatepayment from "../../components/payment/updatepayment";
export default {
  components: {
    updatepayment,
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
          text: "ลำดับ",
          align: "start",
          sortable: true,
          value: "paymentid",
        },
        { text: "หมายเลขออเดอร์", value: "orderid" },
        { text: "วันที่โอน", value: "orderdate" },
        { text: "เวลาที่โอน", value: "ordertime" },
        { text: "ชื่อผู้โอน", value: "transferName" },
        { text: "ธนาคารที่โอน", value: "bankName" },
        { text: "ยอดที่ต้องชำระ", value: "netprice" },
        { text: "ยอดที่แจ้งชำระ", value: "totalprice" },
        { text: "หลักฐานการโอน", value: "paymentImage" },
        { text: "สถานะ", value: "paymentstatus" },
        { text: "แก้ไข", value: "edit" },
      ],
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/payments/showpayment");
    this.show = res.data.payments;
    console.log("show", res.data.payments);
    // this.getProduct();
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