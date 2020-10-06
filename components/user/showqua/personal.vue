<template>
  <div>
    <loading :toggle="loadingme" />
    <div v-if="open">
      <personaldetail :sendvalue="send" />
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
            <v-data-table
              class="text-center"
              :headers="headers"
              :search="search"
              :items="show"
            >
              <template v-slot:item.info="{ item }">
                <v-btn @click="ToggleDetail(item)" class="center">
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.qPersonalStatus="{ item }">
                <div v-if="item.qPersonalStatus === 'กำลังดำเนินการ'">
                  <v-btn color="yellow">{{ item.qPersonalStatus }}</v-btn>
                </div>
                <div v-else-if="item.qPersonalStatus === 'สำเร็จ'">
                  <v-btn color="green">{{ item.qPersonalStatus }}</v-btn>
                </div>
                <div v-else-if="item.qPersonalStatus === 'รอการติดต่อกลับ'">
                  <v-btn color="orange">{{ item.qPersonalStatus }}</v-btn>
                </div>
                <div v-else-if="item.qPersonalStatus === 'ข้อมูลไม่ครบถ้วน'">
                  <v-btn color="red">{{ item.qPersonalStatus }}</v-btn>
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
import personaldetail from "../quadetail/personal_detail";
import loading from "@/components/loading/loading";

export default {
  components: {
    personaldetail,
    loading
  },
  data() {
    return {
      loadingme: false,
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
          value: "qPersonalId"
        },
        { text: "ชื่อผู้สั่ง", value: "qPersonalName" },
        { text: "นามสกุล", value: "qPersonalLast" },
        { text: "วันที่ขอใบเสนอราคา", value: "qPersonalDate" },
        { text: "สถานะ", value: "qPersonalStatus" },
        { text: "รายละเอียด", value: "info" }
      ]
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    this.loadingme = true;
    let res = await this.$http.get(
      `q_show/personal?userid=${this.$nuxt.$auth.user[0].userid}`
    );
    if (res.data.ok) {
      this.loadingme = false;
    }
    this.show = res.data.personal;
  },
  methods: {
    modalToggle(item) {
      this.send = item;
      this.a = true;
    },
    ToggleDelete(pid) {
      this.id_delete = pid.qPersonalId;
      this.b = true;
    },
    ToggleDetail(item) {
      // this.send = item;
      // this.open = true;
      this.$router.push({
        name: "quatation-detail-quap",
        params: { quaid: item.qPersonalId }
      });
    }
  }
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
