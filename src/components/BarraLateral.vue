<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Alura Tracker">
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">
        {{ textoBotao }}
      </button>
    </div>

    <nav class="panel mt-5">
      <ul>
        <li style="display: flex; justify-content: flex-start">
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            tarefas
          </router-link>
          </li>
        <li style="display: flex; justify-content: flex-start">
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">

import {computed, defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],

  setup(props, { emit }) {
    const modoEscuroAtivo = ref(false);

    const alterarTema = (): void => {
      modoEscuroAtivo.value = !modoEscuroAtivo.value;
      emit('aoTemaAlterado', modoEscuroAtivo);
    };

    const textoBotao = computed(() => modoEscuroAtivo.value ? 'Desativar modo escuro' : 'Ativar modo escuro');

    return {
      modoEscuroAtivo,
      alterarTema,
      textoBotao,
    }
  }
});

</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #FAF0CA;
}
</style>
