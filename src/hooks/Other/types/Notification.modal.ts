import { NotificationType } from '@/components/UI/types/Notification.modal'

export interface NotificationData extends Notification {
	index: number
}
export interface Notification {
	type: NotificationType
	title?: string
	content: any
}
