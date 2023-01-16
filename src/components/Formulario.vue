<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de nova tarefa.">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

import Temporizador from "@/components/Temporizador.vue";
import ITarefa from "@/interfaces/ITarefa";
import {useStore} from "vuex";
import {key} from "@/store";

export default defineComponent({
  name: "Formulario",

  emits: ['aoSalvarTarefa'],

  components: { Temporizador },

  data: () => ({
    descricao: '',
    idProjeto: '',
  }),

  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
        projeto: this.projetos.find(proj => proj.id === this.idProjeto),
      } as ITarefa)
      this.descricao = '';
    }
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.moduloProjeto.projetos)
    }
  }
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
