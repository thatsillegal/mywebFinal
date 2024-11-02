<template>
  <div class="wrapper">
    <WorkItem
      v-for="workitem in workItems"
      :key="workitem.title"
      :title="workitem.title"
      :description="workitem.description"
      :src="workitem.coverSrc"
      @click="openModal(workitem)"
    />

    <!-- 弹窗模态框 -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal"> 
      <div class="modal-content">  
        <button class="close-button" @click="closeModal">✕</button> 

        <div class="model-viewer-container">
          <button @click="prevItem" class="nav-button-prev">◀</button>

          <!-- 3D 模型或图片展示区域 -->
          <ModelViewer v-if="currentItem && currentItem.type === '3D'" :modelPath="currentItem.src" />
          <img v-else-if="currentItem && currentItem.type === 'image'" v-lazy="currentItem.src" alt="Image"
            class="image-view" />

          <button @click="nextItem" class="nav-button-next">▶</button>
        </div>

        <!-- 右侧：描述或菜单栏区域 -->
        <div class="description-container">
          <h3>{{ selectedWorkItem.title }}</h3>
          <p>{{ selectedWorkItem.description }}</p>
          <h4>{{ currentItem.name }}</h4>
          <p>{{ currentItem.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkItem from "@/components/WorkItem.vue";
import ModelViewer from "@/components/ModelViewer.vue";

export default {
  components: {
    WorkItem,
    ModelViewer,
  },
  data() {
    return {
      workItems: [],
      isModalOpen: false,
      selectedWorkItem: null,
      currentIndex: 0
    };
  },
  async created() {
    // 调用函数加载图片并存储图片名和路径
    await this.loadWorks();
  },
  computed: {
    currentItem() {
      return this.selectedWorkItem?.items[this.currentIndex] || null;
    }
  },
  methods: {
    async loadWorks() {
      // 动态导入 works 文件夹中的所有作品子文件夹内容
      const folderModules = import.meta.glob('@/assets/works/*/*.{png,jpg,jpeg,svg,stl,obj, gltf, glb}');

      // 遍历每个文件路径
      const workItems = {};

      await Promise.all(Object.keys(folderModules).map(async (path) => {
        const parts = path.split('/');
        const folderName = parts[parts.length - 2]; // 获取作品文件夹名
        const fileName = parts.pop().replace(/\.\w+$/, ''); // 获取文件名并去除扩展名

        // 提取作品名称和说明文字
        const [workTitle, workDescription] = folderName.split('_');
        const [name, description] = fileName.split('_');

        // 初始化作品数据结构
        if (!workItems[folderName]) {
          workItems[folderName] = {
            title: workTitle,
            description: workDescription,
            items: [],
            coverSrc: '' // 初始化封面图片路径
          };
        }

        // 获取文件 URL
        const fileModule = await folderModules[path]();

        // 将文件内容加入作品项
        const item = {
          name,
          description,
          src: fileModule.default,
          type: path.endsWith('.stl') || path.endsWith('.obj') || path.endsWith('.glb') || path.endsWith('.gltf') ? '3D' : 'image'
        };

        workItems[folderName].items.push(item);

        // 如果还没有封面图片且当前文件是图片类型，设置为封面
        if (!workItems[folderName].coverSrc && item.type != "3D") {
          workItems[folderName].coverSrc = item.src;
        }
      }));

      this.workItems = Object.values(workItems);
    },
    openModal(workItem) {
      this.selectedWorkItem = workItem;
      this.currentIndex = 0;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedWorkItem = null;
    },
    nextItem() {
      if (this.selectedWorkItem) {
        this.currentIndex = (this.currentIndex + 1) % this.selectedWorkItem.items.length;
      }
    },
    prevItem() {
      if (this.selectedWorkItem) {
        this.currentIndex =
          (this.currentIndex - 1 + this.selectedWorkItem.items.length) % this.selectedWorkItem.items.length;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
  align-content: flex-start;
  align-items: start;
  gap: 20px;
  padding: 35px 10px 10px 10px;
  overflow-y: auto;
}

/* 模态框覆盖层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 模态框内容 */
.modal-content {
  position: relative;
  background: #fff;
  width: 90vw;
  height: 80vh;
  display: flex;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

/* 左侧：模型或图片容器 */
.model-viewer-container {
  position: relative;
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 图片样式 */
.image-view {
  width: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 导航按钮样式 */
.nav-button-prev{
  position: absolute;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  left: 5%;
  top:50%;
  color: grey;
}

.nav-button-next{
  position: absolute;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  top:50%;
  right:5%;
  color: grey;
}

/* 右侧：描述或菜单栏容器 */ 
.description-container { 
  width: 25%; 
  padding: 30px 30px 10px 10px; 
  overflow-y: auto; 
} 

</style>