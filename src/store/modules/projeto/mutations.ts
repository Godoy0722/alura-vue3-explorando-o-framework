import {MutationTree} from "vuex";
import {EstadoProjeto} from "./index";
import IProjeto from "@/interfaces/IProjeto";
import {
    ADICIONA_PROJETO,
    ALTERA_PROJETO,
    DEFINIR_PROJETOS,
    DELETA_PROJETO
} from "@/store/modules/projeto/mutation-types";

export const moduloProjetoMutations: MutationTree<EstadoProjeto> = {
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
}
