<template>
  <uploader
      class="styled-uploader"
      action="http://local.test:7001/api/upload/"
      :showUploadList="false"
      :beforeUpload="commonUploadCheck"
      @success="(data) => {handleUploadSuccess(data.resp, data.file.raw)}"
  >
    <div class="uploader-container">
      <FileImageOutlined/>
      <h4>上传图片</h4>
    </div>
    <template #loading>
      <div class="uploader-container">
        <LoadingOutlined spin/>
        <h4>上传中</h4>
      </div>
    </template>
    <template #uploaded>
      <div class="uploader-container">
        <FileImageOutlined/>
        <h4>上传图片</h4>
      </div>
    </template>
  </uploader>
</template>

<script setup lang="ts">
import {FileImageOutlined, LoadingOutlined} from '@ant-design/icons-vue'
import {commonUploadCheck} from '../helper'
import Uploader from './Uploader.vue'

const emits = defineEmits(['success']);

const handleUploadSuccess = (resp: any, file: File) => {
  emits('success', {resp, file})
}
</script>

<style lang="scss">
.styled-uploader {
  .uploader-container {
    width: 100px;
    padding: 10px;
    color: #ffffff;
    background: #1890ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .uploader-container:hover {
    background: #40a9ff;
  }

  .uploader-container h4 {
    color: #ffffff;
    margin-bottom: 0;
    margin-left: 10px;
  }
}
</style>