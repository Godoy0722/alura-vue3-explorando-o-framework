import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Tarefas from "@/views/Tarefas.vue";
import Formulario from "@/views/projetos/Formulario.vue";
import Listagem from "@/views/projetos/Listagem.vue";
import Projetos from "@/views/Projetos.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Listagem,
            },
            {
                path: 'novo',
                name: 'NovoProjeto',
                component: Formulario
            },
            {
                path: 'atualizar/:id',
                name: 'AtualizarProjetos',
                component: Formulario,
                props: true,
            }
        ]
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default roteador;
