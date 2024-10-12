<script>
import WorkItem from "@/components/WorkItem.vue"

export default {
  components:{
    WorkItem
  },

  data() {
    return {
      workItems: [] // 存储图片的名称和路径的数组
    };
  },
  async created() {
    // 调用函数加载图片并存储图片名和路径
    await this.loadImages();
  },
  methods: {
    async loadImages() {
      // 使用 import.meta.glob 动态导入 images 文件夹中的图片
      const imageModules = import.meta.glob('@/assets/worksImages/*.{png,jpg,jpeg,svg}');

      // 等待所有图片路径的 Promise 解析
      const workItems = await Promise.all(
        Object.keys(imageModules).map(async (path) => {
          // 提取文件名（去掉路径前缀和扩展名）
          const fileName = path.split('/').pop().replace(/\.\w+$/, '');
          
          const [name,description] = fileName.split('_');

          // 调用 imageModules[path]() 来获取图片的模块
          const imageModule = await imageModules[path]();

          // 返回一个对象，包含图片的名称和路径
          return {
            title:name,  // 图片文件名
            description: description,
            src: imageModule.default // 获取解析后的图片路径
          };
        })
      );

      // 将结果存储到 workItems 数组中
      this.workItems = workItems;

      console.log('workItems:',workItems)
    }
  }
};
</script>

<template>
  <div class="wrapper">
    <WorkItem v-for="workitem in workItems" v-bind="workitem"/>
  </div>
</template>

<style scoped>
  .wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-content: flex-start;
    align-items:start;
    gap:20px;
    padding:35px 10px 10px 10px; 
  }

  .flex-item{
    background-color: rgb(207, 232, 220);
    border: 2px solid rgb(79, 185, 227);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
  }
</style>
