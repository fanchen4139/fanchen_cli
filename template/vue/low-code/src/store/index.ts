import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { useTemplatesStore } from './templates';
import { useEditorStore } from './editor';
// export interface GlobalDataProps {
//   user: UserProps;
//   templates: TemplatesProps;
//   editor: EditorProps;
// }
export const useGlobalStore = defineStore('global', {
  state: () => ({
    user: useUserStore(),
    templates: useTemplatesStore(),
    editor: useEditorStore(),
  }),
});
