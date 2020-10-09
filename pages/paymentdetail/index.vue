<template>
  <div>
    <v-container>
      <loading :toggle="loadingme" />
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
              <v-flex xs4 class="row1" v-for="(item, idx) in bank" :key="idx">
                <v-col>
                  <v-img
                    :style="{ marginLeft: '15%' }"
                    max-height="200"
                    max-width="200"
                    :src="item.image"
                  >
                  </v-img>
                  <b :style="{ color: 'black' }">
                    ชื่อบัญชี : {{ item.owner }} <br />
                    ธนาคาร : {{ item.bankName }} <br />

                    เลขที่บัญชี : {{ item.bankAcc }}<br />
                    ธนาคาร{{ item.bankName }} สาขา : {{ item.branch }}
                  </b>
                </v-col>
              </v-flex>
            </v-layout>
          </v-container>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import loading from "@/components/loading/loading";
export default {
  components: {
    loading,
  },
  data() {
    return {
      loadingme: false,
      bank: [],
    };
  },
  async mounted() {
    this.loadingme = true;
    let res = await this.$http.get("/bank_account/showbank");
    this.bank = res.data.bankAccount;
    if (res.data.ok) {
      this.loadingme = false;
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");
.row1 {
  display: flex;

  justify-content: center;
}
</style>
