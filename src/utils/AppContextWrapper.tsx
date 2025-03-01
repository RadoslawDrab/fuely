import React from 'react'
import { AppContext } from '@/context/appContext'

import useLanguage from '@/hooks/Language/use-language'
import useNavigation from '@/hooks/Navigation/use-navigation'
import useTheme from '@/hooks/Theme/use-theme'
import useAuth from '@/hooks/Auth/use-auth'
import useNotification from '@/hooks/Other/use-notification'
import useVehicle from '@/hooks/Vehicles/use-vehicle'

interface Props {
	children?: any
}
function AppContextWrapper(props: Props) {
	const Language = useLanguage()
	const Theme = useTheme()
	const Navigation = useNavigation()
	const Auth = useAuth()
	const Notification = useNotification()
	const Vehicle = useVehicle(Auth)

	return <AppContext.Provider value={{ Language, Theme, Navigation, Auth, Notification, Vehicle }}>{props.children}</AppContext.Provider>
}

export default AppContextWrapper
