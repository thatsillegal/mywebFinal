<template>
    <div class="wrapper">
        <div class="photo-container" ref="container">
            <img v-if="photos.length > 0" v-lazy="photos[currentPhotoIndex].src" class="fit-picture" ref="image"
                alt="a beautiful photo" @load="onImageLoad" />
            <div v-if="photos.length > 0" class="overlay" :style="cardStyle">
                <h3>{{ photos[currentPhotoIndex].title }}</h3>
                <p>{{ photos[currentPhotoIndex].description }}</p>
            </div>
        </div>
        <div class="controls">
            <button @click="prevPhoto"><i class="material-icons">arrow_back_ios</i></button>
            <button @click="nextPhoto"> <i class="material-icons">arrow_forward_ios</i></button>
        </div>
    </div>
</template>

<script>
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
export default {
    
    data() {
        return {
            photos: [],
            currentPhotoIndex: 0,
            cardStyle: {
                bottom: "0"
            },
        };
    },
    created() {
        this.loadImages();
    },
    methods: {
        async loadImages() {
            const imageModules = import.meta.glob('@/assets/photos/*.{png,jpg,JPG,jpeg,svg}');
            const allphotos = await Promise.all(
                Object.keys(imageModules).map(async (path) => {
                    const fileName = path.split('/').pop().replace(/\.\w+$/, '');
                    const [name, description] = fileName.split('_');
                    const imageModule = await imageModules[path]();
                    return {
                        title: name,
                        description: description,
                        src: imageModule.default,
                    };
                })
            );
            this.photos = allphotos;

            if (this.photos.length === 0) {
                console.error("没有加载到任何图片");
            } else {
                this.currentPhotoIndex = 0; // 确保显示第一张图片
            }
        },
        nextPhoto() {
            this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
        },
        prevPhoto() {
            this.currentPhotoIndex =
                (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
        },
        onImageLoad() {
            const image = this.$refs.image;
            const container = this.$refs.container;
            if (image instanceof HTMLImageElement) {
                const rectInner = image.getBoundingClientRect();
                const rectOuter = container.getBoundingClientRect();
                console.log(rectInner)
                console.log(rectOuter)
                this.cardStyle = {
                    ...this.cardStyle,
                    bottom: `${rectOuter.bottom - rectInner.bottom}px`,
                };
            }
        },
    },
};
</script>

<style scoped>
.fit-picture {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    display: block;
    object-fit: contain;
}

.wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.photo-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    max-width: 80vw;
}

.overlay {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    position: absolute;
    width: 100%;
    opacity: 0;
    transition: opacity 0.3s ease-in-out; /* 添加平滑过渡效果 */
}

.photo-container:hover .overlay {
    opacity: 1;
}

.controls {
    width: 100%;
    position: absolute;
    bottom: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 768px) {
    .controls {
        justify-content: space-evenly;
    }
    
}

button {
    margin: 0 10px;
}
</style>
