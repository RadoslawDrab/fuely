import { NotificationType } from '@/components/UI/types/Notification.modal'

export interface NotificationData extends Notification {
	index: number
}
export interface Notification {
	type: NotificationType
	title?: string
	content: any
	timer?: number
}
export interface NotificationObject {
	readonly firstTimedNotification: NotificationData | null
	addNotification: (notification: Notification, atTheEnd?: boolean, index?: number) => number
	removeNotification: (index: number) => void
	getNotifications: () => NotificationData[]
	getNotification: (index: number) => NotificationData | null
	removeAllNotifications: () => void
	removeAllOfType: (type: NotificationType) => void
}
