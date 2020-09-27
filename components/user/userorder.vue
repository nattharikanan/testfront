<template>
  <v-flex>
    <v-card width="90%">
      <!-- <div class="overline mb-4">ข้อมูลของฉัน</div> -->
      <v-container>
        <v-list-item-title>รายการสั่งซื้อของฉัน</v-list-item-title>
        <v-list-item-subtitle
          >จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</v-list-item-subtitle
        >
        <v-divider></v-divider>

        <!-- <editorder :toggle="a" @close="a = false" :sendvalue="send" />
        <deleteorder :deletetoggle="b" @closed="b=false" :delete_id="id_delete" />-->
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

              <!-- <template v-slot:item.edit="{ item }">
                <v-btn @click="modalToggle(item)" class="center">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="ToggleDelete(item)" class="center">
                <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>-->
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
                <div v-else-if="item.orderStatus === 'การชำระเงินไม่สำเร็จ'">
                  <v-btn color="red">{{ item.orderStatus }}</v-btn>
                </div>
              </template>
              <template v-slot:item.payment="{ item }">
                <div v-if="item.orderStatus === 'รอการชำระเงิน'">
                  <v-btn @click="TogglePayment(item)">คลิก</v-btn>
                </div>
                <div v-else>
                  <v-btn disabled>คลิก</v-btn>
                </div>
              </template>
            </v-data-table>
          </v-flex>
        </div>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      a: false,
      b: false,
      id_delete: 0,
      userid: "",
      show: [],
      search: "",
      send: {},
      headers: [
        {
          text: "หมายเลขคำสั่งซื้อ (คลิกเพื่อดูข้อมูลเพิ่มเติม)",
          align: "start",
          sortable: false,
          value: "orderid"
        },
        { text: "วันที่สั่งสินค้า", value: "orderdate" },
        { text: "เลขพัสดุ", value: "tracking" },
        { text: "สถานะคำสั่งซื้อ", value: "orderStatus" },
        { text: "ชำระเงิน", value: "payment" }
        // { text: "แก้ไข", value: "edit" },
      ]
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    this.userid = this.$nuxt.$auth.user[0].userid;
    console.log("user", this.userid);
    let res = await this.$http.get(`orders/me?userid=${this.userid}`);
    this.show = res.data.carts;
    console.log("show", this.show);
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
    TogglePayment(pid) {
      console.log("hi", pid.orderid);
      this.$router.push({
        name: "payment",
        params: { orderid: pid.orderid }
      });
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
