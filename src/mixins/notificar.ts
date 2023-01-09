import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import {NOTIFICAR} from "@/store/mutation-types";
import {store} from "@/store";

export const notificarMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, text: string): void {
            store.commit(NOTIFICAR, { titulo, text, tipo } as INotificacao);
        },
    }
};

