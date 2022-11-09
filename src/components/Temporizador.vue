<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos"/>

    <Button icon="play" description="play" :isDisabled="cronometroRodando" @clicked="iniciar" />
    <Button icon="stop" description="stop" :isDisabled="!cronometroRodando" @clicked="finalizar" />

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import Cronometro from "@/components/Cronometro.vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "Temporizador",

  emits: ['aoTemporizadorFinalizado'],

  components: { Cronometro, Button },

  data: () => ({
    tempoEmSegundos: 0,
    cronometro: 0,
    cronometroRodando: false,
  }),

  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);

      this.cronometroRodando = true;
    },

    finalizar() {
      clearInterval(this.cronometro);
      this.cronometroRodando = false;
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  }
});
</script>
