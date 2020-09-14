<template>
  <div>
    <askbefore
      :toggle="dialog"
      @close="dialog = false"
      :pidq="getpid"
      :pnameq="getpname"
      @submited="gotopage"
    />

    <v-snackbar :color="coloralert" v-model="alertstatus" :timeout="timeout" top>{{ alertMessage }}</v-snackbar>
    <v-app class="app">
      <v-content>
        <v-container fluid ma-0 pa-0 fill-height>
          <v-layout row>
            <v-flex xs4>
              <v-container>
                <v-card width="400">
                  <v-list-item class="blue lighten-4">ประเภทสินค้า</v-list-item>
                  <v-list-item v-for="c in categories" :key="c.id" @click="categorySelect(c.id)">
                    <v-list-item-title>{{ c.name }}</v-list-item-title>
                  </v-list-item>
                </v-card>
              </v-container>
            </v-flex>

            <v-flex xs8>
              <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                  <v-text-field
                    solo
                    v-model.lazy="search"
                    placeholder="พิมพ์ชื่อสินค้าเพื่อค้นหา ..."
                    append-icon="mdi-magnify "
                    @input="handleClicked"
                  ></v-text-field>
                </b-col>
                <b-col cols="2"></b-col>
              </b-row>

              <!-- <v-text-field
                solo
                v-model.lazy="search"
                placeholder="พิมพ์ชื่อสินค้าเพื่อค้นหา ..."
                append-icon="mdi-magnify "
                @input="handleClicked"
              ></v-text-field>-->

              <v-container class="d-flex flex-wrap">
                <v-card
                  v-for="p in products"
                  :key="p.productid"
                  class="ma-2"
                  max-width="250"
                  max-height="380"
                  raised
                  :style="{ border: '3px', color: '#DCDCDC' }"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4"></div>
                      <nuxt-link
                        :to="{
                          name: 'product_detail-id',
                          params: {
                            id: p.productid
                          }
                        }"
                      >
                        <img
                          :src="p.productimage"
                          :style="{
                            marginTop: '10px',
                            height: '150px',
                            width: '200px',
                            marginLeft: '10px'
                          }"
                        />
                      </nuxt-link>
                      <nuxt-link
                        :to="{
                          name: 'product_detail-id',
                          params: {
                            id: p.productid
                          }
                        }"
                      >
                        <v-list-item-title :style="{ marginLeft: '10px' }">
                          {{
                          p.productname
                          }}
                        </v-list-item-title>
                      </nuxt-link>
                      <v-list-item-subtitle :style="{ marginLeft: '10px' }">
                        ราคา :
                        {{ formatPrice(p.unitprice) }} บาท
                      </v-list-item-subtitle>
                      <v-list-item-subtitle></v-list-item-subtitle>
                      <div v-if="p.productstatus == 'พร้อมส่ง'">
                        <h6 :style="{ color: 'green', marginLeft: '10px' }">
                          สินค้าพร้อมส่ง
                          <v-icon color="green">mdi-check-circle</v-icon>
                        </h6>
                      </div>
                      <div v-else-if="p.productstatus == 'สินค้าหมดชั่วคราว'">
                        <h6 :style="{ color: 'orange', marginLeft: '10px' }">
                          {{ p.productstatus }}
                          <v-icon color="amber darken-2">mdi-cart-off</v-icon>
                        </h6>
                      </div>
                      <div v-else-if="p.productstatus == 'สินค้ายกเลิกการจำหน่าย'">
                        <h6 :style="{ color: 'red', marginLeft: '10px' }">{{ p.productstatus }}</h6>
                      </div>
                    </v-list-item-content>

                    <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
                    <!-- <img :src="p.productimage" /> -->
                  </v-list-item>

                  <v-card-actions class="addbutton">
                    <div v-if="p.weight > 25">
                      <v-btn
                        class="buttonwidth"
                        color="warning"
                        @click="addToQuo(p.productid,p.productname)"
                      >ขอใบเสนอราคา</v-btn>
                    </div>
                    <div v-else>
                      <div v-if="p.productstatus == 'สินค้าหมดชั่วคราว'">
                        <v-btn disabled class="buttonwidth">สินค้าหมด</v-btn>
                      </div>
                      <div v-else-if="p.productstatus == 'สินค้ายกเลิกการจำหน่าย'">
                        <v-btn disabled class="buttonwidth">ใส่ตะกร้า</v-btn>
                      </div>
                      <div v-else-if="p.productstatus == 'พร้อมส่ง'">
                        <v-btn
                          class="buttonwidth"
                          color="success"
                          @click="addToCart(p.productid), (alertstatus = true)"
                        >ใส่รถเข็น</v-btn>
                      </div>
                    </div>

                    <!-- <v-btn
                      :style="{marginLeft:'10px',}"
                      color="warning"
                      dark
                      :to="{
        name: 'product_detail-id',
        params: {
          id:p.productid,
        }
      }"
                    >รายละเอียดสินค้า</v-btn>-->
                  </v-card-actions>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import MoneyFormat from "vue-money-format";
