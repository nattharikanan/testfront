<template>
  <div>
    <loading :toggle="loadingme" />
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
          <b>ใบขอเสนอราคาเลขที่ {{ this.$route.params.quaid }}</b>
        </h5>
      </div>
      <v-layout row>
        <v-flex xs8 :style="{ paddingLeft: '30px' }">
          <v-container>
            <b>ชื่อผู้ขอ :</b>
            {{ this.sendvalue.qNormalName }} <b>นามสกุล</b>
            {{ this.sendvalue.qNormalLast }}
            <br />
            <b>ที่อยู่ในการจัดส่ง :</b>
            {{ this.sendvalue.qNormalAddressDelivery }}
            <br />
            <b>เบอร์โทร :</b>
            {{ this.sendvalue.qNormalPhone }}
            <br />
            <b>อีเมล์ :</b>
            {{ this.sendvalue.qNormalEmail }}
          </v-container>
        </v-flex>
        <v-flex xs4 :style="{ paddingLeft: '80px' }">
          <v-container>
            <b>หมายเลข :</b>
            {{ this.sendvalue.qNormalId }}
            <br />
            <b>วันที่สั่งซื้อ :</b>
            {{ this.sendvalue.qNormalDate }}
            <br />
            <b>เวลา :</b>
            {{ this.sendvalue.qNormalTime }}
            <br />
            <b>หมายเลขผู้ใช้งาน :</b>
            {{ this.sendvalue.qNormalUserid }}
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
            <td>{{ this.sendvalue.qNormalProductid }}</td>
            <td>{{ this.sendvalue.qNormalProductname }}</td>
            <!-- <td>
                <img :src="item.productimage" />
            </td>-->
            <td>
              <div v-if="this.sendvalue.qNormalQuantity === 0">
                {{ this.sendvalue.qNormalSquaremetre }}
              </div>
              <div v-else>
                {{ this.sendvalue.qNormalQuantity }}
              </div>
            </td>
            <td>{{ this.sendvalue.qNormalUnittype }}</td>
          </tr>
        </table>
      </v-flex>
      <v-layout row>
        <v-flex xs6 :style="{ paddingLeft: '70px', paddingTop: '20px' }">
          <b>ท่านสามารถดูใบเสนอราคาของท่านได้ที่เมนู "ใบขอเสนอราคา"</b>
          <br />
          <b>หมายเหตุเพิ่มเติมจากผู้ขอ :</b>
          <br />
          <ul>
            <li>
              <div
                v-if="
                  this.sendvalue.qNormalInfo == '' ||
                    this.sendvalue.qNormalInfo == null
                "
              >
                ไม่มี
              </div>
              <div v-else>{{ this.sendvalue.qNormalInfo }}</div>
            </li>
          </ul>
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
    let res = await this.$http.get("/q_show/normal/show", {
      params: { qNormalId: this.$route.params.quaid }
    });
    this.sendvalue = res.data.normal[0];
    if (res.data.ok) {
      this.loadingme = false;
    }
    console.log("see", this.sendvalue.qNormalInfo);
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
    // refreshpage() {
    //   window.location.href =
    //     window.location.pathname +
    //     window.location.search +
    //     window.location.hash;
    // },
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
