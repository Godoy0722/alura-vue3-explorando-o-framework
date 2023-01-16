import {ActionTree} from "vuex";
import {EstadoTarefa} from "@/store/modules/tarefa/index";
import {Estado} from "@/store";
import httpClient from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import {ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS} from "./mutation-types";
import {ATUALIZA_TAREFA, CADASTRAR_TAREFAS, OBTER_TAREFAS} from "./action-types";

const PREV_URL = 'tarefas';

export const moduloTarefaActions: ActionTree<EstadoTarefa, Estado> = {
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
}
