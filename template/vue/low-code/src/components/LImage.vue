<template>
  <img
      :style="styleProps"
      class="l-image-component"
      @click.prevent="handleClick"
      :src="src"
  />
</template>

<script setup lang="ts">
import useComponentCommon from '../hooks/useComponentCommon'
import {transformToComponentProps, imageDefaultProps, imageStylePropsNames, ImageComponentProps} from '../defaultProps'

defineOptions({
  name: 'l-image',
})
// array that contains style props
const props = defineProps({
  ...transformToComponentProps(imageDefaultProps)
})
const {styleProps, handleClick} = useComponentCommon<ImageComponentProps>(props, imageStylePropsNames)

</script>

<style scoped>
.l-image-component {
  max-width: 100%;
  position: relative !important;
}
</style>
