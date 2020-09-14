<template>
  <div>
    <div v-if="open">
      <companydetail :sendvalue="send" />
    </div>
    <div v-else>
      <v-card class="color">
        <v-card-title>
          ขอเสนอนิติบุคล
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-spacer></v-spacer>
        <div row>
          <v-flex xs12>
            <v-data-table class="text-center" :headers="headers" :search="search" :items="show">
              <template v-slot:item.info="{ item }">
                <v-btn @click="ToggleDetail(item)" class="center">
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.qCompanyStatus="{ item }">
                <div v-if="item.qCompanyStatus ==='กำลังดำเนินการ' ">
                  <v-btn color="yellow">{{item.qCompanyStatus}}</v-btn>
                </div>
                <div v-else-if="item.qCompanyStatus ==='สำเร็จ' ">
                  <v-btn color="green">{{item.qCompanyStatus}}</v-btn>
                </div>
                <div v-else-if="item.qCompanyStatus ==='รอการติดต่อกลับ' ">
                  <v-btn color="orange">{{item.qCompanyStatus}}</v-btn>
                </div>
                <div v-else-if="item.qCompanyStatus ==='ข้อมูลไม่ครบถ้วน' ">
                  <v-btn color="red">{{item.qCompanyStatus}}</v-btn>
                </div>
              </template>
            </v-data-table>
          </v-flex>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import companydetail from "../quadetail/company_detail";

export default {
  components: {
    companydetail,
  },
  data() {
    return {
      open: false,
      a: false,
      b: false,
      id_delete: 0,
      show: [],
      search: "",
      send: {},
      headers: [
        {
          text: "หมายเลข",
          align: "start",
          sortable: true,
          value: "qCompanyId",
        },
        { text: "ชื่อผู้สั่ง", value: "qCompanyName" },
        { text: "นามสกุล", value: "qCompanyLast" },
        { text: "วันที่ขอใบเสนอราคา", value: "qCompanyDate" },
        { text: "สถานะ", value: "qCompanyStatus" },
        { text: "รายละเอียด", value: "info" },
      ],
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/q_company");
    this.show = res.data.company;
  },
  methods: {
    modalToggle(item) {
      this.send = item;
      this.a = true;
    },
    ToggleDelete(pid) {
      this.id_delete = pid.qCompanyId;
      this.b = true;
    },
    ToggleDetail(item) {
      // this.send = item;
      // this.open = true;
      this.$router.push({
        name: "quatation-detail-quac",
        params: { quaid: item.qCompanyId },
      });
    },
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.center {
  text-align: center;
}
</style>