<template>
  <v-container>
    <div v-if="checknull != 0">
      <h3 :style="{ color: 'black' }">รายละเอียดสินค้าในตะกร้า</h3>
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">{{ item.text.toUpperCase() }}</v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <deleteproduct :deletetoggle="b" @closed="b = false" :delete_id="id_delete" />
      <div :style="{ color: 'black' }" class="text-center">
        <table :style="{ width: '100%', height: '50%' }">
          <tr class="head">
            <th>สินค้า</th>
            <th>รูปสินค้า</th>
            <th>จำนวน</th>
            <th>ราคาต่อชิ้น</th>
            <th>ราคารวม</th>
            <th>แอคชั่น</th>
          </tr>
          <tr v-for="(item, idx) in cartdb.carts" :key="idx">
            <td>{{ item.productname }}</td>
            <td>
              <img :src="item.productimage" />
            </td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unitprice }}</td>
            <td>฿{{ formatPrice(item.quantity * item.unitprice) }}</td>
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
          <v-btn width="200px" v-for="(item, idx) in product" :key="idx" :to="item.to">ย้อนกลับ</v-btn>
        </v-flex>
        <v-flex xs6 class="text-right">
          <v-btn
            color="green"
            width="200px"
            :style="{ color: 'white' }"
            v-for="(item, id) in payment"
            :key="'A' + id"
            :to="item.to"
          >ชำระสินค้า ></v-btn>
        </v-flex>
      </v-container>
    </div>
    <div
      v-else-if="checknull == 0"
      :style="{ color: 'black' }"
      class="text-center"
    >ขออภัย , ท่านยังไม่มีสินค้าในตะกร้า</div>
  </v-container>
</template>

<script>
import CartProvider from "@/resources/cart_provider";
import CartController from "@/utils/cart_controller";
import deleteproduct from "../../components/deleteproduct/deleteproduct";

const cartService = new CartProvider();
export default {
  components: {
    deleteproduct,
  },
  data() {
    return {
      checknull: "",
      totalPrice: "",
      b: false,
      id_delete: 0,
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
  async mounted() {
    let uid = this.$nuxt.$auth.user[0].userid;
    let res = await CartController.getCartById(uid);
    let cartLength = await CartController.getCartLength(uid);
    this.$store.dispatch("setCartLength", cartLength);
    this.cartdb = res;
    this.cartTotalPrice();
    this.checknull = this.cartdb.carts.length;
    console.error("testcartdb", this.checknull);
  },
  methods: {
    cartTotalPrice() {
      this.totalPrice = 0;
      for (const product of this.cartdb.carts) {
        this.totalPrice += product.quantity * product.unitprice;
      }
    },
    ToggleDelete(pid) {
      this.id_delete = pid;
      this.b = true;
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
    test() {},
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
