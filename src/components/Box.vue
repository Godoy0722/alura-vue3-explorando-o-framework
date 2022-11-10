<template>
  <div class="box has-text-weight-bold" :style="estilos">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box",

  data: () => ({
    estilos: {
      background: "#FAF0CA"
    }
  }),
});
</script>
