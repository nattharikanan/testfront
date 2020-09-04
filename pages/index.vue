<template>
  <v-app>
    <v-container>
      <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:require('@/assets/image/sh1.jpg')
        },
        {
             src:require('@/assets/image/sh2.png')
        },
  
        {
          
             src:require('@/assets/image/sh3.jpg')
        },
  
        {
         
             src:require('@/assets/image/sh4.jpg')
        },
      
      ]
    };
  }
};
</script>