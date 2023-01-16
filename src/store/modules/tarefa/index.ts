import {Module} from "vuex";
import ITarefa from "@/interfaces/ITarefa";
import {Estado} from "@/store";
import httpClient from "@/http";
import {ATUALIZA_TAREFA, CADASTRAR_TAREFAS, OBTER_TAREFAS} from "@/store/action-types";
import {ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS} from "@/store/mutation-types";

const PREV_URL = 'tarefas';

export interface EstadoTarefa {
    tarefas: ITarefa[],
}

export const moduloTarefa: Module<EstadoTarefa, Estado> = {
    actions: {
        [OBTER_TAREFAS]: async ({ commit }) => {
            try {
                const { data } = await httpClient.get<ITarefa[]>(PREV_URL);
                commit(DEFINIR_TAREFAS, data);
            } catch (error) {
                console.log(error);
            }
        },
        [CADASTRAR_TAREFAS]: async ({ commit }, tarefa: ITarefa) => {
            try {
                const { data } = await httpClient.post<ITarefa>(PREV_URL, tarefa)
                commit(ADICIONA_TAREFA, data);
            } catch (error) {
                console.log(error);
            }
        },

        [ATUALIZA_TAREFA]: async ({ commit }, tarefa: ITarefa) => {
            try {
                const { data } = await httpClient.put<ITarefa>(`${PREV_URL}/${tarefa.id}`, tarefa)
                commit(ALTERA_TAREFA, data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mutations: {
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
}
