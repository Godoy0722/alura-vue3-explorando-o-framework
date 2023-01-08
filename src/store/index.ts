import IProjeto from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DELETA_PROJETO} from "@/store/mutation-types";

interface Estado {
    projetos: IProjeto[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [] as IProjeto[]
    },
    mutations: {
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
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
