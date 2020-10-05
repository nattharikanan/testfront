<template>
  <v-flex>
    <v-snackbar
      :color="coloralert"
      v-model="alertstatus"
      :timeout="timeout"
      top
      >{{ alertMessage }}</v-snackbar
    >
    <v-card height="700px">
      <!-- <div class="overline mb-4">ข้อมูลของฉัน</div> -->
      <v-container>
        <v-list-item-title>ที่อยู่ของฉัน</v-list-item-title>
        <v-list-item-subtitle
          >จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</v-list-item-subtitle
        >
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            <v-col cols="4">
              <v-subheader>ชื่อ-นามสกุล</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-subheader>{{ fullname }}</v-subheader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-subheader>เบอร์โทรศัพท์</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-subheader>{{ phone }}</v-subheader>
            </v-col>
          </v-row>
          <v-row :style="{ height: '250px' }">
            <v-col cols="4">
              <v-subheader>ที่อยู่</v-subheader>
            </v-col>
            <v-col cols="8">
              <v-container>
                <b-form-textarea
                  v-model="addressinfo"
                  :style="{ marginBottom: '10px' }"
                  id="textarea"
                  placeholder="กรอกรายละเอียดที่อยู่"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <ThailandAutoComplete
                  v-model="district"
                  type="district"
                  @select="select"
                  label="ตำบล"
                  color="#85C1E9 "
                  placeholder="กรุณากรอกตำบล"
                />

                <ThailandAutoComplete
                  v-model="amphoe"
                  type="amphoe"
                  @select="select"
                  label="อำเภอ"
                  color="#85C1E9 "
                  placeholder="กรุณากรอกอำเภอ"
                />

                <ThailandAutoComplete
                  v-model="province"
                  type="province"
                  @select="select"
                  label="จังหวัด"
                  color="#85C1E9 "
                  placeholder="กรุณากรอกจังหวัด"
                />

                <div v-if="this.zipcode == null || this.zipcode == ''">
                  <ThailandAutoComplete
                    type="zipcode"
                    v-model="zipcodenull"
                    color="#85C1E9 "
                    placeholder="รหัสไปรษณีย์"
                  />
                </div>
                <div v-else>
                  <ThailandAutoComplete
                    v-model="zipcode"
                    type="zipcode"
                    @select="select"
                    color="#85C1E9 "
                    placeholder="รหัสไปรษณีย์"
                  />
                </div>
              </v-container>

              <div
                v-if="
                  (district != '' &&
                    amphoe != '' &&
                    province != '' &&
                    zipcode != '' &&
                    addressinfo != '') ||
                    zipcodenull != ''
                "
              >
                <v-btn color="primary" dark class="mb-2" @click="dialog = true"
                  >บันทึก</v-btn
                >
              </div>
              <div v-else>
                <v-btn color="primary" @click="alert()">บันทึก</v-btn>
              </div>

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
// import ThailandAutoComplete from "vue-thailand-address-autocomplete";
export default {
  components: {
    // ThailandAutoComplete
  },
  data() {
    return {
      zipcodenull: "",
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
      district: "",
      amphoe: "",
      province: "",
      zipcode: "",
      addressinfo: ""
    };
  },
  mounted() {
    if (typeof window === "undefined") {
      global.window = {};
    }
    this.email = $nuxt.$auth.user[0].email;
    this.firstname = $nuxt.$auth.user[0].firstname;
    this.lastname = $nuxt.$auth.user[0].lastname;
    this.phone = $nuxt.$auth.user[0].phone;
    this.address = $nuxt.$auth.user[0].address;
    this.fullname = this.firstname + " " + this.lastname;
    if (
      $nuxt.$auth.user[0].addressInfo == null ||
      $nuxt.$auth.user[0].addressDistrict == null ||
      $nuxt.$auth.user[0].addressAmphoe == null ||
      $nuxt.$auth.user[0].addressProvince == null ||
      $nuxt.$auth.user[0].addressZipcode == null
    ) {
      console.log("IF");
      this.addressinfo = "";
      this.district = "";
      this.amphoe = "";
      this.province = "";
      this.zipcode = "";
    } else {
      console.log("else");
      this.addressinfo = $nuxt.$auth.user[0].addressInfo;
      this.district = $nuxt.$auth.user[0].addressDistrict;
      this.amphoe = $nuxt.$auth.user[0].addressAmphoe;
      this.province = $nuxt.$auth.user[0].addressProvince;
      this.zipcode = $nuxt.$auth.user[0].addressZipcode;
    }
  },
  checkbeforeinsert() {},
  methods: {
    select(address) {
      if (address.zipcode === null) {
        this.district = address.district;
        this.amphoe = address.amphoe;
        this.province = address.province;
        this.zipcode = this.zipcodenull;
      } else {
        this.district = address.district;
        this.amphoe = address.amphoe;
        this.province = address.province;
        this.zipcode = address.zipcode;
      }
    },
    async updateinfo() {
      //ต้องมีการยืนยันรหัสผ่านอีกรอบเพื่อทำการเปลี่ยนแปลงข้อมูล
      if (this.zipcodenull == null || this.zipcodenull == "") {
        this.address =
          this.addressinfo +
          "\xa0\xa0" +
          "ตำบล/แขวง" +
          "\xa0\xa0" +
          this.district +
          "\xa0\xa0" +
          "เขต/อำเภอ" +
          "\xa0\xa0" +
          this.amphoe +
          "\xa0\xa0" +
          "จังหวัด" +
          "\xa0\xa0" +
          this.province +
          "\xa0\xa0" +
          "รหัสไปรษณีย์" +
          "\xa0\xa0" +
          this.zipcode;
        console.log(this.address);

        let res = await this.$http.post("/users/update", {
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
          address: this.address,
          addressInfo: this.addressinfo,
          addressDistrict: this.district,
          addressAmphoe: this.amphoe,
          addressProvince: this.province,
          addressZipcode: this.zipcode
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
          window.location.reload(true);
        }
      } else {
        this.address =
          this.addressinfo +
          "\xa0\xa0" +
          "ตำบล/แขวง" +
          "\xa0\xa0" +
          this.district +
          "\xa0\xa0" +
          "เขต/อำเภอ" +
          "\xa0\xa0" +
          this.amphoe +
          "\xa0\xa0" +
          "จังหวัด" +
          "\xa0\xa0" +
          this.province +
          "\xa0\xa0" +
          "รหัสไปรษณีย์" +
          "\xa0\xa0" +
          this.zipcodenull;
        console.log(this.address);

        let res = await this.$http.post("/users/update", {
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
          address: this.address,
          addressInfo: this.addressinfo,
          addressDistrict: this.district,
          addressAmphoe: this.amphoe,
          addressProvince: this.province,
          addressZipcode: this.zipcodenull
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
          window.location.reload(true);
        }
      }

      this.dialog = false;
    },
    close() {
      this.dialog = false;
    },
    alert() {
      this.coloralert = "red";
      (this.alertstatus = true),
        (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  }
};
</script>

<style>
div.vth-addr-label {
  font-family: "Kanit";
}
input.vth-addr-input.vth-addr-input-size-default {
  font-family: "Kanit";
}

/* span.item-first {
  font-family: "Kanit";
} */
span.vth-addr-font-weight-bold {
  font-family: "Kanit";
}
/* span.vth-addr-item-second {
  font-family: "Kanit";
} */
span.item-first,
span.vth-addr-item-second,
span.vth-addr-item-third {
  font-family: "Kanit";
}
</style>
