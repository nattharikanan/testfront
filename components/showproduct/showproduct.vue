<template>
  <div>
    <editproduct :toggle="a" @close="a = false" :sendvalue="send" />
    <deleteproduct
      :deletetoggle="b"
      @closed="b = false"
      :delete_id="id_delete"
    />
    <v-card>
      <v-card-title>
        ข้อมูลสินค้า
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาชื่อสินค้า"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
        <addproduct />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :search="search"
        :items="show"
        class="elevation-1"
      >
        <template v-slot:item.productstatus="{ item }">
          <div v-if="item.productstatus == 'พร้อมส่ง'">
            <v-btn rounded color="green" :style="{ color: 'white' }">{{
              item.productstatus
            }}</v-btn>
          </div>
          <div v-else-if="item.productstatus == 'สินค้าหมดชั่วคราว'">
            <v-btn rounded color="amber darken-2" :style="{ color: 'white' }">{{
              item.productstatus
            }}</v-btn>
          </div>
          <div v-else-if="item.productstatus == 'สินค้ายกเลิกการจำหน่าย'">
            <v-btn rounded color="red darken-2" :style="{ color: 'white' }">{{
              item.productstatus
            }}</v-btn>
          </div>
        </template>
        <template v-slot:item.productimage="{ item }">
          <div class="img">
            <img :src="item.productimage" height="150px" width="150px" />
          </div>
        </template>
        <template v-slot:item.quotationStatus="{ item }">
          <div v-if="item.quotationStatus == 'ขอใบเสนอราคา'">
            <v-icon color="green">mdi-check-bold</v-icon>
          </div>
          <div v-else>
            <v-icon color="red">mdi-close</v-icon>
          </div>
        </template>
        <template v-slot:item.edit="{ item }">
          <v-card class="d-flex flex-row mb-6">
            <v-btn @click="modalToggle(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="ToggleDelete(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import addproduct from "../../components/addproduct/addproduct";
import editproduct from "../../components/editproduct/editproduct";
import deleteproduct from "../../components/deleteproduct/deleteproduct";
export default {
  components: {
    addproduct,
    editproduct,
    deleteproduct,
  },
  data() {
    return {
      checkbox: "",
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
        { text: "กว้าง", value: "width" },
        { text: "ยาว", value: "length" },
        { text: "สูง", value: "height" },
        { text: "น้ำหนัก", value: "weight" },
        { text: "หน่วย", value: "unit" },
        { text: "ขอใบเสนอราคา", value: "quotationStatus" },
        { text: "แก้ไขสินค้า", value: "edit" },
      ],
    };
  },
  watch: {
    checkbox: {
      handler() {
        console.log("check", this.checkbox);
      },
    },
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/categories");
    let temp = res.data.categories;
    this.categories = temp.map((c) => ({
      name: c.categoryname,
      id: c.categoryid,
    }));
    this.getProduct();
  },

  methods: {
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
};
</script>

<style>
.table {
  border: none;
}
.head {
  text-align: center;
}
</style>
