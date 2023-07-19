import { NotificationType } from '@/components/UI/types/Notification.modal'

export interface NotificationData extends Notification {
	index: number
}
export interface Notification {
	type: NotificationType
	title?: string
	content: any
}
export interface NotificationObject {
	addNotification: (notification: Notification, atTheEnd?: boolean, index?: number) => number
	removeNotification: (index: number) => void
	getNotifications: () => NotificationData[]
	removeAllNotifications: () => void
	removeAllOfType: (type: NotificationType) => void
}
