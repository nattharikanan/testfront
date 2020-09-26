<template>
  <div>
    <v-card full-height="900px">
      <div class="text-right" :style="{ color: 'blue' }">
        <v-btn class="back" @click="back()">ย้อนกลับ</v-btn>
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
      <!-- <div class="time">
        วันที่สั่งซื้อ : {{orderdate}}
        <br />
        เวลาที่สั่งซื้อ : {{ordertime}} นาที
      </div>-->

      <div class="text-center">
        <h5 :style="{ paddingTop: '20px' }">
          <b>ใบขอเสนอราคานิติบุคลเลขที่ {{ this.$route.params.quaid }}</b>
        </h5>
      </div>
      <v-layout row>
        <v-flex xs8 :style="{ paddingLeft: '30px' }">
          <v-container>
            <b>ชื่อผู้ขอ :</b>
            {{ this.sendvalue.qPersonalName }}{{ this.sendvalue.qPersonalLast }}
            <br />
            <b>ที่อยู่ในการจัดส่ง :</b>
            {{ this.sendvalue.qPersonalAddressDelivery }}
            <br />
            <b>ที่อยู่ออกใบกำกับภาษี :</b>
            {{ this.sendvalue.qPersonalAddress }}
            <br />
            <b>เบอร์โทร :</b>
            {{ this.sendvalue.qPersonalPhone }}
            <br />
            <b>อีเมล์ :</b>
            {{ this.sendvalue.qPersonalEmail }}
          </v-container>
        </v-flex>
        <v-flex xs4 :style="{ paddingLeft: '80px' }">
          <v-container>
            <b>หมายเลข :</b>
            {{ this.sendvalue.qPersonalId }}
            <br />
            <b>วันที่สั่งซื้อ :</b>
            {{ this.sendvalue.qPersonalDate }}
            <br />
            <b>เวลา :</b>
            {{ this.sendvalue.qPersonalTime }}
            <br />
            <b>หมายเลขผู้เสียภาษี :</b>
            {{ this.sendvalue.qPersonalIdcard }}
            <br />
            <b>หมายเลขผู้ใช้งาน :</b>
            {{ this.sendvalue.qPersonalUserid }}
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
            <td>{{ this.sendvalue.qPersonalProductid }}</td>
            <td>{{ this.sendvalue.qPersonalProductname }}</td>
            <!-- <td>
                <img :src="item.productimage" />
            </td>-->
            <td>
              <div v-if="this.sendvalue.qPersonalQuantity === 0">
                {{ this.sendvalue.qPersonalSquaremetre }}
              </div>
              <div v-else>
                {{ this.sendvalue.qPersonalQuantity }}
              </div>
            </td>
            <td>{{ this.sendvalue.qPeronalUnittype }}</td>
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
export default {
  props: ["quaid"],
  data() {
    return {
      sendvalue: {},
      cartdetail: [{ to: "/admin/insertp" }]
    };
  },

  async created() {
    let res = await this.$http.get("/q_show/personal/show", {
      params: { qPersonalId: this.$route.params.quaid }
    });
    console.log("see data Personal", res.data.personal[0]);
    this.sendvalue = res.data.personal[0];
  },
  methods: {
    back() {
      this.$router.push({
        name: "index"
      });
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
</style>
