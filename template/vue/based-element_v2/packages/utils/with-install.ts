import type {PluginObject} from "vue";
export type SFCWithInstall<T> = T&PluginObject<T>

export const withInstall = <T>(component:T) => {
  (component as SFCWithInstall<T>).install = function (app) {
    // @ts-ignore
    app.component((component as any).name, component)
  }
  return component
}