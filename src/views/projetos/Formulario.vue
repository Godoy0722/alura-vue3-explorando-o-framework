<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
      </div>

      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador';
import {ATUALIZA_PROJETO, CADASTRAR_PROJETOS} from "@/store/action-types";

export default defineComponent({
  name: 'Formulario',
  props: {
    id: { type: String },
  },

  data: () => ({
    nomeDoProjeto: '',
  }),

  mounted() {
    if (this.id) {
      const projeto = this.findProjeto(this.id);

      this.nomeDoProjeto = projeto?.nome || '';
    }
  },

  methods: {
    salvar() {
      if(this.id) {
        const projeto = this.findProjeto(this.id);
        if (projeto) {
          projeto.nome = this.nomeDoProjeto;
          this.store.dispatch(ATUALIZA_PROJETO, projeto);
        }
      } else {
        this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
      }
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso');
      this.$router.push('/projetos')
    },

    findProjeto(id: string) {
      return this.store.state.projetos.find(proj => proj.id === id);
    }
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();

    return {
      store,
      notificar,
    }
  }
});
</script>
