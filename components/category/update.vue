<template>
  <div>
    <v-snackbar
      :color="coloralert"
      v-model="alertstatus"
      :timeout="timeout"
      top=""
    >
      {{ alertMessage }}
    </v-snackbar>
    <v-dialog v-model="show" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            แก้ไขประเภทสินค้า
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.categoryname"
                  required
                  label="ชื่อประเภทสินค้า"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="updateCategory()"
            >บันทึก</v-btn
          >
          <v-btn
            color="blue darken-1"
            rounded
            :style="{ color: 'white' }"
            @click="() => $emit('close')"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      default: false
    },
    sendvalue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      regisstatus: "",
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
      dialog: false,
      form: {
        categoryid: "",
        categoryname: ""
      }
    };
  },
  watch: {
    show() {
      this.form = this.sendvalue;
    }
  },
  computed: {
    show() {
      return this.toggle;
    }
  },

  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/categories");
  },

  methods: {
    async updateCategory() {
      //update ประเภทสินค้า
      this.dialog = true;
      let res = await this.$http.post("/categories/update", {
        categoryid: this.form.categoryid,
        categoryname: this.form.categoryname
      });
      if (!res.data.ok) {
        this.coloralert = "red";
        (this.alertstatus = true),
          (this.alertMessage = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        this.coloralert = "red";
        (this.alertstatus = true), (this.alertMessage = "แก้ไขข้อมูลถูกต้อง");
        this.$emit("close");
      }
    },
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid }
      });
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style></style>
