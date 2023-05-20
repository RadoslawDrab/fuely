import { Icons } from '@/types/UI/Icon.modal'
import { Texts } from './Language.modal'

export interface Page {
	name: string
	display: Texts
	path: string
	icon: Icons
	condition: () => boolean
}
export interface Pages {
	allPages: Page[]
	availablePages: Page[]
	currentPage: Page | undefined
}
