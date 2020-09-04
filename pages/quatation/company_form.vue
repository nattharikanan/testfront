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
                    <b-form-input v-model="productid" id="input-1" required disabled></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-1" label="ชื่อสินค้า" label-for="input-1">
                    <b-form-input v-model="productname" disabled id="input-1" required></b-form-input>
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
                      v-model="form.addressq"
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
                  <div v-if="form.addressq != ''">
                    <v-btn color="primary" @click="test(), (e1 = 3)">ถัดไป</v-btn>
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
                          <b-form-input placeholder="กรอกชื่อ" id="input-1" required></b-form-input>
                        </b-form-group>
                        <b-form-group
                          id="input-group-1"
                          label="*เบอร์โทรศัพท์ผู้สั่งซื้อ"
                          label-for="input-1"
                        >
                          <b-form-input
                            placeholder="กรอกเบอร์โทรศัพท์ผู้สั่งซื้อ"
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
                          label="*นามสกุลผู้สั่งซื้อ"
                          label-for="input-1"
                        >
                          <b-form-input placeholder="กรอกนามสกุล" id="input-1" required></b-form-input>
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
                          <b-form-input placeholder="ระบุชื่อบริษัท" id="input-1" required></b-form-input>
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
                  <b-button type="submit" variant="primary">ส่งใบเสนอราคา</b-button>
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
export default {
  props: ["quatationid"],
  data() {
    return {
      checkbox1: false,
      show: true,
      dis: false,
      form: {
        email: "",
        addressq: "",
        square: "",
        quantity: "",
      },
      quantity: "",
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
    this.productid = this.$route.params.pidq;
    this.productname = this.$route.params.pnameq;
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
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form));
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
    test() {
      console.log("test", this.quantity);
      //เช็คค่าว่าง
    },
  },
};
</script>

<style></style>
