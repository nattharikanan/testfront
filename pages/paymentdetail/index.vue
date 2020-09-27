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
                  src="https://cdn140.picsart.com/280688579024211.png?type=webp&to=min&r=640"
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
                  src="https://media.tmbbank.com/uploads/icon/img/s/3362_image_th_160714053532.png"
                >
                </v-img>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4 :style="{ color: 'black' }" class="row1">
                <b
                  >ชื่อบัญชี : นาย ก<br />
                  เลขที่บัญชี :<br />
                  สาขา :</b
                >
              </v-flex>
              <v-flex xs4 :style="{ color: 'black' }" class="row1">
                <b
                  >ชื่อบัญชี : นาย ก<br />
                  เลขที่บัญชี :<br />
                  สาขา :</b
                >
              </v-flex>
              <v-flex xs4 :style="{ color: 'black' }" class="row1">
                <b
                  >ชื่อบัญชี : นาย ก<br />
                  เลขที่บัญชี :<br />
                  สาขา :</b
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