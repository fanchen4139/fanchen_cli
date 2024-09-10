import * as components from '@element-fc_v2/components'

export * from "@element-fc_v2/components";
export default {
  install: (app) => {
    for (const comkey in components) {
      app.component((components as any)[comkey].name, (components as any)[comkey])
    }
  }
}