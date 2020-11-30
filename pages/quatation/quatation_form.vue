<template>
  <div>
    <loading :toggle="loadingme" />
    <v-snackbar
      :color="coloralert"
      v-model="alertstatus"
      :timeout="timeout"
      top=""
    >
      {{ alertMessage }}
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>ยืนยันการส่งข้อมูล ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="insert()">ใช่</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false"
            >ไม่ใช่</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    {{ this.$route.params.quatationid }}
    <v-container>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"></v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <v-card class="mb-12" color="blue lighten-5" full-height="900px">
                <u>
                  <h4 class="text-center" :style="{ paddingTop: '15px' }">
                    ติดต่อขอใบเสนอราคา
                  </h4>
                </u>

                <v-container>
                  <b-form-group
                    id="input-group-1"
                    label="รหัสสินค้า"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="form.productid"
                      id="input-1"
                      required
                      disabled
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-1"
                    label="ชื่อสินค้า"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="form.productname"
                      id="input-1"
                      required
                      disabled
                    ></b-form-input>
                  </b-form-group>
                  <div v-if="form.unit != 'JOB'">
                    <v-row class="ml-1">
                      <b-form-group
                        class="quantity-input"
                        id="input-group-1"
                        label="จำนวนที่ต้องการ"
                        label-for="input-1"
                      ></b-form-group>
                      <b-form-input
                        class="ml-10 square-input"
                        id="input-1"
                        type="number"
                        v-model="form.quantity"
                        name="test"
                        min="1"
                        oninput="validity.valid||(value='');"
                        required
                      ></b-form-input>

                      <div>
                        <b-form-group
                          class="space"
                          id="input-group-1"
                          :label="form.unit"
                          label-for="input-1"
                        ></b-form-group>
                      </div>
                    </v-row>
                  </div>
                  <div v-if="form.unit === 'JOB'">
                    <v-row class="ml-1">
                      <b-form-group
                        class="w"
                        id="input-group-1"
                        label="ขนาดพื้นที่ที่ต้องการใช้สินค้า"
                        label-for="input-1"
                      ></b-form-group>
                      <b-form-input
                        class="ml-10 square-input"
                        id="input-1"
                        type="number"
                        v-model="form.square"
                        min="1"
                        oninput="validity.valid||(value='');"
                        required
                      ></b-form-input>
                      <b-form-group
                        class="space"
                        id="input-group-1"
                        label="ตารางเมตร"
                        label-for="input-1"
                      ></b-form-group>
                    </v-row>
                  </div>
                </v-container>
              </v-card>

              <v-layout row>
                <v-flex xs6 :style="{ paddingLeft: '20px' }">
                  <v-btn text>ยกเลิก</v-btn>
                </v-flex>
                <v-flex
                  xs6
                  class="text-right"
                  :style="{ paddingRight: '20px' }"
                >
                  <div v-if="form.square != '' || form.quantity != ''">
                    <v-btn color="primary" @click="e1 = 2">ถัดไป</v-btn>
                  </div>
                  <div v-else>
                    <b-button type="submit" variant="primary">ถัดไป</b-button>
                  </div>
                </v-flex>
              </v-layout>
            </b-form>
          </v-stepper-content>

          <v-stepper-content step="2">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <v-layout column :style="{ background: '#e3f2fd' }">
                <v-container class="all">
                  <u :style="{ color: 'black' }">
                    <h4
                      class="text-center"
                      :style="{ paddingTop: '15px', color: 'black' }"
                    >
                      ที่อยู่สำหรับการจัดส่ง
                    </h4>
                  </u>
                  <b-form-group :style="{ color: 'black' }">
                    รายละเอียดที่อยู่
                  </b-form-group>
                  <b-form-textarea
                    v-model="addressinfo"
                    :style="{ marginBottom: '10px' }"
                    id="textarea"
                    placeholder="กรอกรายละเอียดที่อยู่"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                  <div class="changefont">
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
                  </div>
                </v-container>
              </v-layout>

              <v-layout row :style="{ paddingTop: '20px' }">
                <v-flex xs6 :style="{ paddingLeft: '20px' }">
                  <v-btn text @click="e1 = 1">ย้อนกลับ</v-btn>
                </v-flex>
                <v-flex
                  xs6
                  class="text-right"
                  :style="{ paddingRight: '20px' }"
                >
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
                    <v-btn color="primary" @click="(e1 = 3), mergeaddress()"
                      >ถัดไป</v-btn
                    >
                  </div>
                  <div v-else>
                    <v-btn color="primary" @click="alert()">ถัดไป</v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </b-form>
          </v-stepper-content>

          <v-stepper-content step="3">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <v-card class="mb-12" color="blue lighten-5" full-height="900px">
                <u>
                  <h4 class="text-center" :style="{ paddingTop: '15px' }">
                    ข้อมูลผู้สั่งซื้อ
                  </h4>
                </u>
                <v-container>
                  <v-layout row>
                    <v-flex xs6>
                      <v-col>
                        <b-form-group
                          id="input-group-1"
                          label="*ชื่อ"
                          label-for="input-1"
                        >
                          <b-form-input
                            v-model="form.name"
                            placeholder="กรอกชื่อ"
                            id="input-1"
                            required
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                          id="input-group-1"
                          label="*เบอร์โทรศัพท์"
                          label-for="input-1"
                        >
                          <b-form-input
                            maxlength="10"
                            v-model="form.phone"
                            placeholder="กรอกเบอร์โทรศัพท์"
                            id="input-1"
                            @keypress="onlyNumber"
                            required
                          ></b-form-input>
                        </b-form-group>
                      </v-col>
                    </v-flex>
                    <v-flex xs6>
                      <v-col>
                        <b-form-group
                          id="input-group-1"
                          label="*นามสกุล"
                          label-for="input-1"
                        >
                          <b-form-input
                            v-model="form.lastname"
                            placeholder="กรอกนามสกุล"
                            id="input-1"
                            required
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                          id="input-group-1"
                          label="*อีเมล์"
                          label-for="input-1"
                        >
                          <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="กรอกอีเมล์"
                          ></b-form-input>
                        </b-form-group>
                      </v-col>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-container>
                      <b-form-group
                        id="input-group-1"
                        label="ระบุความต้องการเพิ่มเติม"
                        label-for="input-1"
                      >
                        <b-form-textarea
                          v-model="form.info"
                          id="textarea"
                          placeholder="กรุณากรอกรายละเอียดเพิ่มเติมได้ที่นี่"
                          rows="3"
                          max-rows="6"
                        ></b-form-textarea>
                      </b-form-group>
                    </v-container>
                  </v-layout>
                </v-container>
              </v-card>
              <!-- <b-button type="submit" variant="primary">ส่งใบเสนอราคา</b-button> -->
              <!-- <v-btn color="primary" @click="e1 = 1">ส่งใบเสนอราคา</v-btn> -->

              <!-- <v-btn>ย้อนกลับ</v-btn> -->
              <v-layout row>
                <v-flex xs6 :style="{ paddingLeft: '20px' }">
                  <v-btn text @click="e1 = 2">ย้อนกลับ</v-btn>
                </v-flex>
                <v-flex
                  xs6
                  class="text-right"
                  :style="{ paddingRight: '20px' }"
                >
                  <b-button type="submit" variant="primary"
                    >ส่งใบเสนอราคา</b-button
                  >
                </v-flex>
              </v-layout>
            </b-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/th";
