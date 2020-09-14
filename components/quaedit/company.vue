<template>
  <div>
    <v-dialog v-model="show" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <u>
              <h5 :style="{color:'blue'}">อัพเดตสถานะ</h5>
            </u>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="status" label="สถานะสินค้า" v-model="form.Status"></v-select>
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
            :style="{color:'white'}"
            @click="() => $emit('close')"
          >ยกเลิก</v-btn>
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
      default: false,
    },
    sendvalue: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      regisstatus: "",
      coloralert: "",
      dialog: false,
      form: {
        Status: "",
        qCompanyId: "",
      },
      status: [
        "กำลังดำเนินการ",
        "สำเร็จ",
        "ข้อมูลไม่ครบถ้วน",
        "รอการติดต่อกลับ",
      ],
    };
  },
  watch: {
    show() {
      this.form = this.sendvalue;
    },
  },
  computed: {
    show() {
      return this.toggle;
    },
  },

  methods: {
    async update() {
      this.dialog = true;
      console.log("test", this.form.Status);
      let res = await this.$http.post("/q_company/update", {
        qCompanyId: this.form.qCompanyId,
        qCompanyStatus: this.form.Status,
      });
      if (!res.data.ok) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
        window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
        this.$emit("close");
        this.refreshpage();
      }
    },
    refreshpage(event) {
      window.location.reload(true);
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>