import IProjeto from "@/interfaces/IProjeto";
import {Module} from "vuex";
import {Estado} from "@/store";
import {moduloProjetoMutations} from "@/store/modules/projeto/mutations";
import {moduloProjetoActions} from "@/store/modules/projeto/actions";

export interface EstadoProjeto {
    projetos: IProjeto[];
}

export const moduloProjeto: Module<EstadoProjeto, Estado> = {
    state: {
        projetos: [],
    },
    mutations: { ...moduloProjetoMutations },
    actions: { ...moduloProjetoActions },
}
