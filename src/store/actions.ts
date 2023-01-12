import {ActionTree} from "vuex";

import httpClient from "@/http";
import IProjeto from "@/interfaces/IProjeto";

import {Estado} from "./index";
import {ATUALIZA_PROJETO, CADASTRAR_PROJETOS, DELETAR_PROJETO, OBTER_PROJETOS} from "./action-types";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, DELETA_PROJETO} from "./mutation-types";

export const actions: ActionTree<Estado, Estado> = {
    [OBTER_PROJETOS]: async ({ commit }) => {
        try {
            const { data } = await httpClient.get<IProjeto[]>('projetos');
            commit(DEFINIR_PROJETOS, data);
        } catch (error) {
            console.log(error);
        }
    },
    [CADASTRAR_PROJETOS]: async ({ commit }, nomeDoProjeto: string) => {
        try {
            const { data } = await httpClient.post<IProjeto>('projetos', { nome: nomeDoProjeto })
            commit(ADICIONA_PROJETO, data);
        } catch (error) {
            console.log(error);
        }
    },
    [ATUALIZA_PROJETO]: async ({ commit }, projeto: IProjeto) => {
        try {
            const { data } = await httpClient.put<IProjeto>(`projetos/${projeto.id}`, projeto);
            commit(ALTERA_PROJETO, data);
        } catch (error) {
            console.log(error);
        }
    },
    [DELETAR_PROJETO]: async ({ commit }, idProjeto: string) => {
        try {
            await httpClient.delete(`projetos/${idProjeto}`);
            commit(DELETA_PROJETO, idProjeto);
        } catch (error) {
            console.log(error);
        }
    }
}
