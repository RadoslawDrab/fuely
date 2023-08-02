import { Icons } from './Icon.modal'

export interface FloatingButtonProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
	text: string
	iconType: Icons
	iconAlt: string
	useParent?: boolean
}
