import {Module} from "vuex";
import ITarefa from "@/interfaces/ITarefa";
import {Estado} from "@/store";
import {moduloTarefaMutations} from "@/store/modules/tarefa/mutations";
import {moduloTarefaActions} from "@/store/modules/tarefa/actions";

export interface EstadoTarefa {
    tarefas: ITarefa[],
}

export const moduloTarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
    },
    actions: { ...moduloTarefaActions },
    mutations: { ...moduloTarefaMutations },
}
