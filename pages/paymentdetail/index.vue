<template>
  <div>
    <v-container>
      <v-layout max-height="100%" max-width="100%">
        <v-container>
          <h3 :style="{ color: 'black', textAlign: 'center' }">
            <u>ชำระเงินโดยการโอนเข้าบัญชีธนาคาร</u>
          </h3>
          <h4 :style="{ color: 'black', textAlign: 'center' }">
            เพื่อการจัดส่งที่รวดเร็ว เมื่อลูกคาโอนชำระเงินเรียบร้อยแล้ว
            <u :style="{ color: 'red' }">โปรดแจ้งยืนยันชำระเงินทันที</u>
          </h4>
          <v-container>
            <v-layout row>
              <v-flex xs4 class="row1">
                <v-img
                  max-height="200"
                  max-width="200"
                  src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
                >
                </v-img>
              </v-flex>
              <v-flex xs4 class="row1">
                <v-img
                  max-height="200"
                  max-width="200"
                  src="https://www.img.in.th/images/45a5c4b2c57bd1809af15d06f3f1d724.png"
                >
                </v-img>
              </v-flex>
              <v-flex xs4 class="row1">
                <v-img
                  max-height="200"
                  max-width="200"
                  src="https://iservice.aia.co.th/content/dam/th/th/payment/P4_ATM/1BBL_ATM.png"
                >
                </v-img>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4 :style="{ color: 'black' }" class="row1">
                <b
                  >ชื่อบัญชี : บริษัท ผลิตภัณฑ์และวัสดุก่อสร้าง <br />
                  เลขที่บัญชี : 218-1-100832-9<br />
                  สาขา : ธนาคารกสิกรไทย สาขานนทบุรี</b
                >
              </v-flex>
              <v-flex xs4 :style="{ color: 'black' }" class="row1">
                <b
                  >ชื่อบัญชี : บริษัท ผลิตภัณฑ์และวัสดุก่อสร้าง<br />
                  เลขที่บัญชี : 020-6-04588-3<br />
                  สาขา : ธนาคารกรุงไทย สาขา เตาปูน</b
                >
              </v-flex>
              <v-flex xs4 :style="{ color: 'black' }" class="row1">
                <b
                  >ชื่อบัญชี : บริษัท ผลิตภัณฑ์และวัสดุก่อสร้าง<br />
                  เลขที่บัญชี : 127-3-13805-5<br />
                  สาขา : ธนาคารกรุงเทพ สาขา อารีย์</b
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");
.row1 {
  display: flex;
  justify-content: center;
}
</style>
