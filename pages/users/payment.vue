<template>
  <v-container>
    <v-snackbar :color="coloralert" :value="alertstatus" :timeout="timeout" top>{{ alertMessage }}</v-snackbar>

    <h3 :style="{ color: 'black' }">ชำระเงิน</h3>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">{{ item.text.toUpperCase() }}</v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <div>
      <v-card>
        <h6 class="address">
          <v-icon>mdi-map-marker</v-icon>ที่อยู่ในการจัดส่ง
        </h6>

        <v-container class="ad">
          <b>
            {{ $nuxt.$auth.user[0].firstname }}
            {{ $nuxt.$auth.user[0].lastname }}
            {{ $nuxt.$auth.user[0].phone }}
          </b>
          {{ $nuxt.$auth.user[0].address }}
          <!-- <a class="edit">แก้ไข</a> -->
        </v-container>
      </v-card>
      <v-container row>
        <v-flex xs8 :style="{ color: 'black' }" class="text-center">
          รายการสั่งซื้อ
          <table :style="{ width: '100%', height: '50%' }">
            <tr class="head">
              <th>สินค้า</th>
              <th>รูปสินค้า</th>
              <th>จำนวน</th>
              <th>ราคาต่อชิ้น</th>
              <th>ราคารวม</th>
            </tr>
            <tr v-for="(item, idx) in cartdb.carts" :key="idx">
              <td>{{ item.productname }}</td>
              <td>
                <img :src="item.productimage" />
              </td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unitprice }}</td>
              <td>฿{{ formatPrice(item.quantity * item.unitprice) }}</td>
              <div class="hidden">{{setvalue(item.productid)}}</div>
            </tr>
            <tr class="head">
              <th>รวม(ยังไม่รวมภาษีมูลค่าเพิ่ม 7%)</th>
              <th colspan="4">{{ formatPrice(totalPrice) }} บาท</th>
            </tr>
          </table>
        </v-flex>
        <v-flex xs4 :style="{ color: 'black' }" class="text-center">
          ตัวเลือกการจัดส่ง
          <v-container>
            <v-select
              v-model="shmId"
              :items="ship_medthod"
              item-text="name"
              item-value="id"
              solo
              label="กรุณาเลือกการจัดส่ง"
            ></v-select>
          </v-container>
          <v-btn v-for="(item, idx) in cartdetail" :key="idx" :to="item.to">ย้อนกลับ</v-btn>
          <v-btn color="green" @click="confirm()">สั่งสินค้า</v-btn>
        </v-flex>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import moment from "moment";
import "moment/locale/th";
import { format, parseISO } from "date-fns";
import CartProvider from "@/resources/cart_provider";
import CartController from "@/utils/cart_controller";
export default {
  data() {
    return {
      productidvalue: "",
      lastestordernum: 0,
      ordertime: "",
      orderdate: "",
      tracking: "",
      address: "",
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      cartdb: [],
      totalPrice: "",
      ship_medthod: [],
      shmId: "",
      netprice: "",
      vat7: "",
      cartdetail: [{ to: "/users/cartdetail" }],
      po: [{ to: "/users/po" }],
      date: parseISO(new Date().toISOString()),
      items: [
        {
          text: "หน้าหลัก",
          disabled: false,
          to: "/",
        },
        {
          text: "รายละเอียดตะกร้าสินค้า",
          disabled: false,
          to: "/users/cartdetail",
        },
        {
          text: "ชำระเงิน",
          disabled: false,
          to: "/users/payment",
        },
      ],
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let resship = await this.$http.get("/ship_medthod");
    // console.log(res.data);
    let temp = resship.data.ship_medthod;
    this.ship_medthod = temp.map((c) => ({
      name: c.shmName,
      id: c.shmId,
    }));
  },
  async mounted() {
    this.userid = this.$nuxt.$auth.user[0].userid;
    let uid = this.$nuxt.$auth.user[0].userid;
    let res = await CartController.getCartById(uid);
    let cartLength = await CartController.getCartLength(uid);
    this.$store.dispatch("setCartLength", cartLength);
    this.cartdb = res;
    this.cartTotalPrice();
  },

  methods: {
    confirm() {
      if (
        this.$nuxt.$auth.user[0].phone == "" ||
        this.$nuxt.$auth.user[0].phone == null ||
        this.$nuxt.$auth.user[0].phone == undefined ||
        this.$nuxt.$auth.user[0].address == "" ||
        this.$nuxt.$auth.user[0].address == null ||
        this.$nuxt.$auth.user[0].address == undefined
      ) {
        console.log("ยังไม่ได้กรอกที่อยู่ เบอร์โทร");
        this.alertstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.alertMessage =
            "กรอกข้อมูลที่อยู่และเบอร์โทรที่สามารถติดต่อได้ ที่โปรไฟล์ของท่าน");
      } else {
        if (this.shmId == "" || this.shmId == null || this.shmId == undefined) {
          console.log("กรุณาเลือกการจัดส่ง");
          this.alertstatus = true;
          (this.coloralert = "red lighten-2"),
            (this.alertMessage = "กรุณาเลือกการจัดส่ง");
        } else {
          this.orderdate = moment(this.date).format("dddd,DD-MMMM-YYYY");
          console.log("สั่งสินค้า", this.orderdate);
          this.ordertime = moment(this.date).format("HH.mm.ss");
          console.log("เวลา", this.ordertime);
          this.alertstatus = true;
          (this.coloralert = "green lighten-2"),
            (this.alertMessage = "สั่งสินค้า");
          this.address = this.$nuxt.$auth.user[0].address;
          this.vat7 = this.totalPrice * (7 / 100);
          this.netprice = this.vat7 + this.totalPrice;
          this.insertorder();
        }
      }
    },
    async insertorder() {
      let order = await this.$http.post("/orders", {
        userid: this.userid,
        orderdate: this.orderdate,
        ordertime: this.ordertime,
        tracking: this.tracking,
        shipMedthod: this.shmId,
        orderAddress: this.address,
        netprice: this.netprice,
      });
      this.lastestordernum = order.data.lastesordernum[0];
      console.log("test1", this.lastestordernum);
      this.$store.dispatch("resetState");
      this.resetCart(this.productidvalue);
      this.$router.push({
        name: "users-po",
        params: { orderq: this.lastestordernum },
      });
    },
    async resetCart(id) {
      let res = await this.$http.post("/carts/delete", {
        productid: id,
      });
      if (!res.data.ok) {
        console.log("รีเซ็ทค่า");
      } else {
        console.log("ลบ");
      }
      this.dialog = false;
    },
    setvalue(pid) {
      this.productidvalue = pid;
    },

    cartTotalPrice() {
      this.totalPrice = 0; //คิดราคารวมของรายการสั่งซื้อนั้นๆ
      for (const product of this.cartdb.carts) {
        this.totalPrice += product.quantity * product.unitprice;
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style>
.edit {
  float: right;
}
.address {
  padding-top: 20px;
  padding-left: 20px;
}
.ad {
  padding-left: 43px;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.head {
  background-color: paleturquoise;
}
.hidden {
  display: none;
}
</style>
