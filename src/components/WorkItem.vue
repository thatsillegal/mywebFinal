<template>
  <v-lazy>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="img"
        width="250px"
        max-height="500px"
        :src= "src"
      >
        <v-card-subtitle class="description-overlay"> {{ description }}</v-card-subtitle>
      </v-img>

      <v-card-title class="title"> {{title}} </v-card-title>
    </v-card>
  </v-lazy>

</template>
  
<script>
  export default {
    props:{
      title: {
        type:String,
        required:true
      },
      description:{
        type:String,
        default:"..."
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
  .img:hover .description-overlay{
    opacity:1; /* 鼠标悬停时显示 */
  }
  .description-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6); /* 半透明背景 */
    color: white;
    padding: 10px;
    opacity: 0; /* 默认隐藏 */
    transition: opacity 0.3s ease-in-out; /* 添加平滑过渡效果 */
  }
</style>
  