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
            อัพเดตสถานะ {{ form.orderid }}
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="form.orderstatus"
                  :items="status"
                  label="สถานะออเดอร์"
                  persistent-hint
                  return-object
                  single-line
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="หมายเลขพัสดุ"
                  v-model="form.tracking"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateorder()"
            >บันทึก</v-btn
          >
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
        orderid: "",
        tracking: "",
        orderstatus: ""
      },

      status: [
        "รอการชำระเงิน",
        "กำลังจัดส่ง",
        "สำเร็จ",
        "การชำระเงินไม่สำเร็จ",
        "ยกเลิก"
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

  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/orders/showorder");
  },

  methods: {
    async updateorder() {
      //update สินค้า
      this.dialog = true;
      console.log("test update", this.form.orderstatus);

      let res = await this.$http.post("/orders/update", {
        orderid: this.form.orderid,
        tracking: this.form.tracking,
        orderStatus: this.form.orderstatus
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "green";
        (this.alertstatus = true), (this.alertMessage = "แก้ไขสถานะสำเร็จ");

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
