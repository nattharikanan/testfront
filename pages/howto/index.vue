<template>
  <v-app class="howto">
    <v-container>
      <v-img :src="image_src"></v-img>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      image_src: require("../../assets/image/howto.jpg")
    };
  }
};
</script>

<style>
.howto {
  background-image: url("../../assets/image/howto.jpg");
}
</style>
