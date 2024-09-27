import { defineStore } from 'pinia';

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}


export const useTemplatesStore = defineStore('templates', {
  state: () => ({
    data: [
      {
        id: 1,
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
        title: 'test title 1',
        author: 'viking',
        copiedCount: 1
      },
      {
        id: 2,
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
        title: '前端架构师直播海报',
        author: 'viking',
        copiedCount: 1
      },
      // 其他模板数据...
    ] as TemplateProps[],
  }),
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find(t => t.id === id);
    },
  },
});

export default useTemplatesStore
