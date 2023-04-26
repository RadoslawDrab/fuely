import { AppContext } from '@/context/appContext'
import useLanguage from '@/hooks/use-language'
import useTheme from '@/hooks/use-theme'
import React from 'react'

interface Props {
	children?: any
}
function AppContextWrapper(props: Props) {
	const Language = useLanguage()
	const Theme = useTheme()
	return <AppContext.Provider value={{ Language, Theme }}>{props.children}</AppContext.Provider>
}

export default AppContextWrapper
