import { Icons } from '@/components/UI/types/Icon.modal'
import { Texts } from '../../Language/types/Language.modal'

export type Path = '/' | '/login' | '/register' | '/refuel' | '/dashboard' | '/settings'
export interface Page {
	name: string
	display: Texts
	path: Path
	icon: Icons
	condition: () => boolean
}
export interface Pages {
	allPages: Page[]
	availablePages: Page[]
	currentPage: Page | undefined
	redirect: (path: Path, type?: 'push' | 'replace') => Promise<void>
}
