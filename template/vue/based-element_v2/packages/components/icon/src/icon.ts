// 存放组件的props和公共的方法
import type {ExtractDefaultPropTypes} from "vue";

export const iconProps = {
  size: {
    type: Number
  },
  color: {
    type: String
  }
} as const

export type IconProps = ExtractDefaultPropTypes<typeof iconProps>