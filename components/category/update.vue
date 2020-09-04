<template>
  <div>
    <!-- <v-alert
          border="top"
          :color="coloralert"
          dark
          :value="regisstatus"
        >
          {{ alertMessage }}
    </v-alert>-->
    <v-dialog v-model="show" max-width="500px" persistent>
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">+ เพิ่มสินค้า</v-btn>
      </template>-->
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            แก้ไขประเภทสินค้า
            <v-row>
              <v-col cols="12" sm="4" md="6">
                <v-text-field v-model="form.categoryname" required label="ชื่อประเภทสินค้า"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateCategory()">บันทึก</v-btn>
          <v-btn
            color="blue darken-1"
            rounded
            :style="{color:'white'}"
            @click="() => $emit('close')"
          >ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
    sendvalue: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      regisstatus: "",
      coloralert: "",
      dialog: false,
      form: {
        categoryid: "",
        categoryname: "",
      },
    };
  },
  watch: {
    show() {
      this.form = this.sendvalue;
    },
  },
  computed: {
    show() {
      return this.toggle;
    },
  },

  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/categories");
  },

  methods: {
    async updateCategory() {
      //update ประเภทสินค้า
      this.dialog = true;
      let res = await this.$http.post("/categories/update", {
        categoryid: this.form.categoryid,
        categoryname: this.form.categoryname,
      });
      if (!res.data.ok) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
        <v-alert type="error">เพิ่มข้อมูลสินค้าไม่สำเร็จ</v-alert>;
        window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
        <v-alert type="success">เพิ่มข้อมูลสินค้าสำเร็จ</v-alert>;
        window.alert("Insert Successful!");
        this.$emit("close");
      }
    },
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid },
      });
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>