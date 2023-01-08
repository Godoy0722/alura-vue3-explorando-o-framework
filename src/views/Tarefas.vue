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
import {defineComponent} from "vue";
import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import Formulario from "@/components/Formulario.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  components: {Box, Tarefa, Formulario},

  data: () => ({
    tarefas: [] as ITarefa[],
  }),

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
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
