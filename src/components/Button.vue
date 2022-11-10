<template>
  <button class="button" @click="click" :disabled="isDisabled">
      <span class="icon">
          <i :class="`fas fa-${icon}`"></i>
      </span>
    <span>{{ description }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",

  emits: ['clicked'],

  props: {
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    click() {
      this.$emit('clicked');
    }
  }
});
</script>
