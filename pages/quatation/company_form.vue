<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
          {{
          item.text.toUpperCase()
          }}
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
                  <h4 class="text-center" :style="{paddingTop:'15px'}">ติดต่อขอใบเสนอราคา</h4>
                </u>

                <v-container>
                  <b-form-group id="input-group-1" label="รหัสสินค้า" label-for="input-1">
                    <b-form-input v-model="form.productid" id="input-1" required disabled></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-1" label="ชื่อสินค้า" label-for="input-1">
                    <b-form-input v-model="form.productname" disabled id="input-1" required></b-form-input>
                  </b-form-group>

                  <v-row class="ml-1">
                    <b-form-group
                      class="w"
                      id="input-group-1"
                      label="จำนวนที่ต้องการ"
                      label-for="input-1"
                    ></b-form-group>
                    <b-form-input
                      class="ml-10"
                      id="input-1"
                      type="number"
                      v-model="form.quantity"
                      name="test"
                      min="1"
                      oninput="validity.valid||(value='');"
                      required
                    ></b-form-input>
                    <div>
                      <v-flex xs6>
                        <v-select
                          class="ml-4"
                          height="1"
                          v-model="form.unittype"
                          :items="unit"
                          item-text="text"
                          item-value="text"
                          solo
                          filled
                          label="เลือก"
                          :rules="[(v) => !!v || 'กรุณาเลือกหน่วย']"
                          required
                        ></v-select>
                      </v-flex>
                    </div>
                  </v-row>
                  <v-row class="ml-1">
                    <b-form-group
                      class="w"
                      id="input-group-1"
                      label="หรือขนาดพื้นที่ที่ต้องการใช้สินค้า"
                      label-for="input-1"
                    ></b-form-group>
                    <b-form-input
                      class="ml-10"
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
                </v-container>
              </v-card>

              <v-layout row>
                <v-flex xs6 :style="{paddingLeft:'20px'}">
                  <v-btn text>ยกเลิก</v-btn>
                </v-flex>
                <v-flex xs6 class="text-right" :style="{paddingRight:'20px'}">
                  <div v-if="form.square != '' || form.quantity != ''">
                    <v-btn color="primary" @click="(e1 = 2)">ถัดไป</v-btn>
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
              <v-card class="mb-12" color="blue lighten-5" full-height="900px">
                <u>
                  <h4 class="text-center" :style="{paddingTop:'15px'}">ที่อยู่สำหรับการจัดส่ง</h4>
                </u>

                <v-container>
                  <b-form-group id="input-group-1" label="ที่อยู่" label-for="input-1">
                    <b-form-textarea
                      required
                      type="text"
                      v-model="form.addressd"
                      placeholder="กรุณาระบุที่อยู่ในชัดเจน"
                      rows="3"
                      max-rows="6"
                    ></b-form-textarea>
                  </b-form-group>

                  <!-- <b-form-group id="input-group-1" label="เบอร์โทรที่ติดต่อได้ :"></b-form-group> -->
                </v-container>
              </v-card>

              <!-- <v-btn color="primary" @click="e1 = 3">ถัดไป</v-btn>

              <v-btn text @click="e1 = 1">ย้อนกลับ</v-btn>-->
              <v-layout row>
                <v-flex xs6 :style="{paddingLeft:'20px'}">
                  <v-btn text @click="e1 = 1">ยกเลิก</v-btn>
                </v-flex>
                <v-flex xs6 class="text-right" :style="{paddingRight:'20px'}">
                  <!-- <v-btn color="primary" @click="test(), (e1 = 3)">ถัดไป</v-btn> -->
                  <div v-if="form.addressd != ''">
                    <v-btn color="primary" @click="(e1 = 3)">ถัดไป</v-btn>
                  </div>
                  <div v-else>
                    <b-button type="submit" variant="primary">ถัดไป</b-button>
                  </div>
                </v-flex>
              </v-layout>
            </b-form>
          </v-stepper-content>

          <v-stepper-content step="3">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <v-card class="mb-12" color="blue lighten-5" full-height="900px">
                <u>
                  <h4 class="text-center" :style="{paddingTop:'15px'}">ออกใบกำกับภาษีประเภทบริษัทฯ</h4>
                </u>
                <v-container>
                  <v-layout row>
                    <v-flex xs6>
                      <v-col>
                        <b-form-group
                          id="input-group-1"
                          label="*ชื่อผู้ส่งซื้อ"
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
                          label="*เบอร์โทรศัพท์ผู้สั่งซื้อ"
                          label-for="input-1"
                        >
                          <b-form-input
                            v-model="form.phone"
                            placeholder="กรอกเบอร์โทรศัพท์ผู้สั่งซื้อ"
                            id="input-1"
                            @keypress="onlyNumber"
                            required
                            maxlength="10"
                          ></b-form-input>
                        </b-form-group>
                      </v-col>
                    </v-flex>
                    <v-flex xs6>
                      <v-col>
                        <b-form-group
                          id="input-group-1"
                          label="*นามสกุลผู้สั่งซื้อ"
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
                          label="*อีเมล์ผู้สั่งซื้อ"
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
                    <v-col>
                      <v-flex xs12>
                        <b-form-group id="input-group-1" label="*ชื่อบริษัท" label-for="input-1">
                          <b-form-input
                            v-model="form.companyname"
                            placeholder="ระบุชื่อบริษัท"
                            id="input-1"
                            required
                          ></b-form-input>
                        </b-form-group>
                      </v-flex>
                    </v-col>
                    <v-col>
                      <v-flex xs12>
                        <b-form-group
                          id="input-group-1"
                          label="*หมายเลขสำนักงานใหญ่/สาขา"
                          label-for="input-1"
                        >
                          <b-form-input
                            v-model="form.companyid"
                            placeholder="กรณีเป็นสำนักงานใหญ่ให้ระบุ 000 ถึง 999"
                            @keypress="onlyNumber"
                            id="input-1"
                            required
                          ></b-form-input>
                        </b-form-group>
                      </v-flex>
                    </v-col>
                  </v-layout>
                  <v-layout row>
                    <v-container>
                      <v-flex xs12>
                        <b-form-group
                          id="input-group-1"
                          label="*เลขประจำตัวผู้เสียภาษีอากร"
                          label-for="input-1"
                        >
                          <b-form-input
                            v-model="form.tax"
                            placeholder="กรอกเลขประจำตัวผู้เสียภาษีอาการ"
                            id="input-1"
                            @keypress="onlyNumber"
                            required
                          ></b-form-input>
                        </b-form-group>
                      </v-flex>
                    </v-container>
                  </v-layout>
                  <v-layout row>
                    <v-container>
                      <b-form-group id="input-group-1" label="*ที่อยู่" label-for="input-1">
                        <b-form-textarea
                          v-model="form.addressq"
                          id="textarea"
                          placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"
                          rows="3"
                          max-rows="6"
                          :disabled="dis"
                        ></b-form-textarea>
                      </b-form-group>
                      <v-checkbox v-model="checkbox1" label="ที่อยู่เดียวกับที่จัดส่ง" />
                    </v-container>
                  </v-layout>
                </v-container>
              </v-card>
              <!-- <b-button type="submit" variant="primary">ส่งใบเสนอราคา</b-button> -->
              <!-- <v-btn color="primary" @click="e1 = 1">ส่งใบเสนอราคา</v-btn> -->

              <!-- <v-btn>ย้อนกลับ</v-btn> -->
              <v-layout row>
                <v-flex xs6 :style="{paddingLeft:'20px'}">
                  <v-btn text @click="e1 = 1">ยกเลิก</v-btn>
                </v-flex>
                <v-flex xs6 class="text-right" :style="{paddingRight:'20px'}">
                  <b-button type="submit" variant="primary" @click="insert()">ส่งใบเสนอราคา</b-button>
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
export default {
  props: ["quatationid"],
  data() {
    return {
      lastquaid: 0,
      checkbox1: false,
      date: parseISO(new Date().toISOString()),
      q_date: "",
      q_time: "",
      show: true,
      dis: false,
      form: {
        name: "",
        lastname: "",
        phone: "",
        companyname: "",
        companyid: "",
        tax: "",
        email: "",
        addressq: "",
        square: "",
        quantity: "",
        addressd: "",
        unittype: "",
        productid: "",
        productname: "",
      },

      unit: [
        {
          text: "หน่วย",
        },
        {
          text: "ชิ้น",
        },
        {
          text: "อัน",
        },
      ],
      status: "",

      e1: 1,
      items: [
        {
          text: "หน้าหลัก",
          disabled: false,
          to: "/",
        },
        {
          text: "ติดต่อขอรับใบเสนอราคา",
          disabled: false,
          to: "/quatation/quatation_form",
        },
      ],
      emailRules: [
        (v) => !!v || "กรุณากรอกข้อมูลให้กรบถ้วน",
        (v) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "อีเมล์ของท่านไม่ถูกต้อง",
      ],
    };
  },
  created() {
    this.form.productid = this.$route.params.pidq;
    this.form.productname = this.$route.params.pnameq;
  },
  watch: {
    checkbox1: {
      handler() {
        if (this.checkbox1 == true) {
          this.dis = true;
        } else {
          this.dis = false;
        }
      },
    },
  },

  methods: {
    async insert() {
      console.log("insert");
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
        this.form.email == null ||
        this.form.companyname == "" ||
        this.form.companyname == undefined ||
        this.form.companyname == null ||
        this.form.companyid == "" ||
        this.form.companyid == undefined ||
        this.form.companyid == null
      ) {
        window.alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else if (
        this.form.productid == "" ||
        this.form.productid == undefined ||
        this.form.productid == null ||
        this.form.productname == "" ||
        this.form.productname == undefined ||
        this.form.productname == null ||
        this.form.unittype == "" ||
        this.form.unittype == undefined ||
        this.form.unittype == null
      ) {
        this.e1 = 1;
      } else {
        if (this.checkbox1 == true) {
          this.form.addressq = this.form.addressd;
        }
        this.status = "กำลังดำเนินการ";
        this.q_date = moment(this.date).format("dddd,DD-MMMM-YYYY");
        this.q_time = moment(this.date).format("HH.mm.ss");
        console.log("bofore indert", this.form.productname);
        let res = await this.$http.post("/q_company/insert", {
          qCompanyName: this.form.name,
          qCompanyUserid: this.$nuxt.$auth.user[0].userid,
          qCompanyLast: this.form.lastname,
          qCompanyPhone: this.form.phone,
          qCompanyEmail: this.form.email,
          qCompanyCompanyname: this.form.companyname,
          qCompanyCompanyid: this.form.companyid,
          qCompanyAddressDelivery: this.form.addressd,
          qCompanyAddress: this.form.addressq,
          qCompanyProductname: this.form.productname,
          qCompanyProductid: this.form.productid,
          qCompanyQuantity: this.form.quantity,
          qCompanyUnittype: this.form.unittype,
          qCompanySquaremetre: this.form.square,
          qCompanyDate: this.q_date,
          qCompanyTime: this.q_time,
          qCompanyStatus: this.status,
        });
        if (!res.data.ok) {
          console.log("เพิ่มข้อมูลสินค้าไม่สำเร็จ");
          window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
        } else {
          this.lastquaid = res.data.lastid[0];
          console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
          window.alert("Insert Successful!");
          this.$router.push({
            name: "quatation-detail-quac",
            params: { quaid: this.lastquaid },
          });
        }
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
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
    },
  },
};
</script>

<style>
.w {
  padding-top: 15px;
}
.ml-10 {
  height: 57px;
}
.space {
  padding-top: 15px;
  padding-left: 20px;
}
</style>
