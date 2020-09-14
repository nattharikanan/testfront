<template>
  <div>
    <v-dialog v-model="show" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            อัพเดตสถานะสมาชิก
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="form.userStatus"
                  :items="status"
                  label="สถานะสมาชิก"
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
          <v-btn color="blue darken-1" text @click="updatestatus()">บันทึก</v-btn>
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
        email: "",
        userid: "",
        userStatus: "",
      },

      status: ["online", "offline"],
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
    async updatestatus() {
      //update สถานะ
      this.dialog = true;
      console.log("check", this.form.email);
      let res = await this.$http.post("/users/updatestatus", {
        email: this.form.email,
        userStatus: this.form.userStatus,
      });
      if (!res.data.ok) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
        window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
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