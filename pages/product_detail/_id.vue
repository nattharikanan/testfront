<template>
  <v-layout class="details">
    <v-container>
      <v-card
        full-height="900px"
        class="mx-auto"
        v-for="dt in productg.products"
        :key="dt.productid"
      >
        <v-list-item three-line>
          <v-list>
            <v-img class="productimg" :src="dt.productimage"></v-img>
          </v-list>

          <!-- <v-list-item-content>
        <v-list-item-title class="headline">{{dt.productname}}</v-list-item-title>
          <v-list-item-subtitle class="headline" > ฿ {{ dt.unitprice}}</v-list-item-subtitle>
        <v-list-item-subtitle >หมายเหตุ : {{ dt.notation}}</v-list-item-subtitle>

        </v-list-item-content>-->
          <div class="paragraph">
            <h2>{{ dt.productname }}</h2>
            <br />
            <h4 class="price" style="color:#F39C12">
              ฿ {{ formatPrice(dt.unitprice) }}
            </h4>
            <br />
            <h6>หมายเหตุสินค้า : {{ dt.notation }}</h6>
            <br />
            <h6>สถานะสินค้า : {{ dt.productstatus }}</h6>
            <br />
            <v-card-actions class="action">
              <v-btn
                v-for="(item, idx) in product"
                :key="idx"
                :to="item.to"
                color="warning"
                :style="{ width: '200px', height: '60px' }"
                >ย้อนกลับ</v-btn
              >
              <div v-if="dt.quotationStatus == 'ขอใบเสนอราคา'">
                <v-btn
                  color="green"
                  :style="{ width: '200px', height: '60px' }"
                  @click="addToQuo()"
                  >ขอใบเสนอราคา</v-btn
                >
              </div>
              <div v-else>
                <div v-if="dt.productstatus == 'สินค้าหมดชั่วคราว'">
                  <v-btn :style="{ width: '200px', height: '60px' }" disabled
                    >สินค้าหมดชั่วคราว</v-btn
                  >
                </div>
                <div v-else-if="dt.productstatus == 'สินค้ายกเลิกการจำหน่าย'">
                  <v-btn :style="{ width: '200px', height: '60px' }" disabled
                    >สินค้ายกเลิกการจำหน่าย</v-btn
                  >
                </div>
                <div v-else>
                  <v-btn
                    color="success"
                    :style="{ width: '200px', height: '60px' }"
                    @click="addToCart(dt.productid)"
                    >หยิบใส่รถเข็น</v-btn
                  >
                </div>
              </div>
            </v-card-actions>
          </div>
        </v-list-item>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import CartController from "@/utils/cart_controller";
export default {
  data() {
    return {
      product: [{ to: "/product" }]
    };
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  name: "product_detail-id",
  computed: {
    productg() {
      return this.$store.state.productg;
      console.log("test", this.$store.state.productg);
    }
  },
  mounted() {
    this.$store.dispatch("getProduct", this.$route.params.id);
  },
  methods: {
    addToQuo() {
      console.log("ขอใบเสนอราคา");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async addToCart(id) {
      if ($nuxt.$auth.loggedIn == false) {
        this.$router.push("/users/login");
      } else {
        let res = await this.$http.get("/product", {
          params: { productid: id }
        });
        let uid = $nuxt.$auth.user[0].userid;
        let resuser = await this.$http.get("/users", {
          params: { userid: uid }
        });

        this.selected = res.data.products;
        let testapi = await CartController.addToCart({
          id,
          quantity: 1,
          uid
        });
        // console.log("test api",testapi)
        // let cartLength = await CartController.getCartLength(this.$nuxt.$auth.user[0].userid);

        this.$store.dispatch("setCartLength", testapi.carts.length);

        // this.$store.dispatch("addProductToCart", {
        //   id: id,
        //   quantity: 1,
        //   uid: uid
        // })
        // this.$store.dispatch("mylength");
        // let cartlength = await cartService.getCartLength(this.$nuxt.$auth.user[0].userid)
        // this.$store.dispatch("setCartLength", cartlength.carts[0].length);
      }
    }
  }
};
</script>

<style>
.details {
  color: black;
  padding-top: 10px;
}
.productimg {
  margin-right: 50px;
  width: 400px;
}
.paragraph {
  margin-top: 10px;
}
.price {
  font-weight: bold;
}
</style>
