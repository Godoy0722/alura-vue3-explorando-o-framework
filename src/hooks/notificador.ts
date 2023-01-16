import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import {store} from "@/store";
import {NOTIFICAR} from "@/store/modules/notificacao/mutation-types";

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void,
}

export default (): Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, text: string): void => {
        store.commit(NOTIFICAR, { titulo, text, tipo } as INotificacao);
    }

    return { notificar };
}
