import { createApp } from 'vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import WorksApp from './views/Works.vue'
import PhotoApp from './views/Photos.vue'
import ArticleApp from './views/Articles.vue'
import VueLazyload from 'vue-lazyload' //引入这个懒加载插件


const vuetify = createVuetify({
    components,
    directives,
})

const workapp = createApp(WorksApp)
workapp.use(VueLazyload,{
    preLoad: 1.3, //预加载高度比例，默认为 1.3
    error: '/images/error.gif',//请求失败后显示的图片
    loading: '/images/loading.gif',//加载的loading过渡图片
    attempt: 1//尝试加载次数
})
workapp.use(vuetify).mount('#app-works')

const articleapp = createApp(ArticleApp)
articleapp.use(vuetify).mount('#app-articles')


//出大问题，photoapp中可能因为其异步加载，导致影响其后app的挂载，因此要把photoapp最后加载
const photoapp = createApp(PhotoApp)
photoapp.use(VueLazyload,{
    preLoad: 1.3, //预加载高度比例，默认为 1.3
    error: '/images/error.gif',//请求失败后显示的图片
    loading: '/images/loading.gif',//加载的loading过渡图片
    attempt: 1//尝试加载次数
})
photoapp.use(vuetify).mount('#app-photos')

