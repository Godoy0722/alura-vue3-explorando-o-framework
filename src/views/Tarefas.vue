<template>
  <Formulario @aoSalvarTarefa="salvarTarefa"/>
  <div class="lista">
    <Tarefa v-for="(n, index) in tarefas" :key="index" :tarefa="n"/>

    <Box v-if="tarefas.length === 0">
      Você não está muito produtivo hoje :(
    </Box>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import Formulario from "@/components/Formulario.vue";
import ITarefa from "@/interfaces/ITarefa";
import {useStore} from "@/store";
import {NOTIFICAR} from "@/store/mutation-types";
import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
  components: {Box, Tarefa, Formulario},

  data: () => ({
    tarefas: [] as ITarefa[],
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

      this.tarefas.push(tarefa);
    },
  },

  setup() {
    const store = useStore();

    return {
      store,
      notificacoes: computed(() => store.state.notificacoes),
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
