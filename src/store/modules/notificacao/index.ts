import INotificacao from "@/interfaces/INotificacao";
import {Module} from "vuex";
import {Estado} from "@/store";
import {NOTIFICAR} from "@/store/mutation-types";

export interface EstadoNotificacao {
    notificacoes: INotificacao[];
}

export const moduloNotificacao: Module<EstadoNotificacao, Estado> = {
    mutations: {
        [NOTIFICAR]: (state, novaNotificacao: INotificacao) => {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id);
            }, 3000);
        },
    }
}
