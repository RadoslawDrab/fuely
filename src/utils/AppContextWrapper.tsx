import React from 'react'
import { AppContext } from '@/context/appContext'

import useLanguage from '@/hooks/Language/use-language'
import useNavigation from '@/hooks/Navigation/use-navigation'
import useTheme from '@/hooks/Theme/use-theme'
import useAuth from '@/hooks/Auth/use-auth'

interface Props {
	children?: any
}
function AppContextWrapper(props: Props) {
	const Language = useLanguage()
	const Theme = useTheme()
	const Navigation = useNavigation()
	const Auth = useAuth()

	return <AppContext.Provider value={{ Language, Theme, Navigation, Auth }}>{props.children}</AppContext.Provider>
}

export default AppContextWrapper
