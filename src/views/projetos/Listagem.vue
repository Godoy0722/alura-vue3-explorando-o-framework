<template>
  <div>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.nome }}</td>
        <td>
          <router-link :to="`/projetos/atualizar/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
          </router-link>
          <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
            <span class="icon is-small">
            <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "@/store";
import {DELETAR_PROJETO, OBTER_PROJETOS} from "@/store/modules/projeto/action-types";

export default defineComponent({

  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);

    const excluir = (id: string) => {
      store.dispatch(DELETAR_PROJETO, id);
    }

    return {
      projetos: computed(() => store.state.moduloProjeto.projetos),
      excluir,
    }
  }
});
</script>
