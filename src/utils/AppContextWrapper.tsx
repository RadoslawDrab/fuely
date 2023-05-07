import { AppContext } from '@/context/appContext'
import useLanguage from '@/hooks/use-language'
import useNavigation from '@/hooks/use-navigation'
import useTheme from '@/hooks/use-theme'
import React from 'react'

interface Props {
	children?: any
}
function AppContextWrapper(props: Props) {
	const Language = useLanguage()
	const Theme = useTheme()
	const Navigation = useNavigation()
	return <AppContext.Provider value={{ Language, Theme, Navigation }}>{props.children}</AppContext.Provider>
}

export default AppContextWrapper