import { format, parseISO } from "date-fns";
import loading from "@/components/loading/loading";
// import ThailandAutoComplete from "vue-thailand-address-autocomplete";

export default {
  components: {
    // ThailandAutoComplete
    loading
  },
  props: ["quatationid"],
  data() {
    return {
      loadingme: false,
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      district: "",
      amphoe: "",
      province: "",
      zipcode: "",
      addressinfo: "",
      dialog: false,
      date: parseISO(new Date().toISOString()),
      q_date: "",
      lastquaid: 0,
      q_time: "",
      show: true,
      dis: false,
      lastquaid: 0,
      zipcodenull: "",
      form: {
        productid: "",
        productname: "",
        name: "",
        lastname: "",
        phone: "",
        unittype: "",
        email: "",
        addressd: "",
        square: "",
        quantity: "",
        info: "",
        unit: ""
      },
      quantity: "",
      e1: 1,

      items: [
        {
          text: "หน้าหลัก",
          disabled: false,
          to: "/"
        },
        {
          text: "ติดต่อขอรับใบเสนอราคา",
          disabled: false,
          to: "/quatation/quatation_form"
        }
      ],
      emailRules: [
        v => !!v || "กรุณากรอกข้อมูลให้กรบถ้วน",
        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "อีเมล์ของท่านไม่ถูกต้อง"
      ]
    };
  },
  created() {
    this.form.productid = this.$route.params.pidq;
    this.form.productname = this.$route.params.pnameq;
    this.form.unit = this.$route.params.punitq;
     this.form.email = this.$nuxt.$auth.user[0].email;
     this.form.phone = this.$nuxt.$auth.user[0].phone;
  },

  methods: {
    mergeaddress() {
      if (this.zipcodenull == null || this.zipcodenull == "") {
        this.form.addressd =
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
        console.log(this.form.addressd);
      } else {
        this.form.addressd =
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
        console.log(this.form.addressd);
      }
    },
    alert() {
      this.coloralert = "red";
      (this.alertstatus = true),
        (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
    },
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
    check() {
      this.dialog = true;
    },
    async insert() {
      this.loadingme = true;
      if (
        this.form.name == "" ||
        this.form.name == undefined ||
        this.form.name == null ||
        this.form.lastname == "" ||
        this.form.lastname == undefined ||
        this.form.lastname == null ||
        this.form.phone == "" ||
        this.form.phone == undefined ||
        this.form.phone == null ||
        this.form.email == "" ||
        this.form.email == undefined ||
        this.form.email == null
      ) {
        this.alert();
      } else if (
        this.form.productid == "" ||
        this.form.productid == undefined ||
        this.form.productid == null ||
        this.form.productname == "" ||
        this.form.productname == undefined ||
        this.form.productname == null
      ) {
        this.e1 = 1;
      } else {
        if (this.form.unit === "JOB") {
          this.form.unittype = "ตารางเมตร";
        } else {
          this.form.unittype = this.form.unit;
        }

        this.status = "กำลังดำเนินการ";
        this.q_date = moment(this.date).format("dddd,DD-MMMM-YYYY");
        this.q_time = moment(this.date).format("HH.mm.ss");

        let res = await this.$http.post("/q_normal/insert", {
          qNormalName: this.form.name,
          qNormalUserid: this.$nuxt.$auth.user[0].userid,
          qNormalLast: this.form.lastname,
          qNormalPhone: this.form.phone,
          qNormalEmail: this.form.email,
          qNormalAddressDelivery: this.form.addressd,
          qNormalProductname: this.form.productname,
          qNormalProductid: this.form.productid,
          qNormalQuantity: this.form.quantity,
          qNormalUnittype: this.form.unittype,
          qNormalSquaremetre: this.form.square,
          qNormalDate: this.q_date,
          qNormalTime: this.q_time,
          qNormalInfo: this.form.info,
          qNormalStatus: this.status
        });
        console.log(res);
        if (!res.data.ok) {
          console.log("เพิ่มข้อมูลสินค้าไม่สำเร็จ");
        } else {
          this.lastquaid = res.data.lastid[0];
          console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
          this.lastquaid = res.data.lastid[0];
          this.loadingme = false;
          this.$router.push({
            name: "quatation-detail-quan",
            params: { quaid: this.lastquaid }
          });
        }
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
      console.log("info", this.form.info);
      if (evt.isTrusted) {
        this.insert();
      }
      this.dialog = true;
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.addressq = "";

      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    }
  }
};
</script>

<style>
.ml-10.square-input {
  height: 57px;
}
.quantity-input {
  padding-top: 15px;
}
.space {
  padding-top: 15px;
  padding-left: 20px;
}

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
