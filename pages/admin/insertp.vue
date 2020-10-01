<template>
  <v-container fluid ma-2 pa-2>
    <!-- <editproduct :toggle="a" @close="a = false" :sendvalue="send" />
    <deleteproduct :deletetoggle = "b" @closed ="b=false" :delete_id="id_delete"/>-->

    <v-layout row>
      <v-flex xs2 class="menu">
        <v-card class="mx-auto" max-width="300">
          <v-list rounded>
            <v-subheader>หน้าการจัดการของผู้ดูแลระบบ</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="select(item.number)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex xs10>
        <div v-if="menu === 1">
          <showproduct />
        </div>
        <div v-else-if="item === 0">
          <showproduct />
        </div>

        <div v-else-if="menu === 2">
          <showorder />
        </div>
        <div v-else-if="menu === 3">
          <showqua />
        </div>
        <div v-else-if="menu === 4">
          <showpayment />
        </div>
        <div v-else-if="menu === 5">
          <addcategory />
        </div>
        <div v-else-if="menu === 6">
          <showbank />
        </div>
        <div v-else-if="menu === 7">
          <showship />
        </div>
        <div v-else-if="menu === 8">
          <showuser />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import showproduct from "../../components/showproduct/showproduct";
import showorder from "../../components/showorder/showorder";
import addcategory from "../../components/category/addcategory";
import showpayment from "../../components/payment/showpayment";
import showbank from "../../components/bank/showbank";
import showqua from "../../components/showqua/showqua";
import showuser from "../../components/showuser/showuser";
import showship from "../../components/showship/showship";

export default {
  middleware: "auth",
  props: ["m"],
  components: {
    // addproduct,
    // editproduct,
    // deleteproduct,
    showproduct,
    showorder,
    addcategory,
    showpayment,
    showbank,
    showqua,
    showuser,
    showship,
  },
  // middleware: ["auth"],
  data() {
    return {
      items: [
        { text: "จัดการข้อมูลสินค้า", icon: "mdi-pencil", number: 1 },
        { text: "ข้อมูลการสั่งซื้อ", icon: "mdi-shopping", number: 2 },
        {
          text: "ข้อมูลใบเสนอสินค้า",
          icon: "mdi-view-list-outline",
          number: 3,
        },
        {
          text: "แจ้งการชำระเงิน",
          icon: "mdi-cash-usd-outline",
          number: 4,
        },
        {
          text: "ประเภทสินค้า",
          icon: "mdi-basket-unfill",
          number: 5,
        },
        {
          text: "ธนาคาร",
          icon: "mdi-bank",
          number: 6,
        },
        {
          text: "การจัดส่ง",
          icon: "mdi-car-estate",
          number: 7,
        },
        {
          text: "จัดการสมาชิก",
          icon: "mdi-account",
          number: 8,
        },
      ],
      item: 0,
      menu: "",
      id_delete: 0,
      send: {},
      a: false,
      b: false,
      categories: [],
      productname: "",
      categoryid: "",
      unitprice: "",
      notation: "",
      productstatus: "",
      productimage: "",
      show: [],
      search: "",
      headers: [
        {
          text: "ชื่อสินค้า",
          align: "start",
          sortable: false,
          value: "productname",
        },
        { text: "รหัสสินค้า", value: "productid" },
        { text: "ประเภทสินค้า", value: "categoryname" },
        { text: "ราคา", value: "unitprice" },
        { text: "หมายเหตุ", value: "notation" },
        { text: "สถานะสินค้า", value: "productstatus" },
        { text: "ภาพสินค้า", value: "productimage" },
        { text: "แก้ไขสินค้า", value: "edit" },
      ],
    };
  },
  watch: {
    //ฟังก์ชันไว้คอยดูตัวแปร
  },
  methods: {
    select(number) {
      this.menu = number;
    },

    modalToggle(item) {
      this.send = item;
      this.a = true;
    },
    ToggleDelete(pid) {
      this.id_delete = pid.productid;
      this.b = true;
      console.log("hi", this.id_delete);
    },
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid },
      });

      this.show = res.data.products;
    },
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/categories");
    // console.log(res.data);
    let temp = res.data.categories;
    this.categories = temp.map((c) => ({
      name: c.categoryname,
      id: c.categoryid,
    }));

    this.getProduct();
  },
};
</script>

<style>
.img {
  border: 1px solid #ddd;
  width: 150px;
}
.img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}

.setcolor {
  color: black;
}
.menu {
}
</style>
