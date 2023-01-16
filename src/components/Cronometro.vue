<template>
  <section>
    <strong class="display">{{ tempoDecorrido }}</strong>
  </section>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "Cronometro",

  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0,
    }
  },

  setup(props) {
    const tempoDecorrido = computed(() =>  new Date(props.tempoEmSegundos * 1000).toISOString().substr(11, 8));

    return { tempoDecorrido };
  }
});

</script>

<style>
.display {
  color: var(--texto-primario);
}
</style>
