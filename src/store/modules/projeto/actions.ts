import {ActionTree} from "vuex";
import {EstadoProjeto} from "@/store/modules/projeto/index";
import {Estado} from "@/store";
import httpClient from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import {
    ADICIONA_PROJETO,
    ALTERA_PROJETO,
    DEFINIR_PROJETOS,
    DELETA_PROJETO
} from "./mutation-types";
import {
    ATUALIZA_PROJETO,
    CADASTRAR_PROJETOS,
    DELETAR_PROJETO,
    OBTER_PROJETOS
} from "./action-types";

const PREV_URL = 'projetos';

export const moduloProjetoActions: ActionTree<EstadoProjeto, Estado> = {
    [OBTER_PROJETOS]: async ({ commit }) => {
        try {
            const { data } = await httpClient.get<IProjeto[]>(PREV_URL);
            commit(DEFINIR_PROJETOS, data);
        } catch (error) {
            console.log(error);
        }
    },
    [CADASTRAR_PROJETOS]: async ({ commit }, nomeDoProjeto: string) => {
        try {
            const { data } = await httpClient.post<IProjeto>(PREV_URL, { nome: nomeDoProjeto })
            commit(ADICIONA_PROJETO, data);
        } catch (error) {
            console.log(error);
        }
    },
    [ATUALIZA_PROJETO]: async ({ commit }, projeto: IProjeto) => {
        try {
            const { data } = await httpClient.put<IProjeto>(`${PREV_URL}/${projeto.id}`, projeto);
            commit(ALTERA_PROJETO, data);
        } catch (error) {
            console.log(error);
        }
    },
    [DELETAR_PROJETO]: async ({ commit }, idProjeto: string) => {
        try {
            await httpClient.delete(`${PREV_URL}/${idProjeto}`);
            commit(DELETA_PROJETO, idProjeto);
        } catch (error) {
            console.log(error);
        }
    }
}
