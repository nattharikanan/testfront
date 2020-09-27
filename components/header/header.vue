<template>
  <v-card class="header">
    <v-toolbar color="cyan" dark flat>
      <div>
        <v-toolbar-title>
          <div class="logo" />
        </v-toolbar-title>
      </div>

      <!-- มันเป็นค่า array ต้องระบุตำแหน่งแล้วก็เจาะจงลงไป -->
      <div v-if="$auth.loggedIn && $auth.user[0].status == 'user'">
        <!-- ถ้ามีการ login  -->

        <div class="right-user">
          <v-btn text @click="gotoprofile()">
            <v-icon size="20px">mdi-account</v-icon>
            {{ $auth.user[0].email }}
          </v-btn>
          <!-- แสดงค่าชื่อของคนที่ลูกค้าuser -->
          <v-dialog v-model="dialog" persistent max-width="350">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <v-icon left>mdi-exit-to-app</v-icon>ออกจากระบบ
              </v-btn>
            </template>
            <v-card>
              <v-card-title>ท่านต้องการออกจากระบบใช่หรือไม่?</v-card-title>
              <!-- เช็คก่อนออกจากระบบ -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false"
                  >ไม่ใช่</v-btn
                >
                <v-btn
                  color="green darken-1"
                  text
                  @click="$auth.logout(), (dialog = false)"
                  >ใช่</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <div v-else-if="$auth.loggedIn && $auth.user[0].status == 'admin'">
        <!-- ถ้ามีการ login  -->
        <div class="login-admin">
          <!-- <v-icon size="20px">mdi-account</v-icon>
          {{ $auth.user[0].email}}แสดงค่าชื่อของคนที่ลูกค้าuser-->
          <v-btn text v-for="(item, idx) in admin" :key="idx" :to="item.to">
            <v-icon left>mdi-account</v-icon>Admin : จัดการระบบ
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="350">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <v-icon left>mdi-exit-to-app</v-icon>ออกจากระบบ
              </v-btn>
            </template>
            <v-card>
              <v-card-title>ท่านต้องการออกจากระบบใช่หรือไม่?</v-card-title>
              <!-- เช็คก่อนออกจากระบบ -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false"
                  >ไม่ใช่</v-btn
                >
                <v-btn color="green darken-1" text @click="logout()">ใช่</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <div v-else>
        <!-- :style="{marginLeft:'800px'}" -->
        <div class="right">
          <!-- ปุ่มเมนูบาร์ต่างๆ -->
          <v-btn
            color="white"
            text
            v-for="(item, idx) in itembar"
            :key="idx"
            :to="item.to"
            exact
            >{{ item.title }}</v-btn
          >
        </div>
      </div>
      <div
        v-if="$auth.loggedIn && $auth.user[0].status == 'user'"
        @click="$event.stopPropagation()"
      >
        <cart />
      </div>
      <div
        v-if="$auth.loggedIn && $auth.user[0].status == 'user'"
        @click="$event.stopPropagation()"
      >
        <v-icon class="ml-3" @click="gotoquo()" size="25px"
          >mdi-clipboard-text-outline</v-icon
        >
        <!-- <quotation /> -->
      </div>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="(item, idx) in items" :key="idx" :to="item.to" exact>{{
            item.title
          }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </v-card>
</template>

<script>
import cart from "../cart/cart";
import quotation from "../quotation/quotation";

export default {
  components: {
    cart,
    quotation,
  },
  data() {
    return {
      confirm: true,
      dialog: false,
      tab: null,
      admin: [{ to: "/admin/insertp" }],
      user: [{ to: "/users/profile", params: { tabs: 1 } }],
      items: [
        { title: "เกี่ยวกับเรา", to: { name: "index" } },
        { title: "สินค้า", to: { name: "product" } },
        { title: "วิธีการสั่งซื้อ", to: { name: "howto" } },
        { title: "ช่องทางการชำระเงิน", to: { name: "paymentdetail" } },
        { title: "แจ้งชำระเงิน", to: { name: "payment" } },
        { title: "ติดตามพัสดุ", to: { name: "tracking" } },
      ],
      itembar: [
        { title: "เข้าสู่ระบบ", to: { name: "users-login" } },
        { title: "สมัครสมาชิก", to: { name: "users-register" } },
      ],
    };
  },
  computed: {},
  methods: {
    gotoquo() {
      if ($nuxt.$auth.loggedIn == false) {
        this.$router.push("/users/login");
      } else {
        this.$router.push({
          name: "users-profile",
          params: { tabs: 4 },
        });
      }
    },
    gotoprofile() {
      this.$router.push({
        name: "users-profile",
        params: { tabs: 0 },
      });
    },
    logout() {
      this.$store.dispatch("resetState");

      this.$auth.logout();

      if ($nuxt.$auth.loggedIn == false) {
      }
      // this.$store.dispatch("resetState");
      // dialog = false;
    },
  },
};
</script>

<style>
@media print {
  .header {
    visibility: hidden;
  }
  #section-to-print,
  #section-to-print * {
    visibility: visible;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}
@media screen and (min-width: 1300px) and (max-width: 1920px) {
  .test {
    margin-left: 600px;
  }
  .link {
    text-decoration: none;
  }
  .logo {
    font-family: "Kanit";
    width: 100px;
    height: 50px;
    float: left;
    background-image: url("../../assets/image/cpac.png");
    margin-top: 20px;
    margin-left: 40px;
  }
  .right {
    position: relative;
    text-decoration: none;
    margin-left: 1000px;
  }
  .right-user {
    position: relative;
    text-decoration: none;
    margin-left: 1050px;
  }
  .login {
    position: relative;
    text-decoration: none;
    /* margin-left: 600px; */
    padding: 10px;
    font-family: "Kanit";
  }
  .login-admin {
    position: relative;
    text-decoration: none;
    margin-left: 1020px;
    padding: 10px;
  }
  .header {
    color: beige;
    /* position: fixed; */
  }
  .content {
    padding-top: 110px;
  }
}
@media screen and (min-width: 1125px) and (max-width: 1366px) {
  .test {
    margin-left: 600px;
  }
  .link {
    text-decoration: none;
  }
  .logo {
    font-family: "Kanit";
    width: 100px;
    height: 50px;
    float: left;
    background-image: url("../../assets/image/cpac.png");
    margin-top: 20px;
    margin-left: 40px;
  }
  .right {
    position: relative;
    text-decoration: none;
    margin-left: 850px;
  }
  .right-user {
    position: relative;
    text-decoration: none;
    margin-left: 700px;
  }
  .login {
    position: relative;
    text-decoration: none;
    margin-left: 600px;
    padding: 10px;
    font-family: "Kanit";
  }
  .login-admin {
    position: relative;
    text-decoration: none;
    margin-left: 800px;
    padding: 10px;
  }
  .header {
    /* position: relative; */
    color: beige;
    /* position: fixed; */
  }
}
@media screen and (max-width: 1125px) {
  .test {
    margin-left: 600px;
  }
  .link {
    text-decoration: none;
  }
  .logo {
    font-family: "Kanit";
    width: 100px;
    height: 50px;
    float: left;
    background-image: url("../../assets/image/cpac.png");
    margin-top: 20px;
    margin-left: 40px;
  }
  .right {
    position: relative;
    text-decoration: none;
    margin-left: 550px;
    padding: 10px;
  }
  .right-user {
    position: relative;
    text-decoration: none;
    margin-left: 450px;
  }
  .login {
    position: relative;
    text-decoration: none;
    margin-left: 600px;
    padding: 10px;
    font-family: "Kanit";
  }
  .login-admin {
    position: relative;
    text-decoration: none;
    margin-left: 450px;
    padding: 10px;
  }
  .header {
    /* position: relative; */
    color: beige;
  }
}
</style>
