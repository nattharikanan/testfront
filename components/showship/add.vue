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
      >+ เพิ่มการขนส่ง</v-btn
    >
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <u>
              <h5 :style="{ color: 'blue' }">เพิ่มรูปแบบการขนส่ง</h5>
            </u>
            <v-row>
              <v-col cols="12" sm="4" md="12">
                <v-text-field
                  v-model="ShmName"
                  required
                  label="ชื่อ"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="insert()">บันทึก</v-btn>
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
      default: "Label"
    }
  },
  data() {
    return {
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      ShmName: ""
    };
  },

  methods: {
    async insert() {
      this.dialog = true;
      console.log(this.ShmName);
      let res = await this.$http.post("/ship_medthod/insert", {
        shmName: this.ShmName
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true), (this.alertMessage = "ไม่สำเร็จ");
      } else {
        this.coloralert = "green";
        (this.alertstatus = true), (this.alertMessage = "เพิ่มข้อมูลสำเร็จ");

        this.close();
      }
    },

    close() {
      this.dialog = false;
    }
  }
};
</script>

<style></style>
