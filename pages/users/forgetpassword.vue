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
                <b><h3>ลืมรหัสผ่าน</h3></b>
                <b-input
                  v-model="emailforget"
                  placeholder="กรอกอีเมล์ของท่าน"
                ></b-input>
              </b-form>
            </v-container>
            <v-card-actions>
              <b-button block variant="primary" @click="send">ตกลง</b-button>
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
      emailforget: "",
      regisstatus: false,
      alertMessage: "",
      coloralert: ""
    };
  },
  methods: {
    async send() {
      this.loadingme = true;
      if (this.emailforget == "" || this.emailforget == null) {
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "กรุณากรอกอีเมล์ของท่าน");
      } else {
        let res = await this.$http.post("/users/forgetpassword", {
          email: this.emailforget
        });
        if (res.data.ok) {
          this.loadingme = false;
          this.regisstatus = true;
          (this.coloralert = "green lighten-2"),
            (this.iconalert = "mdi mdi-checkbox-marked-circle"),
            (this.alertMessage =
              "ส่งข้อความไปยังอีเมล์ของท่านสำเร็จ กรุณาตรวจสอบกล่องข้อความของท่าน");
        } else {
          this.loadingme = false;
          this.regisstatus = true;
          (this.coloralert = "red lighten-2"),
            (this.iconalert = "mdi-alert-circle"),
            (this.alertMessage =
              "ขอภัยไม่พบอีเมล์ของท่าน กรุณาตรวจสอบอีกครั้ง");
        }
      }
    }
  }
};
</script>

<style></style>
