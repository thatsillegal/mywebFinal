<template>
    <div class="wrapper">
        <!-- 还没有把图片绑定上去 -->
        <div class="photo-frame">
            <div class="photo-container">
                <img 
                    class="fit-picture"
                    ref="image"
                    :src="photos[currentPhotoIndex].src" 
                    alt="loading..."
                    @load="onImageLoad" 
                />
                <v-card :style="cardStyle">
                    <p style="font:italic uppercase normal 12px/0.5 'Arial', 'Helvetica', sans-serif">
                        {{ photos[currentPhotoIndex].title }}
                    </p>
                    <p style="font:italic small-caps normal 12px 'Arial', 'Helvetica', sans-serif">
                        {{ photos[currentPhotoIndex].description }}
                    </p>
                </v-card>
            </div>


            <div class="controls">
                <button @click="prevPhoto">prev</button>
                <button @click="nextPhoto">next</button>
            </div>
        </div>
    </div>
</template>

<script>
    import loadingImage from '@/assets/lazyload_loading.webp';

    export default{
        data(){
            return {
                photos:[], // 存储所有的图片，获取方法和worksItem一样
                currentPhotoIndex:0,
                loadingImage,
                cardStyle:{
                    padding:"10px",
                    left:"10px",
                    bottom:"10px",
                    position: "absolute",
                    elevation:"16px",
                    "max-width":"10vw",
                },
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

                
            },
            nextPhoto() {
                if (this.currentPhotoIndex < this.photos.length - 1) {
                    this.currentPhotoIndex += 1;
                } else {
                    this.currentPhotoIndex = 0; // 回到第一张照片
                };
            },
            prevPhoto() {
                if (this.currentPhotoIndex > 0) {
                    this.currentPhotoIndex -= 1;
                } else {
                    this.currentPhotoIndex = this.photos.length - 1; // 回到最后一张照片
                };
            },
            onImageLoad(){
                const a = this.$refs.image;
                if (a instanceof HTMLImageElement){
                    console.log(" an img ele", a.getBoundingClientRect());
                }else{
                    console.log('not valid')
                }

                console.log(a.height);
                if(a){
                    const rect = a.getBoundingClientRect();
                    this.cardStyle = {
                        ...this.cardStyle,
                        left:`${rect.right}px`,
                        bottom:`${rect.top}px`
                    }
                }else{
                    console.log("a is null")  
                }
            },
        },
    }
</script>

<style scoped>
  .fit-picture{
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    display: block;
    object-fit: contain;
  }
  .wrapper{
    width: 100vw;
    height:100vh; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .photo-frame{
    display: flex;
    justify-content: center;
    height:100%;
    width:100%;
  }
  .photo-container{
    position:relative;
    display: flex;
    justify-content: center;
    align-items: cneter;
    height: 80vh;
    width:auto;
    padding:10vh; 
  }
  .controls{
    width:100%;
    position: absolute;
    bottom:30px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  button{
    margin:0px 10px
  }
</style>