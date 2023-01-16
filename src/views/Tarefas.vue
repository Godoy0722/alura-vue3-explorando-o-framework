<template>
  <Formulario @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <Box v-if="tarefas.length === 0">
      Você não está muito produtivo hoje :(
    </Box>

    <div class="field">
      <p class="control has-icons-left">
        <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro"/>
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
    </div>

    <Tarefa v-for="(n, index) in tarefas" :key="index" :tarefa="n" @aoTarefaClicada="selecionarTarefa"/>

    <Modal :mostrar="!!tarefaSelecionada">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma Tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal()"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
        </div>
      </template>
      <template v-slot:rodape>
        <button class="button is-success" @click="alterarTarefa()">Salvar Alterações</button>
        <button class="button" @click="fecharModal()">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";
import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import Formulario from "@/components/Formulario.vue";
import {useStore} from "@/store";
import ITarefa from "@/interfaces/ITarefa";
import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";
import {OBTER_PROJETOS} from "@/store/modules/projeto/action-types";
import {ATUALIZA_TAREFA, CADASTRAR_TAREFAS, OBTER_TAREFAS} from "@/store/modules/tarefa/action-types";
import {NOTIFICAR} from "@/store/modules/notificacao/mutation-types";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  components: {Modal, Box, Tarefa, Formulario},

  setup() {
    const store = useStore();
    const tarefaSelecionada = ref<ITarefa | null>(null);
    const filtro = ref('');

    Promise.all([
      store.dispatch(OBTER_TAREFAS),
      store.dispatch(OBTER_PROJETOS),
    ]);

    const salvarTarefa = (tarefa: ITarefa): void => {
      if (!tarefa.projeto) {
        store.commit(NOTIFICAR, {
          titulo: 'Ops',
          text: 'Selecione um projeto antes de definir uma tarefa',
          tipo: TipoNotificacao.FALHA
        } as INotificacao);

        return;
      }
      store.dispatch(CADASTRAR_TAREFAS, tarefa);
    };

    const selecionarTarefa = (tarefa: ITarefa): void => {
      tarefaSelecionada.value = tarefa;
    };

    const fecharModal = (): void => {
      tarefaSelecionada.value = null;
    };

    const alterarTarefa = (): void => {
      store.dispatch(ATUALIZA_TAREFA, tarefaSelecionada);
    }

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.moduloTarefa.tarefas),
      tarefaSelecionada,
      salvarTarefa,
      selecionarTarefa,
      fecharModal,
      alterarTarefa,
      filtro,
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
