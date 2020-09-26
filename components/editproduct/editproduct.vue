<template>
  <div>
    <v-snackbar
      :color="coloralert"
      v-model="alertstatus"
      :timeout="timeout"
      top=""
    >
      {{ alertMessage }}
    </v-snackbar>
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
            <u>
              <h5 :style="{ color: 'blue' }">แก้ไขข้อมูลสินค้า</h5>
            </u>
            <v-row>
              <v-col cols="12" sm="4" md="6">
                <v-text-field
                  :style="{ color: 'green' }"
                  v-model="form.productname"
                  required
                  label="ชื่อสินค้า"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="form.categoryid"
                  :items="categories"
                  item-text="name"
                  item-value="id"
                  label="ประเภทสินค้า"
                  persistent-hint
                  return-object
                  single-line
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="ราคาสินค้า"
                  v-model="form.unitprice"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <!-- <v-text-field label="สถานะสินค้า" v-model="productstatus"></v-text-field> -->
                <v-select
                  :items="status"
                  label="สถานะสินค้า"
                  v-model="form.productstatus"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  filled
                  label="หมายเหตุสินค้า"
                  v-model="form.notation"
                ></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="form.quotationstatus"
                  :items="q"
                  label="ขอเสนอราคา"
                  persistent-hint
                  return-object
                  single-line
                  required
                ></v-select>
              </v-col>-->
              <v-col cols="12" md="12">
                <v-item-group>
                  <u>
                    <h5 :style="{ color: 'blue' }">ขนาดของสินค้า</h5>
                  </u>
                  <v-row>
                    <v-col cols="4" md="6">
                      <v-text-field
                        type="number"
                        min="0"
                        label="ความกว้างสินค้า(ซม.)"
                        v-model="form.width"
                        oninput="validity.valid||(value='');"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" md="6">
                      <v-text-field
                        type="number"
                        min="0"
                        label="ความยาวสินค้า(ซม.)"
                        v-model="form.length"
                        oninput="validity.valid||(value='');"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        type="number"
                        min="0"
                        label="ความสูงสินค้า(ซม.)"
                        v-model="form.height"
                        oninput="validity.valid||(value='');"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        type="number"
                        min="0"
                        label="น้ำหนัก(กิโลกรัม.)"
                        v-model="form.weight"
                        oninput="validity.valid||(value='');"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="form.unit"
                        label="หน่วยของสินค้า"
                        :items="item"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-item-group>
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <u>
                  <h5 :style="{ color: 'blue' }">รูปภาพสินค้า</h5>
                </u>

                <v-file-input
                  label="เลือกรูปภาพ"
                  prepend-icon="mdi-camera"
                  v-model="image"
                  accept="image/*"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onFileUpload()"
            >บันทึก</v-btn
          >
          <v-btn
            color="blue darken-1"
            rounded
            :style="{ color: 'white' }"
            @click="() => $emit('close')"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    toggle: {
      type: Boolean,
      default: false
    },
    sendvalue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      regisstatus: "",
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      categories: [],
      FILE: null,
      imagelink: "",
      image: [],
      name: "",
      form: {
        productname: "",
        categoryid: "",
        unitprice: "",
        notation: "",
        productstatus: "",
        productimage: [],
        quotationstatus: "",
        length: 0,
        weigth: 0,
        height: 0,
        widtg: 0,
        unit: ""
      },
      q: ["ขอใบเสนอราคา", "ไม่มี"],
      status: ["พร้อมส่ง", "สินค้าหมดชั่วคราว", "สินค้ายกเลิกการจำหน่าย"],
      item: ["PC", "UT", "ST", "JOB"]
    };
  },
  watch: {
    show() {
      this.form = this.sendvalue;
    }
  },
  computed: {
    show() {
      return this.toggle;
    }
  },

  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/categories");
    // console.log(res.data);
    let temp = res.data.categories;
    this.categories = temp.map(c => ({
      name: c.categoryname,
      id: c.categoryid
    }));
    // this.getProduct();
  },

  methods: {
    onFileUpload() {
      // this.FILE = event;
      console.log(" this.FILE", this.image);
      if (this.image == null || this.image == undefined || this.image == "") {
        console.log("รูปภาพไม่เปลี่ยน");
        this.updateproductwithoutimage();
      } else {
        console.log("อัพโหลดรูปภาพใหม่", this.image);
        this.onSubmit();
      }
    },
    async onSubmit() {
      // upload file
      const formData = new FormData();
      formData.append("image", this.image, this.image.name);
      await axios
        .post("https://api.imgur.com/3/image", formData, {
          headers: {
            Authorization: "Client-ID e93753161349d59"
            // Authorization: "Bearer 24719a1e404ac3d8cf8e93672a278fcd35981a3c",
          }
        })
        .then(res => {
          this.imagelink = res.data.data.link;
        });
      console.log("res", this.imagelink);
      this.updateproductwithimage();
    },
    async updateproductwithimage() {
      //update สินค้า
      this.dialog = true;

      let res = await this.$http.post("/product/update", {
        productid: this.form.productid,
        productname: this.form.productname,
        categoryid: this.form.categoryid.id, //ที่ต้อง.id เพราะมันส่งค่าเ็น obj ไป เราอยากได้แค่ id
        unitprice: this.form.unitprice,
        notation: this.form.notation,
        productstatus: this.form.productstatus,
        productimage: this.imagelink,
        // quotationStatus: this.form.quotationstatus,
        height: this.form.height,
        weight: this.form.weight,
        length: this.form.length,
        width: this.form.width,
        unit: this.form.unit
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "การแก้ไขข้อมูลถูกต้อง");

        this.$emit("close");
      }
    },
    async updateproductwithoutimage() {
      //update สินค้า
      this.dialog = true;

      let res = await this.$http.post("/product/update", {
        productid: this.form.productid,
        productname: this.form.productname,
        categoryid: this.form.categoryid.id, //ที่ต้อง.id เพราะมันส่งค่าเ็น obj ไป เราอยากได้แค่ id
        unitprice: this.form.unitprice,
        notation: this.form.notation,
        productstatus: this.form.productstatus,
        // quotationStatus: this.form.quotationstatus,
        height: this.form.height,
        weight: this.form.weight,
        length: this.form.length,
        width: this.form.width,
        unit: this.form.unit
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "การแก้ไขข้อมูลถูกต้อง");
        this.$emit("close");
      }
    },
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid }
      });
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style></style>
