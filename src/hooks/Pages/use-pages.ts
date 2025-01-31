import { useRouter } from 'next/router'

import useAppContext from '../Other/use-app-context'

import { Page, Pages, Path } from './types/Pages.modal'

export default function usePages(): Pages {
	const router = useRouter()

	const {
		state: { isLoggedIn }
	} = useAppContext().Auth

	const allPages: Page[] = [
		{
			name: 'home',
			display: 'Homepage',
			icon: 'house',
			path: '/',
			condition: () => true
		},
		{
			name: 'dashboard',
			display: 'Dashboard',
			icon: 'chart-line',
			path: '/dashboard',
			condition: () => isLoggedIn
		},
		{
			name: 'refuel',
			display: 'Refuel',
			icon: 'gas-pump',
			path: '/refuel',
			condition: () => isLoggedIn
		},
		{
			name: 'vehicles',
			display: 'Vehicles',
			icon: 'car-profile',
			path: '/vehicles',
			condition: () => isLoggedIn
		},
		{
			name: 'login',
			display: 'Log in',
			icon: 'user',
			path: '/login',
			condition: () => !isLoggedIn
		},
		{
			name: 'register',
			display: 'Register',
			icon: 'user-plus',
			path: '/register',
			condition: () => !isLoggedIn
		},
		{
			name: 'settings',
			display: 'Settings',
			icon: 'gear',
			path: '/settings',
			condition: () => isLoggedIn
		}
	]
	const availablePages: Page[] = allPages.filter((page) => page.condition())
	const currentPage: Page | undefined = allPages.find((page) => page.path === router.pathname)

	async function redirect(path: Path, type: 'push' | 'replace' = 'push') {
		await router[type](path)
		document.body.scrollTo({ behavior: 'smooth', top: 0 })
	}

	return { allPages, availablePages, currentPage, redirect }
}
