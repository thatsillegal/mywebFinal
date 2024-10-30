<template>
  <div ref="modelContainer" class="model-container"></div>
</template>

<script>
import { initThreeScene } from "@/utils/threeHelper.js";

export default {
  name: "ModelViewer",
  props: {
    modelPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      threeInstance: null,
    };
  },
  mounted() {
    // 调用 three.js 的初始化函数
    this.threeInstance = initThreeScene(this.$refs.modelContainer, this.modelPath);
  },
  beforeDestroy() {
    // 清理 three.js 实例
    if (this.threeInstance) {
      this.threeInstance.renderer.dispose();
    }
    window.removeEventListener("resize", this.onWindowResize);
  },
};
</script>

<style scoped>
.model-container {
  width: 100%;
  height: 100%;
}
</style>
