import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import {store} from "@/store";
import {NOTIFICAR} from "@/store/modules/notificacao/mutation-types";

export const notificarMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, text: string): void {
            store.commit(NOTIFICAR, { titulo, text, tipo } as INotificacao);
        },
    }
};

