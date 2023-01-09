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
import {ADICIONA_PROJETO, ALTERA_PROJETO, NOTIFICAR} from "@/store/mutation-types";
import INotificacao, {TipoNotificacao} from "@/interfaces/INotificacao";

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
          this.store.commit(ALTERA_PROJETO, projeto);
        }
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
      }
      this.nomeDoProjeto = '';
      this.store.commit(NOTIFICAR, {
        titulo: 'Novo projeto foi salvo!',
        text: 'Prontinho ;)',
        tipo: TipoNotificacao.SUCESSO,
      } as INotificacao)
      this.$router.push('/projetos')

    },

    findProjeto(id: string) {
      return this.store.state.projetos.find(proj => proj.id === id);
    }
  },
  setup() {
    const store = useStore();

    return {
      store,
    }
  }
});
</script>
