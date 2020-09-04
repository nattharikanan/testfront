<template>
  <v-container>
    <v-card>
      <div class="text-right" :style="{ color: 'blue' }">
        <v-btn @click="savetopdf()"
          ><v-icon>mdi-printer-check</v-icon>พิมพ์ใบสั่งซื้อที่นี่</v-btn
        >
      </div>
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
      <!-- <div class="time">
        วันที่สั่งซื้อ : {{orderdate}}
        <br />
        เวลาที่สั่งซื้อ : {{ordertime}} นาที
      </div>-->

      <div class="text-center">
        <h5 :style="{ paddingTop: '20px' }">
          <b>รายละเอียดคำสั่งซื้อหมายเลข {{ this.$route.params.orderq }}</b>
        </h5>
      </div>
      <v-layout row>
        <v-flex xs8 :style="{ paddingLeft: '30px' }">
          <v-container>
            เรียนคุณ {{ fname }}{{ lname }}
            <br />
            ที่อยู่ในการจัดสั่ง :{{ address }}
            <br />
            เบอร์โทร :{{ phone }}
          </v-container>
        </v-flex>
        <v-flex xs4 :style="{ paddingLeft: '80px' }">
          <v-container>
            วันที่ {{ orderdate }}
            <br />
            เวลา {{ ordertime }}
            <br />
            ช่องทางการจัดส่ง : {{ shipMethod }}
          </v-container>
        </v-flex>
      </v-layout>

      <v-flex
        xs12
        :style="{
          paddingLeft: '70px',
          paddingRight: '70px',
          paddingTop: '20px',
          paddingBottom: '30px',
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
      <div :style="{ padding: '10px', float: 'left' }" class="back">
        <v-btn
          rounded
          color="green"
          :to="{
            name: 'admin-insertp',
            params: {
              m: 2
            }
          }"
        >
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <v-flex xs4></v-flex>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "admin-showorder-detail",
  props: ["orderq"],
  data() {
    return {
      orderdate: "",
      ordertime: "",
      fname: "",
      lname: "",
      shipMethod: "",
      address: "",
      phone: "",
      product: [],
      totalPrice: "",
      vat7: "",
      netprice: "",
      back: [{ to: "insertp" }]
    };
  },

  async created() {
    let res = await this.$http.get(
      `orders/detail?orderid=${this.$route.params.orderq}`,
      {}
    );
    this.orderdate = res.data.carts[0].orderdate;
    this.ordertime = res.data.carts[0].ordertime;
    this.fname = res.data.carts[0].firstname;
    this.lname = res.data.carts[0].lastname;
    this.address = res.data.carts[0].orderAddress;
    this.phone = res.data.carts[0].phone;
    this.shipMethod = res.data.carts[0].shmName;
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
      console.log("testtttt", res.data.carts.address);
    },
    savetopdf() {
      var tempTitle = document.title;
      document.title = "ใบยืนยันการสั่งสินค้า.pdf";
      window.print();
      document.title = tempTitle;
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
    }
  }
};
</script>

<style>
@media print {
  .text-right {
    visibility: hidden;
  }
  .back {
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
  background-color: lightskyblue;
}
</style>
