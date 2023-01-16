import INotificacao from "@/interfaces/INotificacao";
import {Module} from "vuex";
import {Estado} from "@/store";
import {moduloNotificacaoMutations} from "@/store/modules/notificacao/mutations";

export interface EstadoNotificacao {
    notificacoes: INotificacao[];
}

export const moduloNotificacao: Module<EstadoNotificacao, Estado> = {
    state: {
      notificacoes: [],
    },
    mutations: { ... moduloNotificacaoMutations },
}
