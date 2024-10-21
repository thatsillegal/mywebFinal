// no need that
// import './assets/main.css'

import { createApp } from 'vue'
import {createVuetify} from 'vuetify'
// import VueLazyload from 'vue-lazyload'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import App from './App.vue'
import WorksApp from './views/Works.vue'
import PhotoApp from './views/Photos.vue'

// import lazyloadError from '@/assets/lazyload_error.webp';
// import loadingImage from '@/assets/lazyload_loading.webp';

const vuetify = createVuetify({
    components,
    directives,
})

const workapp = createApp(WorksApp)
workapp.use(vuetify)
// workapp.use(VueLazyload,{
//     preload:1.3,
//     error: lazyloadError, // 加载失败时显示的图片
//     loading: loadingImage, // 加载中的占位图片
//     attempt: 1,
// })
workapp.mount('#app-works')


const photoapp = createApp(PhotoApp)
photoapp.use(vuetify).mount('#app-photos')