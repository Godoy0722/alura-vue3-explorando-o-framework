import {MutationTree} from 'vuex';
import {Estado} from "@/store/index";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DELETA_PROJETO, NOTIFICAR} from "@/store/mutation-types";
import IProjeto from "@/interfaces/IProjeto";
import INotificacao from "@/interfaces/INotificacao";

export const mutations: MutationTree<Estado> = {
    [ADICIONA_PROJETO]: (state, nomeDoProjeto: string) => {
        const projeto = {
            id: new Date().toISOString(),
            nome: nomeDoProjeto,
        } as IProjeto;

        state.projetos.push(projeto);
    },
    [ALTERA_PROJETO]: (state, projeto: IProjeto) => {
        const index = state.projetos.findIndex(proj => proj.id === projeto.id);

        if(index !== -1) {
            state.projetos.splice(index, 1, projeto);
        }
    },
    [DELETA_PROJETO]: (state, idProjeto: string) => {
        state.projetos = state.projetos.filter(proj => proj.id !== idProjeto);
    },
    [NOTIFICAR]: (state, novaNotificacao: INotificacao) => {
        novaNotificacao.id = new Date().getTime();
        state.notificacoes.push(novaNotificacao);
        setTimeout(() => {
            state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id);
        }, 3000);
    },
}
