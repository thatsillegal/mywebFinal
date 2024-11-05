<template>
  <div class="wrapper" ref="wrapper">
    <WorkItem class="work-item" ref="work-item" v-for="workitem in workItems" :key="workitem.title"
      :title="workitem.title" :description="workitem.description" :src="workitem.coverSrc"
      @click="openModal(workitem)" />

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
import Masonry from "masonry-layout";

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
      currentIndex: 0,
      masonryInstance: null,
    };
  },
  async created() {
    // 调用函数加载图片并存储图片名和路径
    await this.loadWorks();
  },
  mounted() {
    // 监听窗口大小变化以调整 Masonry 布局
    window.addEventListener("resize", this.resizeMasonry);
  },
  updated() {
    // 初始化 Masonry 实例
    this.masonryInstance = new Masonry(this.$refs.wrapper, {
      itemSelector: ".work-item",
      columnWidth: ".work-item",
      gutter: 5,
      percentPosition: true,
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeMasonry);
  },
  computed: {
    currentItem() {
      return this.selectedWorkItem?.items[this.currentIndex] || null;
    }
  },
  methods: {
    async loadWorks() {
      const folderModules = import.meta.glob('@/assets/works/*/*.{png,jpg,jpeg,svg,stl,obj,gltf,glb}');
      const workItems = {};

      await Promise.all(Object.keys(folderModules).map(async (path) => {
        const parts = path.split('/');
        const folderName = parts[parts.length - 2];
        const fileName = parts.pop().replace(/\.\w+$/, '');

        const [workTitle, workDescription] = folderName.split('_');
        const [name, description] = fileName.split('_');

        if (!workItems[folderName]) {
          workItems[folderName] = {
            title: workTitle,
            description: workDescription,
            items: [],
            coverSrc: ''
          };
        }

        const fileModule = await folderModules[path]();
        const item = {
          name,
          description,
          src: fileModule.default,
          type: path.endsWith('.stl') || path.endsWith('.obj') || path.endsWith('.glb') || path.endsWith('.gltf') ? '3D' : 'image'
        };

        workItems[folderName].items.push(item);
        if (!workItems[folderName].coverSrc && item.type != "3D") {
          workItems[folderName].coverSrc = item.src;
        }
      }));

      this.workItems = Object.values(workItems);
      this.$nextTick(() => {
        this.masonryInstance.layout(); // 在数据加载完成后重新布局
      });
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
    resizeMasonry() {
      if (this.masonryInstance) {
        this.masonryInstance.layout();
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  left: 10px;
  top: 30px;
  width: 100%;
  /* 这里的 grid 相关样式可以移除，Masonry 会处理布局 */
}

.work-item {
  width: 18%;
  margin: 5px;
  /* 可选，根据需要调整 */
}

@media screen and (max-width: 768px) {
  .work-item {
    width: 48%;
    margin:3px;
  }
}

@media screen and (max-width: 480px) {
  .work-item {
    width: 98%;
    margin: 10px;
  }
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
  padding: 10px;
  width: 90vw;
  height: 80vh;
  display: flex;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.616);
  border-radius: 10px;
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
.nav-button-prev {
  position: absolute;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  left: 5%;
  top: 50%;
  color: grey;
}

.nav-button-next {
  position: absolute;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  top: 50%;
  right: 5%;
  color: grey;
}

/* 右侧：描述或菜单栏容器 */
.description-container {
  width: 25%;
  padding: 30px 30px 10px 10px;
  overflow-y: auto;
}
</style>
