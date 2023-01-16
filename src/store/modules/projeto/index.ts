import IProjeto from "@/interfaces/IProjeto";
import {Module} from "vuex";
import {Estado} from "@/store";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, DELETA_PROJETO} from "@/store/mutation-types";
import {ATUALIZA_PROJETO, CADASTRAR_PROJETOS, DELETAR_PROJETO, OBTER_PROJETOS} from "@/store/action-types";
import httpClient from "@/http";

export interface EstadoProjeto {
    projetos: IProjeto[];
}

const PREV_URL = 'projetos';

export const moduloProjeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [DEFINIR_PROJETOS]: (state, projetos: IProjeto[]) => {
            state.projetos = [...projetos];
        },
        [ADICIONA_PROJETO]: (state, nomeDoProjeto: string) => {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto;

            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO]: (state, projeto: IProjeto) => {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id);

            if(index !== -1) {
                state.projetos.splice(index, 1, projeto);
            }
        },
        [DELETA_PROJETO]: (state, idProjeto: string) => {
            state.projetos = state.projetos.filter(proj => proj.id !== idProjeto);
        },
    },
    actions: {
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
}
