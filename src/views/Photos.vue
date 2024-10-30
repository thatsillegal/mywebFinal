<template>
    <div class="wrapper">
        <div class="photo-container" ref="container">
            <img 
                class="fit-picture"
                ref="image"
                :src="photos[currentPhotoIndex].src" 
                alt="loading..."
                @load="onImageLoad" 
            />
            <div class="overlay" :style="cardStyle">
                <h3>{{ photos[currentPhotoIndex].title }}</h3>
                <p>{{ photos[currentPhotoIndex].description }}</p>
            </div>
        </div>
        <div class="controls">
            <button @click="prevPhoto"><span class="material-icons">arrow_back</span></button>
            <button @click="nextPhoto"><span class="material-icons">arrow_forward</span></button>
        </div>
    </div>
</template>

<script>
    import loadingImage from '@/assets/lazyload_loading.webp';

    export default {
        data() {
            return {
                photos: [],
                currentPhotoIndex: 0,
                loadingImage,
                cardStyle: {
                    bottom:"0"
                },
            };
        },
        async created() {
            await this.loadImages();
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
    display: none;
    width: 100%;
  }

  .photo-container:hover .overlay {
    display:block;
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

  button {
    margin: 0 10px;
  }
</style>
