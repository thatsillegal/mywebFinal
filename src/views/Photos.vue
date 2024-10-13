<template>
    <div class="wrapper">
        <!-- 还没有把图片绑定上去 -->
        <div class="photo-frame">
            <div class="photo-container">
                <img src="" alt="">
            </div>
            <div class="controls">
                <button @click="prevPhoto">prev</button>
                <button @click="nextPhoto">next</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                photos:[] // 存储所有的图片，获取方法和worksItem一样
            }
        },
        async created() {
            // 调用函数加载图片并存储图片名和路径
            await this.loadImages();
        },
        methods: {
            async loadImages() {
                // 使用 import.meta.glob 动态导入 images 文件夹中的图片
                const imageModules = import.meta.glob('@/assets/photos/*.{png,jpg,jpeg,svg}');

                // 等待所有图片路径的 Promise 解析
                const allphotos = await Promise.all(
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
                this.photos = allphotos;

                console.log('photos:',allphotos)
            },
            nextPhoto() {
                if (this.currentPhotoIndex < this.photos.length - 1) {
                    this.currentPhotoIndex += 1;
                } else {
                    this.currentPhotoIndex = 0; // 回到第一张照片
                }
            },
            prevPhoto() {
                if (this.currentPhotoIndex > 0) {
                    this.currentPhotoIndex -= 1;
                } else {
                    this.currentPhotoIndex = this.photos.length - 1; // 回到最后一张照片
                }
            },
        }
    }
</script>

<style scoped>
  .wrapper{
    width: 100vw;
    height:100vh;
    padding:35px 10px 10px 10px; 
  }
</style>