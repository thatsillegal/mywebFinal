// no need that
// import './assets/main.css'

import { createApp } from 'vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import App from './App.vue'
import WorksApp from './views/Works.vue'

const vuetify = createVuetify({
    components,
    directives,
})

const workapp = createApp(WorksApp)


workapp.use(vuetify).mount('#app-works')