import { Icons } from '@/types/UI/Icon.modal'

export interface NavigationButton {
	name: string
	display: string
	icon: Icons
	path: string | null
	condition: () => boolean
	func?: (...params: any) => any
}
