<template>
  <div>
    <v-container class="content">
      <v-btn @click="refreshpage()">ย้อนกลับ</v-btn>
      <v-card full-height="900px">
        <div class="text-right" :style="{ color: 'blue' }">
          <v-btn @click="savetopdf()">
            <v-icon>mdi-printer-check</v-icon>พิมพ์ใบเสนอราคาซื้อที่นี่
          </v-btn>
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

        <div class="text-center">
          <h5 :style="{ paddingTop: '20px' }">
            <b>ใบขอเสนอราคา</b>
          </h5>
        </div>
        <v-layout row>
          <v-flex xs8 :style="{ paddingLeft: '30px' }">
            <v-container>
              <b>ชื่อผู้ขอ :</b>
              {{ this.sendvalue.qCompanyName }}{{ this.sendvalue.qCompanyLast }}
              <br />
              <b>ที่อยู่ในการจัดส่ง :</b>
              {{ this.sendvalue.qCompanyAddressDelivery }}
              <br />
              <b>เบอร์โทร :</b>
              {{ this.sendvalue.qCompanyPhone }}
              <br />
              <b>อีเมล์ :</b>
              {{ this.sendvalue.qCompanyEmail }}
            </v-container>
          </v-flex>
          <v-flex xs4 :style="{ paddingLeft: '80px' }">
            <v-container>
              <b>หมายเลข :</b>
              {{ this.sendvalue.qCompanyId }}
              <br />
              <b>วันที่สั่งซื้อ :</b>
              {{this.sendvalue.qCompanyDate}}
              <br />
              <b>เวลา :</b>
              {{ this.sendvalue.qCompanyTime }}
              <br />
              <b>หมายเลขผู้ใช้งาน :</b>
              {{ this.sendvalue.qCompanyUserid }}
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
          <table :style="{ width: '100%', height: '50%'}">
            <tr>
              <th :style="{background:'cyan' }">สินค้า</th>
              <!-- <th>รูปสินค้า</th> -->
              <th :style="{background:'cyan' }">จำนวน</th>
            </tr>
            <tr>
              <td>{{ this.sendvalue.qCompanyProductname }}</td>
              <!-- <td>
                <img :src="item.productimage" />
              </td>-->
              <td>{{ this.sendvalue.qCompanyProductid }}</td>
            </tr>
          </table>
        </v-flex>
        <v-layout row>
          <v-flex xs6 :style="{ paddingLeft: '70px', paddingTop: '20px' }">
            <b>หมายเหตุเพิ่มเติมจากผู้ขอ :</b>
            <br />
            <ul>
              <!-- <li>{{this.sendvalue.qCompanyInfo}}</li> -->

              <li></li>
            </ul>
          </v-flex>
          <v-flex></v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      cartdetail: [{ to: "/admin/insertp" }],
    };
  },
  props: {
    sendvalue: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    show() {
      this.form = this.sendvalue;
    },
  },
  methods: {
    refreshpage() {
      window.location.href =
        window.location.pathname +
        window.location.search +
        window.location.hash;
    },
  },
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