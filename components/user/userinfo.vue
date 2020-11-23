<template>
  <v-flex>
    <v-snackbar
      :color="coloralert"
      :value="alertstatus"
      :timeout="timeout"
      top
      >{{ alertMessage }}</v-snackbar
    >
    <v-card width="90%">
      <v-container>
        <v-list-item-title>ข้อมูลของฉัน</v-list-item-title>
        <v-list-item-subtitle
          >จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</v-list-item-subtitle
        >
        <v-divider></v-divider>
        <!-- <b-container class="bv-example-row" >
          <b-row>
            <b-col> 
              <v-subheader>ชื่อ</v-subheader>
               </b-col>
            <b-col><v-text-field
            v-model="firstname"
          outlined
          ></v-text-field></b-col>
          </b-row>
            <b-row >
            <b-col align="center"> อีเมล์
               </b-col>
            <b-col>  <v-text-field
            v-model="email"
          outlined=""
          ></v-text-field> </b-col>
          </b-row>
        </b-container>-->

        <v-container fluid>
          <v-row :style="{ height: '80px' }">
            <v-col cols="4">
              <v-subheader>ชื่อผู้ใช้</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="firstname" outlined></v-text-field>
            </v-col>
          </v-row>

          <v-row :style="{ height: '80px' }">
            <v-col cols="4">
              <v-subheader>นามสกุล</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="lastname" outlined></v-text-field>
            </v-col>
          </v-row>

          <!-- <v-row :style="{height : '80px'}">
      <v-col cols="4">
        <v-subheader>อีเมลล์ผู้ใช้</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="email"
          outlined=""
        ></v-text-field>
      </v-col>
          </v-row>-->

          <v-row :style="{ height: '80px' }">
            <v-col cols="4">
              <v-subheader>อายุ</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field v-model="age" suffix="ปี" outlined></v-text-field>
            </v-col>
          </v-row>

          <v-row :style="{ height: '150px' }">
            <v-col cols="4">
              <v-subheader>เบอร์โทรศัพท์</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-text-field
                type="tel"
                :counter="10"
                v-model="phone"
                outlined
                maxlength="10"
              ></v-text-field>
              <!-- <a @click="editinfo()" ><u align ="right">แก้ไขข้อมูลส่วนตัว</u></a> -->
              <v-btn color="primary" dark class="mb-2" @click="dialog = true"
                >บันทึก</v-btn
              >
              <v-dialog v-model="dialog" persistent max-width="350">
                <v-card>
                  <v-card-title>ต้องการบันทึกข้อมูลใช่หรือไม่?</v-card-title>
                  <!-- เช็คก่อนออกจากระบบ -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="updateinfo"
                      >ใช่</v-btn
                    >
                    <v-btn
                      color="red darken-1"
                      rounded
                      :style="{ color: 'white' }"
                      @click="close"
                      >ไม่ใช่</v-btn
                    >
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
  components: {},
  data() {
    return {
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      firstname: "",
      lastname: "",
      email: "",
      age: "",
      phone: ""
    };
  },
  created() {
    if (typeof window === "undefined") {
      global.window = {};
    }
  },
  mounted() {
    this.email = $nuxt.$auth.user[0].email;
    this.firstname = $nuxt.$auth.user[0].firstname;
    this.lastname = $nuxt.$auth.user[0].lastname;
    this.age = $nuxt.$auth.user[0].age;
    this.phone = $nuxt.$auth.user[0].phone;
    // this.fullname = this.firstname + " " + this.lastname;
  },
  methods: {
    async updateinfo() {
      //ต้องมีการยืนยันรหัสผ่านอีกรอบเพื่อทำการเปลี่ยนแปลงข้อมูล
      console.log("hello", this.email);
      let res = await this.$http.post("/users/update", {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        age: this.age,
        phone: this.phone
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
location.href = location.href;
      }
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style></style>
