<template>
    <v-card class="mx-auto" max-width="400">
      <img
        class="img"
        width="250px"
        max-height="500px"
        v-lazy= "src"
      >
        <v-card-subtitle> {{ description }}</v-card-subtitle>
      </img>

      <v-card-title class="title"> {{title}} </v-card-title>
    </v-card>

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
  .v-card:hover {
    cursor: pointer; 
    transform: translate(-5px,-5px); /* 上浮10像素 */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.852); /* 增强阴影效果 */
  }
  .title {
    color:grey;
    text-align: left;
    font-size: 12px;
    font-weight: bold;
  }
  .img {
    object-fit: contain; /* 保持原始比例，图片不会被裁剪 */
  }
  .v-card:hover .v-card-subtitle{
    opacity:1; /* 鼠标悬停时显示 */
    z-index: 1; /* 置于顶层 */
  }
  .v-card-subtitle {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    opacity: 0; /* 默认隐藏 */
    transition: opacity 0.3s ease-in-out; /* 添加平滑过渡效果 */
  }
</style>
  