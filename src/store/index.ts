import IProjeto from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";
import INotificacao from "@/interfaces/INotificacao";
import {mutations} from "@/store/mutations";

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
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
