export interface ModalProps {
	children?: any
	show: boolean
	allowClosing?: boolean
	className?: string
	title: string
	getState?: (isOpen: boolean) => void
}
