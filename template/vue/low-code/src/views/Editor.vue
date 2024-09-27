<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          组件列表
          <components-list :list="defaultTextTemplates" @onItemClick="addItem"/>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
                @setActive="setActive"
                v-for="component in components"
                :key="component.id"
                :id="component.id"
                :active="component.id === (currentElement && currentElement.id)"
            >
              <component
                  :is="component.name"
                  v-bind="component.props"
              />
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        <h3 style="margin-left: 1em">组件属性</h3>
        <props-table
            v-if="currentElement && currentElement.props"
            :props="currentElement.props"
            @change="handleChange"
        ></props-table>
        <pre>{{ currentElement && currentElement.props }}</pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import ComponentsList from '../components/ComponentsList.vue'
import EditWrapper from '../components/EditWrapper.vue'
import PropsTable from '../components/PropsTable.vue'
import LText from '@/components/LText.vue'
import LImage from '@/components/LImage.vue'
import {ComponentData, useEditorStore} from '../store/editor'
import {defaultTextTemplates} from '../defaultTemplates'

export default defineComponent({
  components: {
    ComponentsList,
    EditWrapper,
    PropsTable,
    LText,
    LImage
  },
  // @ts-ignore
  setup(props, {emit}) {
    const componentNameEnum = {
      'l-text': LText,
      'l-image': LImage,
    }
    const getComponentByName = (name: string) => {
      return componentNameEnum[name]
    }
    const editorStore = useEditorStore()
    const components = computed(() => editorStore.components)
    const currentElement = computed<ComponentData | null>(() => editorStore.getCurrentElement)
    const addItem = (component: any) => {
      editorStore.addComponent(component)
    }
    const setActive = (id: string) => {
      editorStore.setActive(id)
    }
    const handleChange = (e: any) => {
      console.log('event', e)
      editorStore.updateComponent(e)
    }
    return {
      getComponentByName,
      editorStore,
      components,
      currentElement,
      addItem,
      setActive,
      handleChange,
      defaultTextTemplates
    }
  }
})
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>