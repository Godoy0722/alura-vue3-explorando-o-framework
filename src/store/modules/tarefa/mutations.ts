import {MutationTree} from "vuex";
import {EstadoTarefa} from "@/store/modules/tarefa/index";
import ITarefa from "@/interfaces/ITarefa";
import {ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS} from "./mutation-types";

export const moduloTarefaMutations: MutationTree<EstadoTarefa> = {
    [DEFINIR_TAREFAS]: (state, tarefas: ITarefa[]) => {
        state.tarefas = [...tarefas];
    },
    [ADICIONA_TAREFA]: (state, tarefa: ITarefa) => {
        state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA]: (state, tarefa: ITarefa) => {
        const index = state.tarefas.findIndex(task => task.id === tarefa.id);

        if(index !== -1) {
            state.tarefas.splice(index, 1, tarefa);
        }
    }
}
