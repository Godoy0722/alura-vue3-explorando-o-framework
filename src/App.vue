<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>

    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(n, index) in tarefas" :key="index" :tarefa="n" />

        <Box v-if="tarefas.length === 0">
          Você não está muito produtivo hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BarraLateral from "@/components/BarraLateral.vue";
import Formulario from "@/components/Formulario.vue";
import Tarefa from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";

export default defineComponent({
  name: 'App',
  components: {Box, Tarefa, BarraLateral, Formulario },

  data: () => ({
    tarefas: [] as ITarefa[],
    modoEscuroAtivo: false,
  }),

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },

    trocarTema(temaEscuroAtivo: boolean) {
      this.modoEscuroAtivo = temaEscuroAtivo;
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

.conteudo {
  background-color: var(--bg-primario);
}
</style>
