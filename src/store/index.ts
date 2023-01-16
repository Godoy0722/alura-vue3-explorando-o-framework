import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";
import {EstadoProjeto, moduloProjeto} from "@/store/modules/projeto";
import {EstadoTarefa, moduloTarefa} from "@/store/modules/tarefa";
import {EstadoNotificacao, moduloNotificacao} from "@/store/modules/notificacao";

export interface Estado {
    moduloNotificacoes: EstadoNotificacao;
    moduloProjeto: EstadoProjeto;
    moduloTarefa: EstadoTarefa;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: () => ({
        moduloNotificacoes: {
          notificacoes: [],
        },
        moduloProjeto: {
            projetos: [],
        },
        moduloTarefa: {
            tarefas: [],
        }
    }),
    modules: {
        moduloNotificacao,
        moduloProjeto,
        moduloTarefa,
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
