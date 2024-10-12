<template>
  <v-card class="mx-auto" max-width="400" @click="show = !show">
      <v-img
        class="img"
        width="250px"
        max-height="500px"
        :src= "src"
      />
    <v-card-title class="title"> {{title}} </v-card-title>
  </v-card>
</template>
  
<script>
  export default {
    data: () => ({
      show: false,
    }),
    props:{
      title: {
        type:String,
        required:true
      },
      description:{
        type:String,
        default:undefined
      },
      src:{
        default:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      }
    },
  }
</script>

<style scoped>
  .title {
    color:grey;
    text-align: left;
    font-size: 12px;
    font-weight: bold;
  }
  .img {
    object-fit: contain; /* 保持原始比例，图片不会被裁剪 */
  }
</style>
  