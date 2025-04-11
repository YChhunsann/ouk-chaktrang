import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // This imports from router/index.js
import './assets/tailwind.css'

const app = createApp(App)

app.use(router) // Register the router

app.mount('#app')