export type NotificationType = 'info' | 'error' | 'success' | 'default'

export interface NotificationProps {
	title?: string
	parentNode?: Element | DocumentFragment
	notificationKey?: string
	children?: any
	onClose?: (index: number) => void
	type?: NotificationType
	index: number
}
