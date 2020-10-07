<template>
  <div>
    <loading :toggle="loadingme" />
    <updatebank :toggle="a" @close="a = false" :sendvalue="send" />
    <!-- <deleteorder :deletetoggle="b" @closed="b=false" :delete_id="id_delete" /> -->
    <v-card class="color">
      <v-card-title>
        ธนาคาร
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
        <inserbank />
      </v-card-title>

      <v-spacer></v-spacer>
      <div row>
        <v-flex xs12>
          <v-container>
            <v-data-table
              :headers="headers"
              :search="search"
              class="elevation-1"
              :items="show"
            >
              <template v-slot:item.bankstatus="{ item }">
                <div v-if="item.bankstatus == 'active'">
                  <v-btn color="green" :style="{ color: 'white' }"
                    >ใช้งานได้</v-btn
                  >
                </div>
                <div v-else-if="item.bankstatus == 'inactive'">
                  <v-btn color="red darken-2" :style="{ color: 'white' }"
                    >ยกเลิกการใช้งาน</v-btn
                  >
                </div>
              </template>
              <template v-slot:item.edit="{ item }">
                <v-btn @click="modalToggle(item)" class="center">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-container>
        </v-flex>
      </div>
    </v-card>
  </div>
</template>

<script>
import inserbank from "../../components/bank/insertbank";
import updatebank from "../../components/bank/updatebank";
import loading from "@/components/loading/loading";

export default {
  components: {
    inserbank,
    updatebank,
    loading
  },
  data() {
    return {
      loadingme: false,
      a: false,
      b: false,
      id_delete: 0,
      show: [],
      search: "",
      send: {},
      headers: [
        {
          text: "ลำดับ",
          align: "start",
          sortable: true,
          value: "bankNum"
        },
        { text: "ชื่อธนาคาร", value: "bankName" },
        { text: "เลขบัญชี", value: "bankAcc" },
        { text: "ชื่อเจ้าของบัญชี", value: "owner" },
        { text: "สถานะบัญชี", value: "bankstatus" },
        { text: "แก้ไข", value: "edit" }
      ]
    };
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    this.loadingme = true;
    let res = await this.$http.get("/bank_account");
    this.show = res.data.bankAccount;
    if (res.data.ok) {
      this.loadingme = false;
    }

    // this.getProduct();
  },
  methods: {
    modalToggle(item) {
      this.send = item;
      this.a = true;
      console.log("send", this.send);
    },
    ToggleDelete(pid) {
      this.id_delete = pid.orderid;
      this.b = true;
      console.log("hi", this.id_delete);
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
