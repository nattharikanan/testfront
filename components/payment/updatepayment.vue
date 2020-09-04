<template>
  <div>
    <v-dialog v-model="show" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            อัพเดตการแจ้งชำระเงิน
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="form.paymentstatus"
                  :items="statuspayment"
                  label="สถานะการชำระเงิน"
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
          <v-btn color="blue darken-1" text @click="updatepayment()">บันทึก</v-btn>
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
      coloralert: "",
      dialog: false,
      form: {
        paymentid: "",
        paymentstatus: "",
      },

      statuspayment: ["กำลังดำเนินการ", "สำเร็จ", "ไม่สำเร็จ"],
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
    async updatepayment() {
      //update สินค้า
      this.dialog = true;
      console.log("test update", this.form.paymentstatus);

      let res = await this.$http.post("/payments/update", {
        paymentid: this.form.paymentid,
        paymentstatus: this.form.paymentstatus,
      });

      if (!res.data.ok) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
        <v-alert type="error">เพิ่มข้อมูลสินค้าไม่สำเร็จ</v-alert>;
        window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
        <v-alert type="success">เพิ่มข้อมูลสินค้าสำเร็จ</v-alert>;
        window.alert("Insert Successful!");
        this.$emit("close");
      }
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>