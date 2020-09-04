<template>
  <div class="payment" ref="content">
    <v-snackbar border="top" :color="coloralert" dark :value="regisstatus">{{ alertMessage }}</v-snackbar>
    <v-container class="text-center">
      <v-flex xs12>
        <h2>ข้อมูลการชำระเงิน</h2>
      </v-flex>
    </v-container>
    <v-snackbar :color="coloralert" dark v-model="regisstatus">{{ alertMessage }}</v-snackbar>

    <v-layout>
      <v-flex xs4></v-flex>
      <v-flex xs4>
        <v-row>
          <v-text-field
            v-model="orderid"
            @change="checkorderid()"
            outlined
            dense
            label="หมายเลขคำสั่งซื้อ"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            v-model="transferName"
            :rules="nameRules"
            outlined
            dense
            label="ชื่อผู้โอน"
            required
          ></v-text-field>
        </v-row>
      </v-flex>
      <v-flex xs4></v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs4></v-flex>
      <v-flex xs4>
        ธนาคารที่โอนเข้า
        <v-col>
          <v-radio-group v-for="(item, idx) in bank" :key="idx" v-model="radios" :mandatory="false">
            <h6>ธนาคาร{{ item.bankName }} ชื่อบัญชี{{ item.owner }}</h6>

            <v-radio :label="item.bankAcc" :value="item.bankNum"></v-radio>
          </v-radio-group>
        </v-col>

        <v-row>
          <v-text-field
            class="input"
            outlined
            dense
            required
            label="จำนวนเงินที่โอน (บาท)"
            v-model="price"
            @blur="formatPrice(price)"
          />
        </v-row>
        <v-row>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                dense
                outlined
                v-model="date"
                label="วันที่โอน"
                persistent-hint
                prepend-inner-icon="mdi-calendar-clock"
                v-bind="attrs"
                v-on="on"
                required
              ></v-text-field>
            </template>
            <v-date-picker locale="th" v-model="date" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-row>
        <v-row>
          <b-form-timepicker
            v-bind="labels['TH']"
            v-model="time"
            now-button
            reset-button
            locale="TH"
            label="เวลาที่โอน"
          ></b-form-timepicker>
        </v-row>
        <v-row :style="{paddingTop:'10px'}">
          <v-file-input
            label="เลือกรูปภาพ"
            prepend-icon="mdi-camera"
            v-model="image"
            accept="image/*"
            @change="onFileUpload"
          ></v-file-input>
        </v-row>
        <v-row :style="{paddingLeft:'150px'}"></v-row>
      </v-flex>
      <v-flex xs4></v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 class="text-center">
        <v-btn
          @click="onSubmit"
          color="green"
          width="250px"
          :style="{color:'white'}"
        >แจ้งการชำระเงิน</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: (vm) => ({
    value: "",
    formatted: "",
    selected: "",
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    radios: "",
    time: "",
    labels: {
      TH: {
        labelHours: "ชั่วโมง",
        labelMinutes: "นาที",
        labelSeconds: "วินาที",
        labelIncrement: "เพิ่ม",
        labelDecrement: "ลด",
        labelSelected: "เลือก",
        labelResetButton: "ลบ",
        labelNowButton: "เวลาตอนนี้",
        labelNoTimeSelected: "กรุณาเลือกเวลาที่โอน",
        labelCloseButton: "ปิด",
      },
    },
    nameRules: [
      (v) => !!v || "กรุณากรอกข้อมูลให้กรบถ้วน",
      (v) => (v && v.length <= 200) || "Name must be less than 200 characters",
    ],
    regisstatus: false,
    alertMessage: "",
    coloralert: "",
    base: "",
    image: [],
    bank: [],
    isInputActive: false,
    price: "",
    FILE: null,
    imagelink: "",
    orderid: "",
    transferName: "",
    sumprice: "",
    dialog: false,
    priceint: 0,
    y: "top",
    noimage:
      "https://www.img.in.th/images/13d03dc7c98b2cc7c207a41775ec44dd.jpg",
  }),
  create() {},
  async mounted() {
    let res = await this.$http.get("/bank_account/showbank");
    this.bank = res.data.bankAccount;
    // let respayment = await this.$http.post("/payments/");
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      console.log("pick", this.dateFormatted);
    },
    radios: {
      handler() {
        console.log("radio", this.radios);
      },
    },
  },
  methods: {
    async checkorderid() {
      let check = await this.$http.post(
        `/orders/check?orderid=${this.orderid}`
      );
      console.log("checkpayment", check.data.ok);
      if (check.data.ok == false) {
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "ไม่พบหมายเลขคำสั่งซื้อ กรุณาตรวจสอบอีกครั้ง");
      }
    },
    onFileUpload(event) {
      this.FILE = event;
      console.log(" this.FILE", this.FILE);
    },
    async onSubmit() {
      //show imformations
      this.priceint = Number(this.price.replace(/[^0-9.-]+/g, ""));
      console.log("orderid", this.orderid);
      console.log("transferName", this.transferName);
      console.log("Bank", this.radios);
      console.log("ยอด", this.priceint);
      console.log("dateFormatted", this.date);
      console.log("time", this.time);
      console.log("รูป", this.image.length);
      //เช็คค่าว่าง
      let check = await this.$http.post(
        `/orders/check?orderid=${this.orderid}`
      );
      console.log("checkpayment", check.data.ok);
      if (check.data.ok == false) {
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "ไม่พบหมายเลขคำสั่งซื้อ กรุณาตรวจสอบอีกครั้ง");
      } else if (
        this.orderid == "" ||
        this.transferName == "" ||
        this.radios == "" ||
        this.price == ""
      ) {
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        // upload file
        if (this.image.length == 0) {
          this.insertpaymentwithoutimage();
        } else {
          const formData = new FormData();
          formData.append("image", this.FILE, this.FILE.name);
          await axios
            .post("https://api.imgur.com/3/image", formData, {
              headers: {
                Authorization: "Client-ID e93753161349d59",
                // Authorization: "Bearer 24719a1e404ac3d8cf8e93672a278fcd35981a3c",
              },
            })
            .then((res) => {
              this.imagelink = res.data.data.link;
            });

          this.insertpayment();
        }
      }
    },
    async insertpayment() {
      let respayment = await this.$http.post("/payments/", {
        orderid: this.orderid,
        transferName: this.transferName,
        banknum: this.radios,
        totalprice: this.priceint,
        paymentDate: this.dateFormatted,
        paymentTime: this.time,
        paymentImage: this.imagelink,
      });
      if (!respayment.data.ok) {
        console.log("เพิ่มข้อมูลสินค้าไม่สำเร็จ");
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "ไม่สำเร็จ "),
          window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
        this.regisstatus = true;
        (this.coloralert = "green lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "แจ้งชำระเงินของท่านสำเร็จ"),
          window.alert("Insert Successful!");
        this.close();
      }
    },
    async insertpaymentwithoutimage() {
      let respayment = await this.$http.post("/payments/", {
        orderid: this.orderid,
        transferName: this.transferName,
        banknum: this.radios,
        totalprice: this.priceint,
        paymentDate: this.dateFormatted,
        paymentTime: this.time,
        paymentImage: this.noimage,
      });
      if (!respayment.data.ok) {
        console.log("เพิ่มข้อมูลสินค้าไม่สำเร็จ");
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "ไม่สำเร็จ"),
          window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
        this.regisstatus = true;
        (this.coloralert = "green lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "แจ้งชำระเงินของท่านสำเร็จ"),
          this.close();
      }
    },
    close() {
      this.dialog = false;
    },
    formatDate(date) {
      if (!date) return null;
      console.log("formaT", date.toLocaleString());
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    formatPrice(value) {
      let convert = Number(value.replace(/[^0-9.-]+/g, ""));
      let val = (convert / 1).toFixed(2).replace(",", ".");
      let sum = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // let val = (value / 1).toFixed(2).replace(",", ".");
      // let sum = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return (this.price = sum);
    },
  },
};
</script>
<style>
/* @import url("../../uploadimage/ImgurUpload/css/style.css"); */
.payment {
  color: black;
}
.input:invalid ~ .currency-symbol {
  opacity: 0.5;
}
.text-center {
  padding-bottom: 50px;
}
</style>
