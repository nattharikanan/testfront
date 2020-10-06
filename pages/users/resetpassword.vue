<template>
  <div>
    name :'reset password' <br />
    query :{{ JSON.stringify($route.query) }}
    <v-text-field v-model="newpass"></v-text-field>
    <v-btn color="primary" @click="resetpass()">ยืนยัน</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newpass: "",
      token: ""
    };
  },
  methods: {
    async resetpass() {
      let res = await this.$http.post("/users/resetpassword", {
        newPass: this.newpass,
        token: this.token
      });
    }
  }
};
</script>

<style></style>
