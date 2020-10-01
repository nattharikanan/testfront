<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>กรุณาระบุจำนวนสินค้าให้ถูกต้อง</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false"
            >รับทราบ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="checknull != 0">
      <h3 :style="{ color: 'black' }">รายละเอียดสินค้าในตะกร้า</h3>
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">{{
            item.text.toUpperCase()
          }}</v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <deleteitem
        :deletetoggle="b"
        @closed="b = false"
        :delete_id="id_delete"
        :user_id="userid"
      />
      <div :style="{ color: 'black' }" class="text-center">
        <table :style="{ width: '100%', height: '50%' }">
          <tr class="head">
            <th>สินค้า</th>
            <th>รูปสินค้า</th>
            <th>จำนวน</th>
            <th>ราคาต่อชิ้น</th>
            <th>ราคารวม</th>
            <th>น้ำหนักต่อชิ้น</th>
            <th>แอคชั่น</th>
          </tr>
          <tr v-for="(item, idx) in cartdb.carts" :key="idx">
            <td>{{ item.productname }}</td>
            <td>
              <img :src="item.productimage" />
            </td>
            <td>
              <v-container>
                <b-form-input
                  class="ml-10"
                  id="input-1"
                  type="number"
                  min="1"
                  v-model="item.quantity"
                  oninput="validity.valid||(value='');"
                  required
                  @change="addproduct(item.quantity, item.productid)"
                ></b-form-input>
              </v-container>
            </td>
            <td>{{ item.unitprice }}</td>
            <td>฿{{ formatPrice(item.quantity * item.unitprice) }}</td>
            <td>{{ item.unit }}</td>
            <td>
              <a @click="ToggleDelete(item.productid)">ลบ</a>
            </td>
          </tr>
          <tr class="head">
            <th>รวม</th>
            <th colspan="5">{{ formatPrice(totalPrice) }} บาท</th>
          </tr>
        </table>
      </div>
      <v-container row>
        <v-flex xs6 class="text-left">
          <v-btn
            width="200px"
            v-for="(item, idx) in product"
            :key="idx"
            :to="item.to"
            >ย้อนกลับ</v-btn
          >
        </v-flex>
        <v-flex xs6 class="text-right">
          <v-btn
            color="green"
            width="200px"
            :style="{ color: 'white' }"
            @click="gotopagepayment"
            >ชำระสินค้า
          </v-btn>
        </v-flex>
      </v-container>
    </div>
    <div
      v-else-if="still == true && checknull == 0"
      :style="{ color: 'black' }"
      class="text-center"
    >
      ขออภัย , ท่านยังไม่มีสินค้าในตะกร้า
    </div>
  </v-container>
</template>

<script>
import CartProvider from "@/resources/cart_provider";
import CartController from "@/utils/cart_controller";
import deleteitem from "@/components/cart/deleteitem-cart";

const cartService = new CartProvider();
export default {
  middleware: "auth",
  components: {
    deleteitem,
  },
  data() {
    return {
      dialog: false,
      triggle: false,
      changeproductid: "",
      changeuserid: "",
      changequantity: 1,
      still: false,
      checknull: "",
      totalPrice: "",
      b: false,
      id_delete: 0,
      userid: 0,
      qty: "",
      cartdb: [],
      totalPrice: 0,
      product: [{ to: "/product" }],
      payment: [{ to: "/users/payment" }],
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
      ],
    };
  },
  watch: {
    qty: {
      handler() {
        console.log("test qty", this.qty);
      },
    },
  },
  async created() {
    let uid = this.$nuxt.$auth.user[0].userid;
    let res = await CartController.getCartById(uid);
    let cartLength = await CartController.getCartLength(uid);
    this.$store.dispatch("setCartLength", cartLength);
    this.cartdb = res;
    this.cartTotalPrice();
    this.still = true;
    this.checknull = this.cartdb.carts.length;
  },
  async mounted() {},
  methods: {
    cartTotalPrice() {
      this.totalPrice = 0;
      for (const product of this.cartdb.carts) {
        this.totalPrice += product.quantity * product.unitprice;
      }
    },
    gotopagepayment() {
      // if (this.changequantity == "" || this.changequantity == 0) {
      //   this.dialog = true;
      // }
      //
      console.log(this.changequantity);
      if (this.changequantity == "" || this.changequantity == 0) {
        this.dialog = true;
        // this.changequantity = 1;
      } else {
        this.$router.push("/users/payment");
      }
    },
    async addproduct(num, id) {
      this.triggle = true;
      this.changequantity = num;
      this.changeproductid = id;

      if (this.changequantity == "" || this.changequantity == 0) {
        this.dialog = true;
        // this.changequantity = 1;
      }
      let userid = $nuxt.$auth.user[0].userid;
      console.log(this.changequantity, this.changeproductid, userid);
      let res = await this.$http.post("/carts/updatequantity", {
        productid: this.changeproductid,
        userid: userid,
        quantity: this.changequantity,
      });
      if (!res.data.ok) {
        console.log("NO");
      } else {
        console.log("YES");
      }
    },
    async updatetocart() {
      //change quantity before ordering

      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "green";
        (this.alertstatus = true),
          (this.alertMessage = "เพิ่มข้อมูลสินค้าถูกต้อง");
        this.close();
      }
      gotopage;
    },
    ToggleDelete(pid) {
      this.id_delete = pid;
      this.b = true;
      this.userid = $nuxt.$auth.user[0].userid;
    },
    cartTotalPrice() {
      this.totalPrice = 0;
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
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.head {
  background-color: paleturquoise;
}
</style>
