<template>
  <div class="props-table">
    <template
        v-for="(value, key) in finalProps"
    >
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <div class="prop-component">
        <component
            :is="value.component"
            :[value.valueProp]="value.value"
            v-bind="value.extraProps"
            v-on="value.events"
        >
          <template v-if="value.options">
            <component
                :is="value.subComponent"
                v-for="(option, k) in value.options" :key="k"
                :value="option.value"
            >
              <RenderVNode :VNode="option.text"></RenderVNode>
            </component>
          </template>
        </component>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, VNode} from 'vue'
import {reduce} from 'lodash-es'
import {PropsToForms, mapPropsToForms} from '../propsMap.tsx'
import {ImageComponentProps, TextComponentProps} from '../defaultProps'
import RenderVNode from './RenderVNode.tsx'
import ColorPicker from './ColorPicker.vue'

interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}

export default defineComponent({
  components: {
    RenderVNode,
    ColorPicker
  },
  props: {
    props: {
      type: Object as PropType<TextComponentProps | ImageComponentProps>,
      required: true
    }
  },
  emits: ['change'],
  setup(props, {emit}) {

    const finalProps = computed(() => {
      return reduce(props.props, (result, value, key) => {
        const newKey = key as keyof TextComponentProps
        const item = mapPropsToForms[newKey]
        if (item) {
          const {valueProp = 'value', eventName = 'change', initalTransform, afterTransform} = item
          const newItem: FormProps = {
            ...item,
            value: initalTransform ? initalTransform(value) : value,
            valueProp,
            eventName,
            events: {
              [eventName]: (e: any) => {
                emit('change', {key, value: afterTransform ? afterTransform(e) : e})
              }
            }
          }
          result[newKey] = newItem
        }
        return result
      }, {} as { [key: string]: FormProps })
    })
    return {
      finalProps
    }
  }
})
</script>

<style>
.props-table {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
}

.prop-item {
  display: grid;
  grid-template-columns: auto 1fr;
  margin-bottom: 10px;
  //align-items: center;
}

.label {
  padding: 5px 0 0 1em;
  //width: 28%;
}

.prop-component {
  //width: 70%;
}

</style>