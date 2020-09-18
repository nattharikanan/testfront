<template>
  <v-data-table
    :headers="headers"
    :items="show"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>ข้อมูลสินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาสินค้า"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              >เพิ่มสินค้า</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container> </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    editedIndex: -1,
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
        value: "productname"
      },
      { text: "รหัสสินค้า", value: "productid" },
      { text: "ประเภทสินค้า", value: "categoryid" },
      { text: "ราคา", value: "unitprice" },
      { text: "หมายเหตุ", value: "notation" },
      { text: "สถานะสินค้า", value: "productstatus" },
      { text: "ภาพสินค้า", value: "productimage" },
      { text: "แก้ไขสินค้า", value: "edit" }
    ]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async created() {
    // this.initialize()
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/categories");
    // console.log(res.data);
    let temp = res.data.categories;
    this.categories = temp.map(c => ({
      name: c.categoryname,
      id: c.categoryid
    }));
    this.getProduct();
  },

  methods: {
    test(id) {
      console.log("productid", id);
    },
    async insert() {
      let res = await this.$http.post("/product/insert", {
        productid: this.$route.query.productid,
        productname: this.productname,
        categoryid: this.categoryid.id, //ที่ต้อง.id เพราะมันส่งค่าเ็น obj ไป เราอยากได้แค่ id
        unitprice: this.unitprice,
        notation: this.notation,
        productstatus: this.productstatus,
        productimage: this.productimage
      });
      if (!res.data.ok) {
        console.log("เพิ่มข้อมูลสินค้าไม่สำเร็จ");
        <v-alert type="error">เพิ่มข้อมูลสินค้าไม่สำเร็จ</v-alert>;
      } else {
        console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
        <v-alert type="success">เพิ่มข้อมูลสินค้าสำเร็จ</v-alert>;
        window.alert("Insert Successful!");
      }
    },
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid }
      });

      this.show = res.data.products;
      console.log("test ", this.show);
    },
    // initialize () {
    //   this.desserts = [
    //     {
    //       name: 'Frozen Yogurt',
    //       calories: 159,
    //       fat: 6.0,
    //       carbs: 24,
    //       protein: 4.0,
    //     },
    //     {
    //       name: 'Ice cream sandwich',
    //       calories: 237,
    //       fat: 9.0,
    //       carbs: 37,
    //       protein: 4.3,
    //     },
    //     {
    //       name: 'Eclair',
    //       calories: 262,
    //       fat: 16.0,
    //       carbs: 23,
    //       protein: 6.0,
    //     },
    //     {
    //       name: 'Cupcake',
    //       calories: 305,
    //       fat: 3.7,
    //       carbs: 67,
    //       protein: 4.3,
    //     },
    //     {
    //       name: 'Gingerbread',
    //       calories: 356,
    //       fat: 16.0,
    //       carbs: 49,
    //       protein: 3.9,
    //     },
    //     {
    //       name: 'Jelly bean',
    //       calories: 375,
    //       fat: 0.0,
    //       carbs: 94,
    //       protein: 0.0,
    //     },
    //     {
    //       name: 'Lollipop',
    //       calories: 392,
    //       fat: 0.2,
    //       carbs: 98,
    //       protein: 0,
    //     },
    //     {
    //       name: 'Honeycomb',
    //       calories: 408,
    //       fat: 3.2,
    //       carbs: 87,
    //       protein: 6.5,
    //     },
    //     {
    //       name: 'Donut',
    //       calories: 452,
    //       fat: 25.0,
    //       carbs: 51,
    //       protein: 4.9,
    //     },
    //     {
    //       name: 'KitKat',
    //       calories: 518,
    //       fat: 26.0,
    //       carbs: 65,
    //       protein: 7,
    //     },
    //   ]
    // },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
