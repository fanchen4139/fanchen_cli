import {computed} from 'vue'
import {pick} from 'lodash-es'
import {CommonComponentProps, TextComponentProps} from '../defaultProps'

type ComponentProps<T> = Readonly<Partial<T> & Pick<CommonComponentProps, 'actionType' | 'url'>>
const useComponentCommon = <T = TextComponentProps>(props: ComponentProps<T>, picks: string[]) => {
    const styleProps = computed(() => pick(props, picks))
    const handleClick = () => {
        if (props.actionType === 'url' && props.url) {
            window.location.href = props.url
        }
    }
    return {
        styleProps,
        handleClick
    }
}

export default useComponentCommon