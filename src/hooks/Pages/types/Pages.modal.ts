import { Icons } from '@/components/UI/types/Icon.modal'
import { Texts } from '../../Language/types/Language.modal'

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
