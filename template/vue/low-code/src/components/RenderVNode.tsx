import {defineComponent, h, PropType, VNode} from "vue";

const RenderVNode = defineComponent({
    name: 'render-vnode',
    props: {
        VNode: {
            type: [Object, String] as PropType<VNode | String>,
            required: true
        }
    },
    setup(props) {
        return () => (
            typeof props.VNode === 'object'
                ? h(props.VNode) // 如果是 VNode 对象，使用 h 函数进行渲染
                : <div>{props.VNode}</div> // 如果是字符串，直接渲染
        )
    }
})

export default RenderVNode;
