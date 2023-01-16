<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-7">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "@/components/Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";

export default defineComponent({
  name: "Tarefa",
  emits: ['aoTarefaClicada'],
  components: {Box, Cronometro },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>
    }
  },

  setup(props, { emit }) {
    const tarefaClicada = (): void => {
      emit('aoTarefaClicada', props.tarefa);
    }

    return {
      tarefaClicada,
    }
  }
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
