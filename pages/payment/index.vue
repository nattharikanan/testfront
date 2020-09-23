<template>
  <div class="payment" ref="content">
    <v-snackbar border="top" :color="coloralert" dark :value="regisstatus">
      {{
      alertMessage
      }}
    </v-snackbar>
    <v-snackbar :color="coloralert" dark v-model="regisstatus">
      {{
      alertMessage
      }}
    </v-snackbar>
    <v-flex xs12 class="text-center">
      <h2 :style="{ paddingTop: '15px', color: '#3498DB ' }">ข้อมูลการชำระเงิน</h2>
    </v-flex>

    <v-layout>
      <v-container>
        <v-layout row>
          <v-col :style="{ paddinTop: '15px' }" cols="4" class="text-right">หมายเลขคำสั่งซื้อ :</v-col>
          <v-col cols="6">
            <v-select
              v-model="orderid"
              item-text="orderid"
              :items="item"
              outlined
              label="กรุณาเลือกหมายเลขคำสั่งซื้อ"
              background-color="white"
            ></v-select>
          </v-col>
        </v-layout>
        <v-layout row>
          <v-col :style="{ paddinTop: '15px' }" cols="4" class="text-right">ชื่อผู้โอน :</v-col>
          <v-col cols="6">
            <v-text-field
              background-color="white"
              v-model="transferName"
              :rules="nameRules"
              outlined
              dense
              label="ชื่อผู้โอน"
              required
            ></v-text-field>
          </v-col>
        </v-layout>
      </v-container>
    </v-layout>

    <v-container>
      <v-layout :style="{ marginLeft: '30%' }">
        <u :style="{ color: '#3498DB ' }">
          <h5>ธนาคารที่โอนเข้า</h5>
        </u>
        <v-col class="text-center">
          <v-radio-group v-for="(item, idx) in bank" :key="idx" v-model="radios" :mandatory="false">
            <h6>ธนาคาร{{ item.bankName }} ชื่อบัญชี{{ item.owner }}</h6>

            <v-radio :label="item.bankAcc" :value="item.bankNum"></v-radio>
          </v-radio-group>
        </v-col>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout row>
        <v-col :style="{ paddinTop: '15px' }" cols="4" class="text-right">ยอดที่ต้องชำระ :</v-col>

        <v-col cols="6">
          <v-text-field
            dense
            background-color="white"
            outlined
            v-model="total"
            suffix="บาท"
            disabled
          ></v-text-field>
        </v-col>
      </v-layout>
      <v-layout row>
        <v-col :style="{ paddinTop: '15px' }" cols="4" class="text-right">วันที่โอน :</v-col>
        <v-col cols="6">
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
                background-color="white"
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
        </v-col>
      </v-layout>
      <v-layout row>
        <v-col :style="{ paddinTop: '15px' }" cols="4" class="text-right">เวลาที่โอน :</v-col>
        <v-col cols="6">
          <b-form-timepicker
            v-bind="labels['TH']"
            v-model="time"
            now-button
            reset-button
            locale="TH"
            label="เวลาที่โอน"
          ></b-form-timepicker>
        </v-col>
      </v-layout>
      <v-layout row>
        <v-col :style="{ paddinTop: '20' }" cols="4" class="text-right">รูปภาพหลักฐานการโอน :</v-col>
        <v-col cols="6">
          <v-file-input
            background-color="white"
            label="เลือกรูปภาพ"
            prepend-icon="mdi-camera"
            v-model="image"
            accept="image/*"
            @change="onFileUpload"
          ></v-file-input>
        </v-col>
      </v-layout>
    </v-container>

    <v-layout row>
      <v-flex xs12 class="text-center">
        <v-btn
          @click="onSubmit"
          color="green"
          width="250px"
          :style="{ color: 'white' }"
        >แจ้งการชำระเงิน</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: (vm) => ({
    total: "",
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
    item: [],
  }),
  create() {},
  async mounted() {
    if ($nuxt.$auth.loggedIn == false) {
      this.$router.push("/users/login");
    } else {
      let res = await this.$http.get("/bank_account/showbank");
      this.bank = res.data.bankAccount;
      let userid = this.$nuxt.$auth.user[0].userid;
      let resrorderid = await this.$http.post(
        `/orders/showordernumber?userid=${userid}`
      );
      this.item = resrorderid.data.orderid;
      this.orderid = this.$route.params.orderid;
    }
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
    orderid: {
      handler() {
        this.checkorderid();
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
      } else {
        this.priceint = check.data.total;
        this.formatPrice(this.priceint);
      }
    },
    onFileUpload(event) {
      this.FILE = event;
      console.log(" this.FILE", this.FILE);
    },
    async onSubmit() {
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
        this.image == ""
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
          (this.alertMessage = "ไม่สำเร็จ ");
      } else {
        console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
        this.regisstatus = true;
        (this.coloralert = "green lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "แจ้งชำระเงินของท่านสำเร็จ"),
          setTimeout(() => this.$router.push({ path: "/" }), 1000);
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
          setTimeout(() => this.$router.push({ path: "/" }), 1000);
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
      // let convert = Number(value.replace(/[^0-9.-]+/g, ""));
      let val = (value / 1).toFixed(2).replace(",", ".");
      let sum = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // let val = (value / 1).toFixed(2).replace(",", ".");
      // let sum = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      console.log("format", sum);
      return (this.total = sum);
    },
  },
};
</script>
<style>
/* @import url("../../uploadimage/ImgurUpload/css/style.css"); */
.payment {
  color: black;
  background-color: #d6eaf8;
}
.input:invalid ~ .currency-symbol {
  opacity: 0.5;
}
.text-center {
  padding-bottom: 50px;
}
</style>
