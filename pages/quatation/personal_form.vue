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
                    <b-form-input v-model="form.productname" id="input-1" required disabled></b-form-input>
                  </b-form-group>

                  <v-row class="ml-1">
                    <b-form-group id="input-group-1" label="จำนวนที่ต้องการ" label-for="input-1"></b-form-group>
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
                    <b-dropdown id="dropdown-1" text="หน่วย" >
                      <b-dropdown-item :item="unit"></b-dropdown-item>
                    </b-dropdown>
                  </v-row>
                  <v-row class="ml-1">
                    <b-form-group
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
                  <h4
                    class="text-center"
                    :style="{paddingTop:'15px'}"
                  >ออกใบกำกับภาษีประเภทบุคคลธรรมดา</h4>
                </u>
                <v-container>
                  <v-layout row>
                    <v-flex xs6>
                      <v-col>
                        <b-form-group id="input-group-1" label="*ชื่อ" label-for="input-1">
                          <b-form-input
                            v-model="form.name"
                            placeholder="กรอกชื่อ"
                            id="input-1"
                            required
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-1" label="*เบอร์โทรศัพท์" label-for="input-1">
                          <b-form-input
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
                        <b-form-group id="input-group-1" label="*นามสกุล" label-for="input-1">
                          <b-form-input
                            v-model="form.lastname"
                            placeholder="กรอกนามสกุล"
                            id="input-1"
                            required
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-1" label="*อีเมล์" label-for="input-1">
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
                      <v-flex xs12>
                        <b-form-group
                          id="input-group-1"
                          label="*หมายเลขบัตรประจำตัวประชาชน"
                          label-for="input-1"
                        >
                          <b-form-input
                            placeholder="หมายเลขบัตรประจำตัวประชาชน 13 หลัก"
                            id="input-1"
                            @keypress="onlyNumber"
                            maxlength="13"
                            required
                            v-model="form.cardid"
                          ></b-form-input>
                        </b-form-group>
                      </v-flex>
                    </v-container>
                  </v-layout>
                  <v-layout row>
                    <v-container>
                      <b-form-group id="input-group-1" label="*ที่อยู่" label-for="input-1">
                        <b-form-textarea
                          id="textarea"
                          placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"
                          rows="3"
                          max-rows="6"
                          :disabled="dis"
                          v-model="form.addressq"
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
                  <b-button type="submit" @click="insert()" variant="primary">ส่งใบเสนอราคา</b-button>
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
      checkbox1: false,
      date: parseISO(new Date().toISOString()),
      q_date: "",
      q_time: "",
      show: true,
      dis: false,
      form: {
        productid: "",
        productname: "",
        name: "",
        lastname: "",
        addressd: "",
        email: "",
        addressq: "",
        quantity: "",
        square: "",
        quantity: "",
        cardid: "",
      },
      unit: ["หน่วย", "ชิ้น", "อัน"],

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
  created() {
    this.form.productid = this.$route.params.pidq;
    this.form.productname = this.$route.params.pnameq;
  },

  methods: {
    async insert() {
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
        this.form.cardid == "" ||
        this.form.cardid == undefined ||
        this.form.cardid == null
      ) {
        window.alert("กรุณากรอกข้อมูลให้ครบถ้วน");
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
        if (this.checkbox1 == true) {
          this.addressq = this.addressd;
        }
        this.status = "กำลังดำเนินการ";
        this.q_date = moment(this.date).format("dddd,DD-MMMM-YYYY");
        this.q_time = moment(this.date).format("HH.mm.ss");
        let res = await this.$http.post("/q_personal/insert", {
          qPersonalName: this.form.name,
          qPersonalLast: this.form.lastname,
          qPersonalPhone: this.form.phone,
          qPersonalEmail: this.form.email,
          qPersonalIdcard: this.form.cardid,
          qPersonalAddressDelivery: this.form.addressd,
          qPersonalAddress: this.form.addressq,
          qPersonalProductname: this.form.productname,
          qPersonalProductid: this.form.productid,
          qPersonalQuantity: this.form.quantity,
          qPersonalSquaremetre: this.form.square,
          qPersonalDate: this.q_date,
          qPersonalTime: this.q_time,
          qPersonalStatus: this.status,
        });
        if (!res.data.ok) {
          console.log("เพิ่มข้อมูลสินค้าไม่สำเร็จ");
          window.alert("กรุณากรอกข้อมูลให้ถูกต้อง");
        } else {
          console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
          <v-alert type="success">เพิ่มข้อมูลสินค้าสำเร็จ</v-alert>;
          window.alert("Insert Successful!");
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

<style></style>
