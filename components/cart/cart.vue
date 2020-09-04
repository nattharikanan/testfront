<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon color="white" dark v-on="on" @click="getCartDB">
          <v-icon size="25px">mdi-cart</v-icon>
          {{ cartItemCount }}
        </v-btn>
      </template>
      <!-- v-for="(comment, idx) in comments" :key="idx" -->
      <v-list class="cartlist">
        <div v-if="cartItemCount == 0">
          <h6 align="center">ท่านยังไม่มีสินค้าในตะกร้า</h6>
        </div>
        <!-- <div v-for="(item, idx) in cart" :key="idx">
          <div class="px-2 d-flex justify-content-between">
            <div>
              <strong>{{ item.product}}</strong>
              <br />
              {{ item.quantity }} x {{ item.product[0].unitprice }}
            </div>
            <div>
              <a href="#" class="badge badge-secondary">ลบ</a>
            </div>
          </div>
        </div>-->

        <div v-for="(item, idx) in cartdb.carts" :key="idx">
          <div class="px-2 d-flex justify-content-between">
            <div>
              <strong>{{ item.productname }}</strong>

              <br />
              {{ item.quantity }} * {{ formatPrice(item.unitprice) }}
              <br />
              รวม
              : {{ formatPrice(item.quantity * item.unitprice) }}
            </div>
            <div></div>
            <div>
              <a text @click="dialog = true,myid = item.productid" class="badge badge-secondary">ลบ</a>
              <!-- <a @click="deletecart(item.productid)" class="badge badge-secondary">ลบ</a> -->
            </div>
          </div>
        </div>

        <hr />

        <div class="px-2 d-flex justify-content-between">
          <span>ยอดรวม : {{ formatPrice(totalPrice) }} บาท</span>

          <nuxt-link
            v-for=" (item,idx) in cartdetail "
            :key="idx"
            :to="item.to"
          >รายละเอียดตะกร้าสินค้า</nuxt-link>
        </div>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>ท่านต้องการลบสินค้าในตะกร้าใช่หรือไม่ ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deletecart(myid)">ใช่</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">ไม่ใช่</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-btn icon color="white" data-toggle="modal" data-target="#cartModal" @click = "showcart()"> -->
    <!-- ปุ่มตะกร้าสินค้า -->
    <!-- <v-badge color="green" :content="noti">
          <v-icon size="25px">mdi-shopping-outline</v-icon>
        </v-badge>
      </v-btn>
    -->
    <!-- ปุ่มใบเสนอราคา -->
    <!-- <v-btn icon color="white">
      
      <v-icon size="25px">mdi-clipboard-text-outline</v-icon>
    </v-btn>-->
  </div>
</template>

<script>
import CartProvider from "@/resources/cart_provider";
import CartController from "@/utils/cart_controller";

const cartService = new CartProvider();
export default {
  data() {
    return {
      myid: "",
      cartdb: [],
      totalPrice: 0,
      dialog: false,
      cartdetail: [{ to: "/users/cartdetail" }],
    };
  },
  watch: {
    //ฟังก์ชันไว้คอยดูตัวแปร
  },
  //  async created(){
  //    let uid = this.$nuxt.$auth.user[0].userid
  //       let res = await this.$http.get("/carts/cartlength", {
  //         params: { userid: uid }
  //       });
  //       this.cartlength =res.data.carts[0].length;
  //       console.log("ขนาด",res.data.carts[0].length)

  //  },
  computed: {
    // cart() {
    //   const temp = this.$store.state.cart;
    //   const productsInCart = temp.map(item => {

    //     return {
    //       name: item.product.productname,
    //       quantity: item.quantity,
    //       price: item.product.unitprice,
    //       totalPrice:item.quantity * item.product.unitprice
    //     };
    //   });
    //   return productsInCart;
    // },
    cartItemCount() {
      return this.$store.getters.CartLength;
    },
    // cartTotalPrice() {
    //   return this.$store.getters.cartTotalPrice;
    // }
  },
  async mounted() {
    if ($nuxt.$auth.loggedIn == false) {
    } else {
      let cartLength = await CartController.getCartLength(
        this.$nuxt.$auth.user[0].userid
      );

      this.$store.dispatch("setCartLength", cartLength);
    }
  },

  methods: {
    async deletecart(id) {
      let res = await this.$http.post("/carts/delete", {
        productid: id,
      });
      if (!res.data.ok) {
        console.log("ลบข้อมูลสินค้าไม่สำเร็จ");
      } else {
        console.log("ลบ");
      }
      this.dialog = false;
    },
    cartTotalPrice() {
      this.totalPrice = 0;
      for (const product of this.cartdb.carts) {
        this.totalPrice += product.quantity * product.unitprice;
      }
    },
    async getCartDB() {
      if ($nuxt.$auth.loggedIn == false) {
        this.$router.push("/users/login");
      } else {
        let uid = this.$nuxt.$auth.user[0].userid;
        // let res = await this.$http.get("/carts/detail", {
        //   params: { userid: uid }
        // });
        let res = await CartController.getCartById(uid);
        let cartLength = await CartController.getCartLength(uid);
        this.$store.dispatch("setCartLength", cartLength);
        this.cartdb = res;
        this.cartTotalPrice();

        //เรียก created อีกรอบ
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
.cartlist {
  width: 320px;
}
</style>
