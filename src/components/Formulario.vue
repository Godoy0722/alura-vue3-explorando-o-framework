<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de nova tarefa.">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>

      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import Temporizador from "@/components/Temporizador.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "Formulario",

  emits: ['aoSalvarTarefa'],

  components: { Temporizador },

  data: () => ({
    descricao: '',
  }),

  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', { descricao: this.descricao, duracaoEmSegundos: tempoDecorrido } as ITarefa)
      this.descricao = '';
    }
  }
});
</script>
