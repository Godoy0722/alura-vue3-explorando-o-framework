import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";

import {mutations} from "./mutations";
import {actions} from "./actions";

import IProjeto from "@/interfaces/IProjeto";
import INotificacao from "@/interfaces/INotificacao";

export interface Estado {
    projetos: IProjeto[];
    notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [] as IProjeto[],
        notificacoes: [] as INotificacao[],
    },
    mutations,
    actions,
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
