import { createContext, useContext } from 'react'
import { LayoutContext } from './layoutContext.modal'

export const layoutContext = createContext<LayoutContext>({})

export function useLayoutContext() {
	return useContext(layoutContext)
}
