<template>
  <div>
    <loading :toggle="loadingme" /> /
    <v-card full-height="900px">
      <div class="text-right" :style="{ color: 'blue', paddingBottom: '5px' }">
        <v-btn class="back" @click="back()">ย้อนกลับ</v-btn>
        <v-btn @click="savetopdf()">
          <v-icon>mdi-printer-check</v-icon>พิมพ์ใบเสนอราคาซื้อที่นี่
        </v-btn>
      </div>

      <v-layout row>
        <v-flex xs2 class="setright">
          <v-img
            src="https://www.img.in.th/images/f82231453d35773023b85c11dc4e0658.jpg"
          />
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
        <v-flex xs2 class="setleft">
          <v-img
            src="https://www.img.in.th/images/3106c042189c657d833bbf68a9783e6c.jpg"
          />
        </v-flex>
      </v-layout>
      <!-- <div class="time">
        วันที่สั่งซื้อ : {{orderdate}}
        <br />
        เวลาที่สั่งซื้อ : {{ordertime}} นาที
      </div>-->

      <div class="text-center">
        <h5 :style="{ paddingTop: '20px' }">
          <b>ใบขอเสนอราคาบริษัทเลขที่ {{ this.$route.params.quaid }}</b>
        </h5>
      </div>
      <v-layout row>
        <v-flex xs8 :style="{ paddingLeft: '30px' }">
          <v-container>
            <b>ชื่อบริษัท:</b>
            {{ this.sendvalue.qCompanyCompanyname }}
            <br />
            <b>หมายเลขสาขา:</b>
            {{ this.sendvalue.qCompanyCompanyid }}
            <br />
            <b>ชื่อผู้ขอ :</b>
            {{ this.sendvalue.qCompanyName }}{{ this.sendvalue.qCompanyLast }}
            <br />
            <b>ที่อยู่ในการจัดส่ง :</b>
            {{ this.sendvalue.qCompanyAddressDelivery }}
            <br />
            <b>ที่อยู่ออกใบกำกับภาษี :</b>
            {{ this.sendvalue.qCompanyAddress }}
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
            <b>หมายประจำตัวผู้เสียภาษีอากร:</b>
            {{ this.sendvalue.qCompanyTax }}
            <br />
            <b>วันที่สั่งซื้อ :</b>
            {{ this.sendvalue.qCompanyDate }}
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
        <table border :style="{ width: '100%', height: '50%' }">
          <tr>
            <th :style="{ background: 'cyan' }">หมายเลขสินค้า</th>
            <th :style="{ background: 'cyan' }">สินค้า</th>
            <!-- <th>รูปสินค้า</th> -->
            <th :style="{ background: 'cyan' }">จำนวน</th>
            <th :style="{ background: 'cyan' }">หน่วย</th>
          </tr>
          <tr>
            <td>{{ this.sendvalue.qCompanyProductid }}</td>
            <td>{{ this.sendvalue.qCompanyProductname }}</td>
            <!-- <td>
                <img :src="item.productimage" />
            </td>-->
            <td>
              <div v-if="this.sendvalue.qCompanyQuantity === 0  ||this.sendvalue.qCompanyQuantity === null ||this.sendvalue.qCompanyQuantity ==='' ">
                {{ this.sendvalue.qCompanySquaremetre }}
              </div>
              <div v-else>
                {{ this.sendvalue.qCompanyQuantity }}
              </div>
            </td>
            <td>{{ this.sendvalue.qCompanyUnittype }}</td>
          </tr>
        </table>
      </v-flex>
      <v-layout row>
        <v-flex xs6 :style="{ paddingLeft: '70px', paddingTop: '20px' }">
          <b>ท่านสามารถดูใบเสนอราคาของท่านได้ที่เมนู "ใบขอเสนอราคา"</b>
          <br />
          <br />
          <ul></ul>
        </v-flex>
        <v-flex></v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import loading from "@/components/loading/loading";
export default {
  components: {
    loading
  },
  props: ["quaid"],
  data() {
    return {
      loadingme: false,
      sendvalue: {},
      cartdetail: [{ to: "/admin/insertp" }]
    };
  },

  async created() {
    this.loadingme = true;
    let res = await this.$http.get("/q_show/company/show", {
      params: { qCompanyId: this.$route.params.quaid }
    });
    console.log("see data Company", this.$route.params.quaid);
    this.sendvalue = res.data.company[0];
    if (res.data.ok) {
      this.loadingme = false;
    }
  },
  methods: {
    back() {
      if ($nuxt.$auth.user[0].status == "user") {
        this.$router.push({
          name: "users-profile",
          params: {
            m: 2
          }
        });
      } else {
        this.$router.push({
          name: "admin-insertp"
        });
      }
    },
    refreshpage() {
      window.location.href =
        window.location.pathname +
        window.location.search +
        window.location.hash;
    },
    savetopdf() {
      var tempTitle = document.title;
      document.title = "ใบเสนอราคา.pdf";
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
}
.setleft {
  justify-content: left;
}
.setright {
  justify-content: right;
}
</style>
