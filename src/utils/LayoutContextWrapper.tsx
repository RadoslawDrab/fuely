import { layoutContext } from '@/context/layoutContext'
import { LayoutContext } from '@/context/layoutContext.modal'

interface WrapperProps {
	children?: any
	value: LayoutContext
}
export function LayoutContextWrapper(props: WrapperProps) {
	return <layoutContext.Provider value={props.value}>{props.children}</layoutContext.Provider>
}
