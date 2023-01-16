<template>
  <Formulario @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <Tarefa v-for="(n, index) in tarefas" :key="index" :tarefa="n" @aoTarefaClicada="selecionarTarefa" />

    <Box v-if="tarefas.length === 0">
      Você não está muito produtivo hoje :(
    </Box>

    <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma Tarefa</p>
          <button class="delete" aria-label="close" @click="fecharModal()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="alterarTarefa()">Salvar Alterações</button>
          <button class="button" @click="fecharModal()">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import Formulario from "@/components/Formulario.vue";
import {useStore} from "@/store";
import ITarefa from "@/interfaces/ITarefa";
import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import {OBTER_PROJETOS} from "@/store/modules/projeto/action-types";
import {ATUALIZA_TAREFA, CADASTRAR_TAREFAS, OBTER_TAREFAS} from "@/store/modules/tarefa/action-types";
import {NOTIFICAR} from "@/store/modules/notificacao/mutation-types";

export default defineComponent({
  components: {Box, Tarefa, Formulario},

  data: () => ({
    tarefaSelecionada: null as ITarefa | null,
  }),

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      if(!tarefa.projeto) {
        this.store.commit(NOTIFICAR, {
          titulo: 'Ops',
          text: 'Selecione um projeto antes de definir uma tarefa',
          tipo: TipoNotificacao.FALHA
        } as INotificacao);

        return;
      }
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa);
    },

    selecionarTarefa(tarefa: ITarefa): void {
      this.tarefaSelecionada = tarefa;
    },

    fecharModal(): void {
      this.tarefaSelecionada = null;
    },

    alterarTarefa(): void {
      this.store.dispatch(ATUALIZA_TAREFA, this.tarefaSelecionada);
    }
  },

  setup() {
    const store = useStore();
    Promise.all([
      store.dispatch(OBTER_TAREFAS),
      store.dispatch(OBTER_PROJETOS),
    ]);

    return {
      store,
      tarefas: computed(() => store.state.moduloTarefa.tarefas),
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
</style>
