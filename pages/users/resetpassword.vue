<template>
  <div>
    <loading :toggle="loadingme" />
    <v-snackbar top :color="coloralert" dark v-model="regisstatus">{{
      alertMessage
    }}</v-snackbar>
    <v-container class="text-center" fill-height>
      <v-layout row wrap align-center>
        <v-flex xs4> </v-flex>
        <v-flex xs8 class="text-xs-center">
          <v-card max-width="50%" color="blue lighten-5">
            <v-container>
              <b-form>
                <b><h3>ตั้งรหัสผ่านใหม่</h3></b>
                <v-text-field
                  class="รหัสผ่าน"
                  v-model="newpass"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[PasswordRules.required, PasswordRules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="กรุณากรอกรหัสผ่าน"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  class="รหัสผ่าน"
                  v-model="confirmnewpass"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[PasswordRules.required, PasswordRules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="ยืนยันรหัสผ่าน"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                  outlined
                  required
                ></v-text-field>
              </b-form>
            </v-container>
            <v-card-actions>
              <b-button block variant="primary" @click="test">ตกลง</b-button>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import loading from "@/components/loading/loading";
export default {
  components: {
    loading
  },
  data() {
    return {
      loadingme: false,
      confirmnewpass: "",
      newpass: "",
      token: "",
      show1: false,
      regisstatus: false,
      alertMessage: "",
      coloralert: "",
      PasswordRules: {
        required: value => !!value || "กรุณากรอกข้อมูลให้กรบถ้วน",
        min: v => v.length >= 8 || "กำหนดรหัสผ่านอย่างน้อย 8 ตัวอักษร"
      }
    };
  },
  methods: {
    async test() {
      this.token = this.$route.query.token;
      if (this.token == null || this.token == "" || this.token == undefined) {
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "หมายเลข token ของท่านไม่ถูกต้อง");
        setTimeout(() => this.$router.push("forgetpassword"), 600);
      } else {
        if (
          this.newpass !== this.confirmnewpass ||
          this.newpass == "" ||
          this.confirmnewpass == ""
        ) {
          this.regisstatus = true;
          (this.coloralert = "red lighten-2"),
            (this.iconalert = "mdi-alert-circle"),
            (this.alertMessage =
              "รหัสผ่านของท่านไม่ตรงกันกรุณาตรวจสอบอีกครั้ง");
        } else {
          this.loadingme = true;
          let res = await this.$http.post("/users/resetpassword", {
            newPass: this.newpass,
            token: this.token
          });
          if (res.data.ok) {
            this.loadingme = false;
            (this.coloralert = "green lighten-2"),
              (this.iconalert = "mdi mdi-checkbox-marked-circle"),
              (this.alertMessage = "การเปลี่ยนรหัสผ่านสำเร็จ");
            setTimeout(() => this.$router.push("login"), 600);
          } else {
            this.loadingme = false;
            (this.coloralert = "red lighten-2"),
              (this.iconalert = "mdi-alert-circle"),
              (this.alertMessage =
                "การเปลี่ยนรหัสผ่านของท่านไม่สำเร็จ หรือ tokenของท่านหมดเวลา");
            setTimeout(() => this.$router.push("forgetpassword"), 600);
          }
        }
      }
    }
    // async resetpass() {
    //   this.token = JSON.parse(JSON.stringify(this.$route.query));
    //   console.log("newpass", this.newpass);
    //   console.log("confirm", this.confirmnewpass);
    //   if (this.token == null || this.token == "" || this.token == undefined) {
    //     this.regisstatus = true;
    //     (this.coloralert = "red lighten-2"),
    //       (this.iconalert = "mdi-alert-circle"),
    //       (this.alertMessage = "หมายเลข token ของท่านไม่ถูกต้อง");
    //     setTimeout(() => this.$router.push("forgetpassword"), 600);
    //   } else {
    //     if (
    //       this.newpass !== this.confirmnewpass ||
    //       this.newpass == "" ||
    //       this.confirmnewpass == ""
    //     ) {
    //       this.regisstatus = true;
    //       (this.coloralert = "red lighten-2"),
    //         (this.iconalert = "mdi-alert-circle"),
    //         (this.alertMessage = "รหัสผ่านของท่านไม่ตรงกันกรุณาตวรสอบอีกครั้ง");
    //     } else {
    //       console.log("เข้า else");
    //       let res = await this.$http.post("/users/resetpassword");
    //       console.log("test", res);
    //     }
    //   }
    // }
  }
};
</script>

<style></style>
