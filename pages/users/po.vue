<template>
  <v-container class="content">
    <loading :toggle="loadingme" />
    <v-card full-height="900px">
      <div class="text-right" :style="{ color: 'blue',paddingBottom: '5px' }">
        <v-btn @click="savetopdf()"
          ><v-icon>mdi-printer-check</v-icon>พิมพ์ใบสั่งซื้อที่นี่</v-btn
        >
      </div>

      <v-layout row>
        <v-flex xs2>
          <v-container>
            <v-img
              src="https://www.img.in.th/images/f82231453d35773023b85c11dc4e0658.jpg"
            />
          </v-container>
        </v-flex>
        <v-flex xs8>
          <div class="text-center">
            <h4 :style="{ paddingTop: '20px' }">
              <b>บริษัท ผลิตภัณฑ์และวัตถุก่อสร้าง จำกัด</b>
            </h4>

            <div>
              1516 ถ.ประชาราษฎร์ 1 แขวงวงศ์สว่าง เขตบางซื่อ กรุงเทพฯ 10800
              <br />โทร.02-555-5000 CPAC CALL CENTER 02-555-5555 Email:
              cpacinside@scg.com
            </div>
          </div>
        </v-flex>
        <v-flex xs2>
          <v-container>
            <v-img
              src="https://www.img.in.th/images/3106c042189c657d833bbf68a9783e6c.jpg"
            />
          </v-container>
        </v-flex>
      </v-layout>


      <div class="text-center">
        <h5 :style="{ paddingTop: '20px' }">
          <b>ใบยืนยันการสั่งซื้อสินค้า</b>
        </h5>
      </div>
      <v-layout row>
        <v-flex xs8 :style="{ paddingLeft: '30px' }">
          <v-container>
            <b>เรียนคุณ : </b> {{ fname }}{{ lname }}
            <br />
            <b>ที่อยู่ในการจัดสั่ง : </b>{{ orderaddress }}
            <br />
            <b>เบอร์โทร :</b>{{ phone }}
          </v-container>
        </v-flex>
        <v-flex xs4 :style="{ paddingLeft: '80px' }">
          <v-container>
            <b>หมายเลขคำสั่งซื้อ : </b> {{ this.$route.params.orderq }}
            <br />
            <b>วันที่สั่งซื้อ :</b> {{ orderdate }}
            <br />
            <b>เวลา : </b> {{ ordertime }}
          </v-container>
        </v-flex>
      </v-layout>

      <v-flex
        xs12
        :style="{
          paddingLeft: '70px',
          paddingRight: '70px',
          paddingTop: '20px',
          color: 'black'
        }"
        class="text-center"
      >
        <table :style="{ width: '100%', height: '50%' }">
          <tr class="head">
            <th>สินค้า</th>
            <!-- <th>รูปสินค้า</th> -->
            <th>จำนวน</th>
            <th>ราคาต่อชิ้น</th>
            <th>ราคารวม</th>
          </tr>
          <tr v-for="(item, idx) in product" :key="idx">
            <td>{{ item.productname }}</td>
            <!-- <td>
                <img :src="item.productimage" />
            </td>-->
            <td>{{ item.quantity }}</td>
            <td>{{ item.unitprice }}</td>
            <td>฿{{ formatPrice(item.quantity * item.unitprice) }}</td>
          </tr>
          <tr class="head">
            <th>vat (7%)</th>
            <th colspan="4">{{ formatPrice(vat7) }} บาท</th>
          </tr>
          <tr class="head">
            <th>ยอดที่ต้องชำระ</th>
            <th colspan="4">{{ formatPrice(netprice) }} บาท</th>
          </tr>
        </table>
      </v-flex>
      <v-layout row>
        <v-flex xs6 :style="{ paddingLeft: '70px', paddingTop: '20px' }">
          <b>หมายเหตุ</b><br />
          <ul>
            <li>
              ท่านสามารถชำระเงินค่าสินค้าได้ที่เมนู "แจ้งการชำระเงิน"
              แถบด้านบนของเว็บไซต์
            </li>

            <li>
              ตรวจสอบสถานะและหมายเลขคำสั่งซื้อได้ที่ข้อมูลส่วนตัว เมนู
              "การซื้อของฉัน"
            </li>
          </ul>
        </v-flex>
        <v-flex> </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import loading from "@/components/loading/loading";

export default {
  components: {
    loading
  },
  middleware: "auth",
  name: "users-po",
  props: ["orderq"],
  data() {
    return {
      loadingme: false,
      orderdate: "",
      ordertime: "",
      fname: "",
      lname: "",
      orderaddress: "",
      phone: "",
      product: [],
      totalPrice: "",
      vat7: "",
      netprice: ""
    };
  },

  async created() {
    this.loadingme = true;
    let res = await this.$http.get(
      `/orders?orderid=${this.$route.params.orderq}`,
      {}
    );
    this.orderdate = res.data.carts[0].orderdate;
    this.ordertime = res.data.carts[0].ordertime;
    this.fname = res.data.carts[0].firstname;
    this.lname = res.data.carts[0].lastname;
    this.orderaddress = res.data.carts[0].orderAddress;
    this.phone = res.data.carts[0].phone;
    this.t = res.data.carts[0].totalPrice;

    console.log("testtttt", res.data.carts[0].firstname);
    this.getproduct();
  },

  methods: {
    async getproduct() {
      let res = await this.$http.get(
        `orders/detail?orderid=${this.$route.params.orderq}`,
        {}
      );
      this.product = res.data.carts;
      this.cartTotalPrice();
      if (res.data.ok) {
        this.loadingme = false;
      }
      console.log("testtttt", res.data);
    },

    cartTotalPrice() {
      this.totalPrice = 0;
      for (const p of this.product) {
        this.totalPrice += p.quantity * p.unitprice;
      }
      this.vat7 = this.totalPrice * (7 / 100);
      this.netprice = this.vat7 + this.totalPrice;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    savetopdf() {
      var tempTitle = document.title;
      document.title = "ใบยืนยันการสั่งสินค้า.pdf";
      window.print();
      document.title = tempTitle;
    }
  }
};
</script>

<style>
@media print {
  .text-right {
    visibility: hidden;
  }
  #section-to-print,
  #section-to-print * {
    visibility: visible;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.time {
  float: right;
  padding: 15px;
}
.head {
  padding-left: 40%;
}
</style>
