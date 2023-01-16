<template>
 <div class="notificacoes">
   <article
       v-for="notificacao in notificacoes"
       :key="notificacao.id"
       :class="`message is-${classNotificacao[`${notificacao.tipo}`]}`"
   >
     <div class="message-header">{{ notificacao.titulo }}</div>
     <div class="message-body">{{ notificacao.text }}</div>
   </article>
 </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
  name: 'Notificacoes',

  setup() {
    const store = useStore();
    const classNotificacao = {
      [TipoNotificacao.SUCESSO]: 'success',
          [TipoNotificacao.ATENCAO]: 'warning',
          [TipoNotificacao.FALHA]: 'danger'
    }

    return {
      classNotificacao,
      notificacoes: computed(() => store.state.moduloNotificacoes.notificacoes),
    }
  }
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 3;
}
</style>
