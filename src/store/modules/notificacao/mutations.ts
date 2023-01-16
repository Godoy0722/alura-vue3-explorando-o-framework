import {MutationTree} from "vuex";
import {EstadoNotificacao} from "@/store/modules/notificacao/index";
import INotificacao from "@/interfaces/INotificacao";
import {NOTIFICAR} from "./mutation-types";

export const moduloNotificacaoMutations: MutationTree<EstadoNotificacao> = {
    [NOTIFICAR]: (state, novaNotificacao: INotificacao) => {
        novaNotificacao.id = new Date().getTime();
        state.notificacoes.push(novaNotificacao);
        setTimeout(() => {
            state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id);
        }, 3000);
    },
}
