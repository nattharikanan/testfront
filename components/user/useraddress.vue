<template>
  <v-flex>
    <v-snackbar :color="coloralert" :value="alertstatus" :timeout="timeout" top>{{ alertMessage }}</v-snackbar>
    <v-card width="90%">
      <!-- <div class="overline mb-4">ข้อมูลของฉัน</div> -->
      <v-container>
        <v-list-item-title>ที่อยู่ของฉัน</v-list-item-title>
        <v-list-item-subtitle>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</v-list-item-subtitle>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            <v-col cols="4">
              <v-subheader>ชื่อ-นามสกุล</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-subheader>{{fullname}}</v-subheader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-subheader>เบอร์โทรศัพท์</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-subheader>{{phone}}</v-subheader>
            </v-col>
          </v-row>
          <!-- <v-row :style="{height : '80px'}">
      <v-col cols="4">
        <v-subheader>เบอร์โทรศัพท์</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          :value="phone"
        outlined=""
        ></v-text-field>
      </v-col>
          </v-row>-->

          <v-row :style="{height : '250px'}">
            <v-col cols="4">
              <v-subheader>ที่อยู่</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-textarea
                name="input-7-1"
                filled
                label="กรุณาระบุที่อยู่ให้จัดเจน"
                auto-grow
                v-model="address"
                counter="200"
              ></v-textarea>
              <v-btn color="primary" dark class="mb-2" @click="dialog=true">บันทึก</v-btn>
              <v-dialog v-model="dialog" persistent max-width="350">
                <v-card>
                  <v-card-title>ต้องการบันทึกข้อมูลใช่หรือไม่?</v-card-title>
                  <!-- เช็คก่อนออกจากระบบ -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="updateinfo">ใช่</v-btn>
                    <v-btn
                      color="red darken-1"
                      rounded
                      :style="{color:'white'}"
                      @click="close"
                    >ไม่ใช่</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      firstname: "",
      lastname: "",
      fullname: "",
      phone: "",
      address: "",
      email: "",
    };
  },
  mounted() {
    this.email = $nuxt.$auth.user[0].email;
    this.firstname = $nuxt.$auth.user[0].firstname;
    this.lastname = $nuxt.$auth.user[0].lastname;
    this.phone = $nuxt.$auth.user[0].phone;
    this.address = $nuxt.$auth.user[0].address;
    this.fullname = this.firstname + " " + this.lastname;
  },
  methods: {
    async updateinfo() {
      //ต้องมีการยืนยันรหัสผ่านอีกรอบเพื่อทำการเปลี่ยนแปลงข้อมูล
      console.log("hello", this.address);
      let res = await this.$http.post("/users/update", {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        address: this.address,
      });
      if (!res.data.ok) {
        console.log("แก้ไขข้อมูลสินค้าไม่สำเร็จ");
        this.alertstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.alertMessage = "แก้ไขข้อมูลสำเร็จไม่สำเร็จ");
      } else {
        console.log("แก้ไขข้อมูลสินค้าสำเร็จ");
        this.alertstatus = true;
        (this.coloralert = "green lighten-2"),
          (this.alertMessage = "แก้ไขข้อมูลสำเร็จ");
      }
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>