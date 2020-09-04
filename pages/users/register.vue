<template>
  <v-app class="bg">
    <v-content>
      <script
        src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit"
        async
        defer
      ></script>
      <v-container>
        <v-alert border="top" :color="coloralert" dark :value="regisstatus">{{ alertMessage }}</v-alert>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <v-card height="580px">
              <v-toolbar
                flat
                color="cyan"
                height="50px"
                :style="{ color: 'white', paddingLeft: '150px' }"
              ></v-toolbar>
              <v-card-text>
                <div class="form">
                  <b-row>
                    <b-col>
                      <v-text-field
                        width="20"
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="200"
                        label="ชื่อจริง"
                        outlined
                        required
                      ></v-text-field>
                    </b-col>
                    <b-col>
                      <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="200"
                        label="นามสกุล"
                        required
                        outlined
                      ></v-text-field>
                    </b-col>
                  </b-row>

                  <div class="d-flex flex-row">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="อีเมล์"
                      required
                      outlined
                    ></v-text-field>
                  </div>

                  <b-row>
                    <b-col>
                      <v-text-field
                        class="รหัสผ่าน"
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[PasswordRules.required, PasswordRules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                        outlined
                        required
                      ></v-text-field>
                    </b-col>
                  </b-row>
                  <!-- <b-row>
                      <b-col>
                        <v-select
                          class="gender"
                          v-model="gender"
                          :items="genders"
                          label="เพศ"
                          outlined
                        ></v-select>
                      </b-col>

                      <b-col>
                        <v-text-field v-model="age" type="number" min="0" label="อายุ" outlined></v-text-field>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <VuePhoneNumberInput v-model="phone" clearable required />
                      </b-col>
                  </b-row>-->
                  <v-layout row>
                    <v-flex xs12 :style="{paddingLeft:'25%'}">
                      <VueRecaptcha
                        sitekey="6LecZAEVAAAAAGGh-f_XFHFIFK3GjHbk3GDYDq67"
                        @verify="checkCaptcha"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout row :style="{paddingTop:'20px'}">
                    <v-flex xs6 class="text-center">
                      <v-btn
                        type="submit"
                        value="submit"
                        width="90%"
                        height="50px"
                        color="primary"
                        @click="register"
                      >ลงทะเบียน</v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-center">
                      <v-btn width="90%" height="50px" color="error" to="/">ยกเลิก</v-btn>
                    </v-flex>
                  </v-layout>

                  <!-- </v-form> -->
                </div>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import VueRecaptcha from "vue-recaptcha";

export default {
  theme: {
    dark: true,
  },
  layout: "regis",
  watch: {
    //ฟังก์ชันไว้คอยดูตัวแปร
  },
  components: {
    VuePhoneNumberInput,
    VueRecaptcha,
  },
  data: () => ({
    captchadata: false,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    gender: " ",
    age: "",
    user: "user",
    regisstatus: false,
    alertMessage: "",
    coloralert: "",
    iconalert: "",
    valid: true,
    nameRules: [
      (v) => !!v || "กรุณากรอกข้อมูลให้กรบถ้วน",
      (v) => (v && v.length <= 200) || "Name must be less than 200 characters",
    ],

    emailRules: [
      (v) => !!v || "กรุณากรอกข้อมูลให้กรบถ้วน",
      (v) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "อีเมล์ของท่านไม่ถูกต้อง",
    ],
    genders: ["ชาย", "หญิง", "ไม่ต้องการระบุ"],
    PasswordRules: {
      required: (value) => !!value || "กรุณากรอกข้อมูลให้กรบถ้วน",
      min: (v) => v.length >= 8 || "กำหนดรหัสผ่านอย่างน้อย 8 ตัวอักษร",
    },

    show1: false,
    show2: true,
    show3: false,
    show4: false,
  }),

  methods: {
    checkCaptcha(captcha) {
      if (captcha === event) {
        console.log("please enter captcha", captcha);
      } else {
        this.captchadata = true;
        console.log("show captcha", this.captchadata);
      }
    },

    async register() {
      console.log("have captcha", this.captchadata);
      if (this.captchadata === false) {
        console.log("cant regis");
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage = "สมัครสมาชิกไม่สำเร็จ "),
          window.scrollTo(0, 0);
      } else {
        let res = await this.$http.post("/users/register", {
          userid: this.$route.query.userid,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        });
        console.log("res", res);
        if (res.data.ok) {
          console.log("เพิ่มข้อมูลสมาชิกสำเร็จ");
          this.regisstatus = true;
          (this.coloralert = "green lighten-2"),
            (this.iconalert = "mdi mdi-checkbox-marked-circle"),
            (this.alertMessage = "สมัครสมาชิกสำเร็จ"),
            window.scrollTo(0, 0);
          setTimeout(() => this.$router.push("login"), 600);
        } else {
          console.log("เพิ่มข้อมูลสมาชิกไม่สำเร็จ");
          this.regisstatus = true;
          (this.coloralert = "red lighten-2"),
            (this.iconalert = "mdi-alert-circle"),
            (this.alertMessage =
              "สมัครสมาชิกไม่สำเร็จ กรุณากรอกข้อมูลให้ครอบถ้วน หรือ อีเมล์ของท่านมีการลงทะเบียนแล้ว"),
            window.scrollTo(0, 0);
        }
      }
    },
  },
};
</script>

<style>
.form {
  padding-top: 20px;
}
.cancle {
  text-decoration: none;
}
.captcha {
  position: relative;
}
</style>
