<template>
  <i class="z-icon" :style="style">
    <slot>hello</slot>
  </i>
</template>

<script lang="ts">
import {iconProps} from "./icon";
export default {
  name: 'DIcon',
  props: iconProps,
  computed: {
    style() {
      if(!this.size && !this.color) {
        return {}
      }
      return {
        ...(this.size ? {'font-size': `${this.size}px`} : {}),
        ...(this.color ? {'color': this.color} : {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