import CartProvider from "@/resources/cart_provider";
import CartController from "@/utils/cart_controller";
import askbefore from "@/components/quatation/askbefore";
import { tr } from "date-fns/locale";

const cartService = new CartProvider();

const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default {
  components: {
    askbefore,
  },
  name: "product",
  props: ["product"],
  data() {
    return {
      dialog: false,
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 4000,
      cost: 1234,
      search: "",
      categoryid: null,
      products: [],
      categories: [],
      selected: null,
      cartLengthTemp: 0,
      getpid: "",
      getpname: "",
    };
  },

  async created() {
    let res = await this.$http.get("/categories");
    console.log("respond", res.data);
    let temp = res.data.categories;
    this.categories = temp.map((c) => ({
      name: c.categoryname,
      id: c.categoryid,
    }));
    this.getProduct();
  },
  // computed:{
  //   product(){
  //   return this.$store.state.product
  //   console.log("test",this.$store.state.product)
  //   }
  // },
  mounted() {
    // this.$store.dispatch("getProduct");
  },

  methods: {
    gotopage(pid, form, pname) {
      if (form == 1) {
        this.$router.push({
          name: "quatation-quatation_form",
          params: { pidq: pid, pnameq: pname },
        });
      } else if (form == 2) {
        this.$router.push({
          name: "quatation-personal_form",
          params: { pidq: pid, pnameq: pname },
        });
      } else if (form == 3) {
        this.$router.push({
          name: "quatation-company_form",
          params: { pidq: pid, pnameq: pname },
        });
      }
    },
    addToQuo(pid, pname) {
      if ($nuxt.$auth.loggedIn == false) {
        this.$router.push("/users/login");
      } else {
        this.dialog = true;
        this.getpid = pid.toString();
        this.getpname = pname;
      }

      // this.$router.push({
      //   name: "quatation-form",
      //   params: { pidq: pid, toggle: true },
      // });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid },
      });
      console.log(res.data);
      this.products = res.data.products;
    },
    async categorySelect(_id) {
      this.categoryid = _id;
      this.getProduct();
    },
    async countproduct(_idd) {
      console("count", _idd);
    },
    async handleClicked() {
      console.log("FROM ENTER", this.search);
      let res = await this.$http.get("/product/search", {
        params: { productname: this.search },
      });
      console.log(res.data);
      this.products = res.data.products;
    },
    async addToCart(id) {
      if ($nuxt.$auth.loggedIn == false) {
        this.$router.push("/users/login");
      } else {
        let res = await this.$http.get("/product", {
          params: { productid: id },
        });
        let uid = $nuxt.$auth.user[0].userid;
        let resuser = await this.$http.get("/users", {
          params: { userid: uid },
        });

        this.selected = res.data.products;
        let testapi = await CartController.addToCart({
          id,
          quantity: 1,
          uid,
        });

        // console.log("test api",testapi)
        // let cartLength = await CartController.getCartLength(this.$nuxt.$auth.user[0].userid);
        console.log("click");
        this.$store.dispatch("setCartLength", testapi.carts.length);
        this.alertCart();
        // this.$store.dispatch("addProductToCart", {
        //   id: id,
        //   quantity: 1,
        //   uid: uid
        // })
        // this.$store.dispatch("mylength");
        // let cartlength = await cartService.getCartLength(this.$nuxt.$auth.user[0].userid)
        // this.$store.dispatch("setCartLength", cartlength.carts[0].length);
      }
    },
    alertCart() {
      console.log("alert");
      this.alertstatus = true;
      (this.coloralert = "green lighten-2"),
        (this.alertMessage = "คุณได้ทำการเพิ่มสินค้าไปยังรถเข็นเรียบร้อยแล้ว");
    },
    async updateCart() {
      let uid = this.$nuxt.$auth.user[0].userid;
      let resCart = await CartController.getCartById(uid);
      this.$store.dispatch("setCartLength", cartLength);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");

img {
  border: 4px solid #6495ed;

  width: 150px;
}
.text-center {
  padding-right: 25px;
  padding-top: 5px;
}
.addbutton {
  padding-left: 40px;
  margin-bottom: 10px;
}
.buttonwidth {
  width: 170px;
}
.app {
  font-family: "Kanit";
}
.searc {
  margin-top: 20px;
}
</style>
