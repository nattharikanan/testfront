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
    <v-btn @click="dialog = true" color="primary" dark class="mb-2"
      >+ เพิ่มสินค้า</v-btn
    >
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <u>
              <h5 :style="{ color: 'blue' }">เพิ่มข้อมูลสินค้า</h5>
            </u>
            <v-row>
              <v-col cols="12" sm="4" md="6">
                <v-text-field
                  v-model="productname"
                  required
                  label="ชื่อสินค้า*"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="categoryid"
                  :items="categories"
                  item-text="name"
                  item-value="id"
                  label="ประเภทสินค้า*"
                  persistent-hint
                  return-object
                  single-line
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="quotationstatus"
                  :items="q"
                  label="ให้ขอเสนอราคาหรือไม่*"
                  persistent-hint
                  return-object
                  single-line
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <!-- <v-text-field label="สถานะสินค้า" v-model="productstatus"></v-text-field> -->
                <v-select
                  :items="status"
                  label="สถานะสินค้า*"
                  v-model="productstatus"
                ></v-select>
              </v-col>
              <div v-show="this.quotationstatus == 'ไม่มี'">
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="ราคาสินค้า"
                    v-model="unitprice"
                    type="number"
                    suffix="บาท"
                  ></v-text-field>
                </v-col>
              </div>

              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  filled
                  label="หมายเหตุสินค้า"
                  v-model="notation"
                ></v-textarea>
              </v-col>

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
                        v-model="width"
                        oninput="validity.valid||(value='');"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" md="6">
                      <v-text-field
                        type="number"
                        min="0"
                        label="ความยาวสินค้า(ซม.)"
                        v-model="length"
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
                        v-model="height"
                        oninput="validity.valid||(value='');"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        type="number"
                        min="0"
                        label="น้ำหนัก(กิโลกรัม.)"
                        v-model="weight"
                        oninput="validity.valid||(value='');"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="unit"
                        :items="item"
                        label="หน่วยของสินค้า*"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-item-group>
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <!-- <v-text-field label="ลิงก์รุปภาพสินค้า" v-model="productimage"></v-text-field> -->
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
            @click="close"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Label",
    },
  },
  data() {
    return {
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      categories: [],
      weight: 0,
      length: 0,
      height: 0,
      width: 0,
      unit: "",
      productname: "",
      categoryid: "",
      unitprice: "",
      notation: "",
      quotationstatus: "",
      productstatus: "",
      productimage: "",
      status: ["พร้อมส่ง", "สินค้าหมดชั่วคราว", "สินค้ายกเลิกการจำหน่าย"],
      image: [],
      imagelink: "",
      q: ["ขอใบเสนอราคา", "ไม่มี"],
      noimage:
        "https://www.img.in.th/images/13d03dc7c98b2cc7c207a41775ec44dd.jpg",
      item: ["PC", "UT", "ST", "JOB"],
    };
  },
  watch: {
    categoryid: {
      handler() {
        console.log("cateID", this.categoryid);
      },
    },
    quotationstatus: {
      handler() {
        if (this.quotationstatus == "ขอใบเสนอราคา") {
          this.unitprice = 0;
        }
      },
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
  mounted() {},
  methods: {
    onFileUpload() {
      // this.FILE = event;
      console.log("FILE", this.image);
      if (this.image == null || this.image == undefined || this.image == "") {
        console.log("รูปภาพไม่เปลี่ยน");
        this.savewithoutimage();
      } else {
        console.log("อัพโหลดรูปภาพใหม่", this.image);
        this.onSubmit();
      }
    },
    async onSubmit() {
      // upload file
      const formData = new FormData();
      formData.append("image", this.image, this.image.name);
      await this.$http
        .post("https://api.imgur.com/3/image", formData, {
          headers: {
            Authorization: "Client-ID e93753161349d59",
            Authorization: "Bearer 24719a1e404ac3d8cf8e93672a278fcd35981a3c",
          },
        })
        .then((res) => {
          this.imagelink = res.data.data.link;
        });
      console.log("res", this.imagelink);
      this.savewithimage();
    },
    async savewithimage() {
      this.dialog = true;
      if (
        this.quotationstatus == "" ||
        this.quotationstatus == null ||
        this.categoryid.id == "" ||
        this.productname == "" ||
        this.productstatus == "" ||
        this.unit == ""
      ) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        let res = await this.$http.post("/product/insert", {
          productid: this.$route.query.productid,
          productname: this.productname,
          categoryid: this.categoryid.id, //ที่ต้อง.id เพราะมันส่งค่าเ็น obj ไป เราอยากได้แค่ id
          unitprice: this.unitprice,
          notation: this.notation,
          productstatus: this.productstatus,
          productimage: this.imagelink,
          quotationStatus: this.quotationstatus,
          height: this.height,
          weight: this.weight,
          length: this.length,
          width: this.width,
          unit: this.unit,
        });
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
      }
    },
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid },
      });
      this.show = res.data.products;
      //   console.log("test ", this.show);
    },
    close() {
      this.dialog = false;
    },
    async savewithoutimage() {
      this.dialog = true;
      console.log(this.categoryid.id);
      if (
        this.quotationstatus == "" ||
        this.quotationstatus == null ||
        this.categoryid.id == "" ||
        this.productname == "" ||
        this.productstatus == "" ||
        this.unit == ""
      ) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        let res = await this.$http.post("/product/insert", {
          productid: this.$route.query.productid,
          productname: this.productname,
          categoryid: this.categoryid.id, //ที่ต้อง.id เพราะมันส่งค่าเ็น obj ไป เราอยากได้แค่ id
          unitprice: this.unitprice,
          notation: this.notation,
          productstatus: this.productstatus,
          productimage: this.noimage,
          quotationStatus: this.quotationstatus,
          height: this.height,
          weight: this.weight,
          length: this.length,
          width: this.width,
          unit: this.unit,
        });
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
      }
    },
  },
};
</script>

<style></style>
