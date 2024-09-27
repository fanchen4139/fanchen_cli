<template>
  <div class="content-container">
    <template-list :list="testData"></template-list>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import TemplateList from '../components/TemplateList.vue'
import useTemplatesStore, {TemplateProps} from "@/store/templates.ts";

const tmplStore = useTemplatesStore()
const testData = computed<TemplateProps[]>(() => tmplStore.data)
</script>

<style>
.page-title {
  color: #fff;
}

.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>