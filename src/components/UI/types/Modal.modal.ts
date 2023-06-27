export interface ModalProps {
	children?: any
	show: boolean
	allowClosing?: boolean
	className?: string
	type?: 'center' | 'flow'
	title: string
	state?: (isOpen: boolean) => void
}
