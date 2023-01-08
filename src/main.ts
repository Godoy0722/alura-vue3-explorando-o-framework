import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css';

import roteador from "@/routes";
import App from './App.vue'
import {key, store} from "@/store";

createApp(App)
    .use(roteador)
    .use(store, key)
    .mount('#app')
