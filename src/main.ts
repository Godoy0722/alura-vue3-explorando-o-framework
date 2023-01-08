import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css';

import roteador from "@/routes";
import App from './App.vue'

createApp(App)
    .use(roteador)
    .mount('#app')
