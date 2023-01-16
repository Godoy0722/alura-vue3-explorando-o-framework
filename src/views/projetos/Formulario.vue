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
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";

import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador';
import {ATUALIZA_PROJETO, CADASTRAR_PROJETOS} from "@/store/modules/projeto/action-types";

export default defineComponent({
  name: 'Formulario',

  props: {
    id: { type: String },
  },

  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();
    const router = useRouter();

    const nomeDoProjeto = ref('');

    const findProjeto = (id: string) => {
      return store.state.moduloProjeto.projetos.find(proj => proj.id == id);
    }

    if (props.id) {
      const projeto = findProjeto(props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const salvar = async () => {
      if (props.id) {
        const projeto = findProjeto(props.id);

        if (projeto) {
          projeto.nome = nomeDoProjeto.value;
          await store.dispatch(ATUALIZA_PROJETO, projeto);
        }
      } else {
        await store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value);
      }
      nomeDoProjeto.value = '';
      notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso');
      router.push('/projetos');
    }

    return {
      nomeDoProjeto,
      salvar,
    }
  }
});
</script>
