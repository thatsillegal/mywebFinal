import { createApp } from 'vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import WorksApp from './views/Works.vue'
import PhotoApp from './views/Photos.vue'
import ArticleApp from './views/Articles.vue'


const vuetify = createVuetify({
    components,
    directives,
})

const workapp = createApp(WorksApp)
workapp.use(vuetify)
workapp.mount('#app-works')

const articleapp = createApp(ArticleApp)
articleapp.use(vuetify).mount('#app-articles')


//出大问题，photoapp中可能因为其异步加载，导致影响其后app的挂载，因此要把photoapp最后加载
const photoapp = createApp(PhotoApp)
photoapp.use(vuetify).mount('#app-photos')

