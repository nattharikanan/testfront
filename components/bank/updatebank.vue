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
    <v-dialog v-model="show" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            อัพเดตสถานะธนาคาร
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="ชื่อธนาคาร"
                  v-model="form.bankName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="หมายเลขบัญชี"
                  v-model="form.bankAcc"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="ชื่อเจ้าของบัญชี"
                  v-model="form.owner"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="form.bankstatus"
                  :items="status"
                  label="สถานะ"
                  persistent-hint
                  return-object
                  single-line
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updatebank()">บันทึก</v-btn>
          <v-btn
            color="blue darken-1"
            rounded
            :style="{ color: 'white' }"
            @click="() => $emit('close')"
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
    toggle: {
      type: Boolean,
      default: false
    },
    sendvalue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      form: {
        bankNum: "",
        bankName: "",
        bankAcc: "",
        owner: "",
        bankstatus: ""
      },

      status: ["active", "inactive"]
    };
  },
  watch: {
    show() {
      this.form = this.sendvalue;
    }
  },
  computed: {
    show() {
      return this.toggle;
    }
  },

  methods: {
    async updatebank() {
      //update สินค้า
      this.dialog = true;
      console.log("test update", this.form.bankstatus);

      let res = await this.$http.post("/bank_account/update", {
        bankNum: this.form.bankNum,
        bankName: this.form.bankName,
        bankAcc: this.form.bankAcc,
        owner: this.form.owner,
        bankstatus: this.form.bankstatus
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "green";
        (this.alertstatus = true), (this.alertMessage = "เพิ้มข้อมูลถูกต้อง");
        this.$emit("close");
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style></style>
