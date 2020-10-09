<template>
  <div>
    <v-snackbar
      :color="coloralert"
      v-model="alertstatus"
      :timeout="timeout"
      top=""
    >
      {{ alertMessage }}
    </v-snackbar>
    <v-btn @click="dialog = true" color="primary" dark class="mb-2"
      >+ เพิ่มบัญชีธนาคาร</v-btn
    >
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            เพิ่มบัญชีธนาคาร
            <v-row>
              <v-col cols="12" sm="4" md="12">
                <v-select
                  v-model="bankName"
                  item-text="itemname"
                  item-value="itemid"
                  :items="bankitem"
                  label="เลือกธนาคาร"
                >
                  <template v-slot:item="{ item }">
                    <img width="20px" height="20px" :src="item.itemimage" />
                    &nbsp; &nbsp; <span>{{ item.itemname }}</span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="4" md="12">
                <v-text-field
                  v-model="bankBranch"
                  required
                  label="สาขา"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="12">
                <v-text-field
                  v-model="bankAcc"
                  required
                  label="เลขที่บัญชี(กรุณาใส่ขีดคั่น)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="12">
                <v-text-field
                  v-model="owner"
                  required
                  label="ชื่อเจ้าของบัญชี"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="getNameandImage()"
            >บันทึก</v-btn
          >
          <v-btn
            color="blue darken-1"
            rounded
            :style="{ color: 'white' }"
            @click="close"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Label",
    },
  },
  data() {
    return {
      b_name: "",
      b_image: "",
      bankitem: [],
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      bankName: "",
      bankAcc: "",
      owner: "",
      option: [],
      bankBranch: "",
    };
  },

  async created() {
    let res = await this.$http.get("/bank_account/getitem");
    this.bankitem = res.data.bankItems;
  },
  methods: {
    async getNameandImage() {
      let res = await this.$http.post("/bank_account/getforinsert", {
        itemid: this.bankName,
      });
      if (res.data.ok) {
        (this.b_name = res.data.bankItems[0].itemname),
          (this.b_image = res.data.bankItems[0].itemimage);
        this.save();
      } else {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "ข้อมูลผิดพลาดกรุณาตรวจสอบอีกครั้ง");
      }
    },
    async save() {
      this.dialog = true;
      let res = await this.$http.post("/bank_account/insert", {
        bankName: this.b_name,
        bankAcc: this.bankAcc,
        branch: this.bankBranch,
        owner: this.owner,
        image: this.b_image,
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "green";
        (this.alertstatus = true), (this.alertMessage = "เพิ่มข้อมูลถูกต้อง");
        this.close();
      }
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
