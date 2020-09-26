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
            <u>
              <h5 :style="{ color: 'blue' }">อัพเดตสถานะ</h5>
            </u>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="status"
                  label="สถานะสินค้า"
                  v-model="form.Status"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="update()">บันทึก</v-btn>
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
import axios from "axios";
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
      regisstatus: "",
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,

      dialog: false,
      form: {
        Status: "",
        qPersonalId: ""
      },
      status: [
        "กำลังดำเนินการ",
        "สำเร็จ",
        "ข้อมูลไม่ครบถ้วน",
        "รอการติดต่อกลับ"
      ]
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
    async update() {
      this.dialog = true;
      console.log("test", this.form.Status);
      let res = await this.$http.post("/q_personal/update", {
        qPersonalId: this.form.qPersonalId,
        qPersonalStatus: this.form.Status
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "green";
        (this.alertstatus = true), (this.alertMessage = "แก้ไขข้อมูลถูกต้อง");
        this.$emit("close");
        this.refreshpage();
      }
    },
    refreshpage(event) {
      window.location.reload(true);
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style></style>
