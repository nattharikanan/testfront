<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title>ท่านต้องการออกใบกำกับภาษีด้วยหรือไม่?</v-card-title>
        <!-- เช็คก่อนออกจากระบบ -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" text @click="without(), $emit('close')"
            >ไม่ต้องการ</v-btn
          >
          <v-btn
            color="green darken-1"
            text
            @click="seconddialog(), $emit('close')"
            >ใช่</v-btn
          >
          <v-btn color="red darken-1" text @click="() => $emit('close')"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ถ้ากดใช่ -->
    <v-dialog v-model="dialog2" persistent max-width="400">
      <v-card>
        <v-card-title class="text-center">
          ท่านต้องการออกใบกำกับภาษีในนามใด ?
          <div :style="{ paddingLeft: '100px' }">
            <v-radio-group v-model="radios" :mandatory="false" row>
              <v-radio label="บุคคล"></v-radio>
              <v-radio label="บริษัท"></v-radio>
            </v-radio-group>
          </div>
        </v-card-title>
        <!-- เช็คก่อนออกจากระบบ -->

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="selecttype(), (dialog2 = false)"
            >ตกลง</v-btn
          >
          <v-btn color="red darken-1" text @click="dialog2 = false"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- แสดงแบบฟอร์ม -->
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
    pidq: {
      type: String,
      default: "",
    },
    pnameq: {
      type: String,
      default: "",
    },
    punitq: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      radios: "",
      dialog2: false,
      form: "",
    };
  },
  watch: {},
  computed: {
    dialog() {
      return this.toggle;
    },
  },
  methods: {
    selecttype() {
      if (this.radios == 0) {
        console.log("บุคคล");
        this.form = 2;

        this.$emit("submited", this.pidq, this.form, this.pnameq, this.punitq);
      } else if (this.radios == 1) {
        console.log("บริษัท");
        this.form = 3;

        this.$emit("submited", this.pidq, this.form, this.pnameq, this.punitq);
      }
    },
    seconddialog() {
      this.dialog2 = true;
    },
    without() {
      this.form = 1;
      this.$emit("submited", this.pidq, this.form, this.pnameq, this.punitq);
    },
  },
};
</script>

<style></style>
