<template>
  <div>
    <v-snackbar :color="coloralert" :value="alertstatus" :timeout="timeout" top>{{ alertMessage }}</v-snackbar>

    <v-dialog v-model="showthis" persistent max-width="350">
      <v-card>
        <v-card-title>ต้องการลบใบเสนอราคาใช่หรือไม่?</v-card-title>
        <!-- เช็คก่อนออกจากระบบ -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deletequa(delete_id)">ใช่</v-btn>
          <v-btn
            color="red darken-1"
            rounded
            :style="{color:'white'}"
            @click="() => $emit('closed')"
          >ไม่ใช่</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    deletetoggle: {
      type: Boolean,
      default: false,
    },
    delete_id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialog: false,
      quaid: "",
      coloralert: "",
      alertstatus: false,
      alertMessage: "",
      timeout: 2000,
    };
  },
  watch: {
    show() {
      this.quaid = this.delete_id;
    },
  },
  computed: {
    showthis() {
      return this.deletetoggle;
    },
  },
  methods: {
    async deletequa(qid) {
      console.log("qid", qid);
      let res = await this.$http.post("/q_personal/delete", {
        qPersonalId: qid,
      });
      if (!res.data.ok) {
        console.log("ลบข้อมูลสินค้าไม่สำเร็จ");
        this.alertstatus = true;
        (this.coloralert = "red lighten-2"),
          //   (this.iconalert = "mdi mdi-checkbox-marked-circle"),
          (this.alertMessage = "ลบสินค้าไม่สำเร็จ");
      } else {
        console.log("ลบข้อมูลสินค้าสำเร็จ");
        this.alertstatus = true;
        (this.coloralert = "green lighten-2"),
          //   (this.iconalert = "mdi mdi-checkbox-marked-circle"),
          (this.alertMessage = "ลบสินค้าสำเร็จ");
        this.$emit("closed");
        this.refreshpage(event);
      }
    },
    refreshpage(event) {
      window.location.reload(true);
    },
  },
};
</script>

<style>
</style>