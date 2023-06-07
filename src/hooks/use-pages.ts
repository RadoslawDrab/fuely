import { useRouter } from 'next/router'

import { Page, Pages } from './Pages.modal'
import useAppContext from './use-app-context'

export default function usePages(): Pages {
	const router = useRouter()

	const {
		state: { isLoggedIn }
	} = useAppContext().Auth

	const allPages: Page[] = [
		{
			name: 'home',
			display: 'Home',
			icon: 'house',
			path: '/',
			condition: () => true
		},
		{
			name: 'about',
			display: 'About',
			icon: 'gearshape',
			path: '/about',
			condition: () => true
		},
		{
			name: 'dashboard',
			display: 'Dashboard',
			icon: 'rectangle.3.group',
			path: '/dashboard',
			condition: () => isLoggedIn
		},
		{
			name: 'refuel',
			display: 'Refuel',
			icon: 'fuelpump',
			path: '/refuel',
			condition: () => isLoggedIn
		},
		{
			name: 'login',
			display: 'Log in',
			icon: 'person.crop.circle',
			path: '/login',
			condition: () => !isLoggedIn
		},
		{
			name: 'register',
			display: 'Register',
			icon: 'person.crop.circle.badge.plus',
			path: '/register',
			condition: () => !isLoggedIn
		},
		{
			name: 'settings',
			display: 'Settings',
			icon: 'gearshape',
			path: '/settings',
			condition: () => isLoggedIn
		}
	]
	const availablePages: Page[] = allPages.filter((page) => page.condition())
	const currentPage: Page | undefined = allPages.find((page) => page.path === router.pathname)

	return { allPages, availablePages, currentPage }
}
