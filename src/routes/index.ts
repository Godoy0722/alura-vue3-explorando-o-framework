import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Tarefas from "@/views/Tarefas.vue";
import Formulario from "@/views/projetos/Formulario.vue";
import Listagem from "@/views/projetos/Listagem.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: Listagem,
    },
    {
        path: '/projetos/novo',
        name: 'NovoProjeto',
        component: Formulario
    },
    {
        path: '/projetos/:id',
        name: 'NovoProjeto',
        component: Formulario,
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default roteador;
