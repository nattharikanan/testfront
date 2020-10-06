<template>
  <div>
    <v-container class="text-center" fill-height>
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center">
          <v-card max-width="50%" color="blue lighten-5">
            <v-container>
              <b-form>
                <b><h3>ลืมรหัสผ่าน</h3></b>
                <b-input
                  v-model="emailforget"
                  placeholder="กรอกอีเมล์ของท่าน"
                ></b-input>
              </b-form>
            </v-container>
            <v-card-actions>
              <b-button block variant="primary" @click="send">ตกลง</b-button>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailforget: ""
    };
  },
  methods: {
    async send() {
      let res = await this.$http.post("/users/forgetpassword");
    }
  }
};
</script>

<style></style>
