import './assets/Index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fontsource/metropolis';

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
