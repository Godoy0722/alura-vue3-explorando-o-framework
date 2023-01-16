<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos"/>

    <Button icon="play" description="play" :isDisabled="cronometroRodando" @clicked="iniciar" />
    <Button icon="stop" description="stop" :isDisabled="!cronometroRodando" @clicked="finalizar" />

  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

import Cronometro from "@/components/Cronometro.vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "Temporizador",

  emits: ['aoTemporizadorFinalizado'],

  components: { Cronometro, Button },

  setup(props, { emit }) {
    const tempoEmSegundos = ref(0);
    const cronometro = ref(0);
    const cronometroRodando = ref(false);

    const iniciar = (): void => {
      cronometro.value = setInterval(() => {
        tempoEmSegundos.value += 1;
      }, 1000);

      cronometroRodando.value = true;
    };

    const finalizar = (): void => {
      clearInterval(cronometro.value);
      cronometroRodando.value = false;
      emit('aoTemporizadorFinalizado', tempoEmSegundos.value);
      tempoEmSegundos.value = 0;
    };

    return {
      tempoEmSegundos,
      cronometroRodando,
      iniciar,
      finalizar,
    }
  }
});
</script>
