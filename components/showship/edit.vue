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
              <h5 :style="{ color: 'blue' }">แก้ไขข้อมูล</h5>
            </u>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :style="{ color: 'green' }"
                  v-model="form.shmName"
                  required
                  label="ชื่อ"
                ></v-text-field>
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
        shmName: "",
        shmId: ""
      }
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
      //update สินค้า
      this.dialog = true;
      let res = await this.$http.post("/ship_medthod/update", {
        shmId: this.form.shmId,
        shmName: this.form.shmName
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "green";
        (this.alertstatus = true), (this.alertMessage = "แก้ไขสำเร็จ");

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
