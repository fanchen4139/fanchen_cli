import {defineStore} from 'pinia';
import {v4 as uuidV4} from 'uuid';
import {TextComponentProps, ImageComponentProps} from '../defaultProps';
// export interface EditorProps {
//   // 供中间编辑器渲染的数组
//   components: ComponentData[];
//   // 当前编辑的是哪个元素，uuid
//   currentElement: string;
//   // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
//   getCurrentElement: () => HTMLElement;
// }
export interface ComponentData {
    props: Partial<TextComponentProps & ImageComponentProps>;
    id: string;
    name: 'l-text' | 'l-image';
}

export const useEditorStore = defineStore('editor', {
    state: () => ({
        components: [
            {
                id: uuidV4(),
                name: 'l-text',
                props: {
                    text: 'hello',
                    fontSize: '20px',
                    color: '#000000',
                    lineHeight: 1,
                    textAlign: 'left',
                    fontFamily: ''
                }
            },
            {
                id: uuidV4(),
                name: 'l-text',
                props: {
                    text: 'hello2',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    lineHeight: 2,
                    textAlign: 'left',
                    fontFamily: ''
                }
            },
            {
                id: uuidV4(),
                name: 'l-text',
                props: {
                    text: 'hello3',
                    fontSize: '15px',
                    actionType: 'url',
                    // url: 'https://www.baidu.com',
                    lineHeight: 3,
                    textAlign: 'left',
                    fontFamily: ''
                }
            }
        ] as ComponentData[],
        currentElement: '',
    }),
    actions: {
        addComponent(component: ComponentData) {
            this.components.push(component);
        },
        setActive(currentId: string) {
            this.currentElement = currentId;
        },
        updateComponent({key, value}: { key: string, value: any }) {
            const updatedComponent = this.components.find((component: ComponentData) => component.id === this.currentElement);
            if (updatedComponent) {
                updatedComponent.props[key as keyof TextComponentProps] = value;
            }
        },
    },
    getters: {
        getCurrentElement: (state) => {
            return state.components.find(component => component.id === state.currentElement);
        },
    },
});

export default useEditorStore;
