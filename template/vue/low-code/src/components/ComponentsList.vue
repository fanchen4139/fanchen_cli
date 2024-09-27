<template>
  <div class="create-component-list">
    <div v-for="(item, index) in list" :key="index" class="component-item" @click="onItemClick(item)">
      <l-text v-bind="item"></l-text>
    </div>
  </div>
  <StyledUploader @success="onImageUploaded"></StyledUploader>
</template>

<script setup lang="ts">
import {v4 as uuidV4} from 'uuid'
import {message} from 'ant-design-vue'
import LText from '../components/LText.vue'
import StyledUploader from '../components/StyledUploader.vue'
import type {ComponentData} from '../store/editor'
import {imageDefaultProps, TextComponentProps} from '../defaultProps'
import {UploadResp} from '../extraType'
import {getImageDimensions} from '../helper'
import {reactive} from "vue";

defineProps({
  list: {
    type: Array,
    required: true
  }
})
const emits = defineEmits(['on-item-click'])
const onItemClick = (props: TextComponentProps) => {
  const componentData: ComponentData = {
    name: 'l-text',
    id: uuidV4(),
    props
  }
  emits('on-item-click', componentData)
}
const onImageUploaded = (data: { resp: UploadResp; file: File }) => {
  const {resp, file} = data
  const componentData: ComponentData = {
    name: 'l-image',
    id: uuidV4(),
    props: {
      ...imageDefaultProps
    }
  }
  message.success('上传成功')
  componentData.props.src = resp.data.url
  getImageDimensions(file).then(({width}) => {
    console.log(width)
    const maxWidth = 373
    componentData.props.width = ((width > maxWidth) ? maxWidth : width) + 'px'
    emits('on-item-click', componentData)
  })
}
</script>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>