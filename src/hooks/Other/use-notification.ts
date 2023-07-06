import { useState } from 'react'

import { NotificationType } from '@/components/UI/types/Notification.modal'
import { NotificationData, Notification } from './types/Notification.modal'

export default function useNotification() {
	const [notifications, setNotifications] = useState<NotificationData[]>([])

	function addNotification(notification: Notification, back: boolean = false, index?: number): number {
		// Checks if `index` prop is in range of 0 to 10000
		const isInRange: boolean = index !== undefined && index >= 0 && index < 10000

		// Checks if notification exists. If so returns function `index` prop
		if (isInRange && index && notifications.find((not) => not.index === index)) {
			return index
		}

		// Checks if `index` prop is in range of 0 to 10000. If so then sets it as notification index. Otherwise creates random number between 10000 and 20000
		const notificationIndex = isInRange && index !== undefined ? index : 10000 + Math.round(Math.random() * 10000)
		// Checks if title is not empty and is not default. If so sets `notificationTitle` to `title` prop. Otherwise creates new title with first letter uppercase
		const notificationTitle =
			notification.title || notification.type === 'default'
				? notification.title
				: notification.type[0].toUpperCase() + notification.type.slice(1)

		const newNotification = {
			...notification,
			index: notificationIndex,
			title: notificationTitle
		}
		// Reverses appending to array based on `back` prop
		const newNotifications = back ? [...notifications, newNotification] : [newNotification, ...notifications]

		setNotifications(newNotifications)
		return newNotification.index
	}
	function removeNotification(index: number) {
		setNotifications(notifications.filter((not) => not.index !== index))
	}
	function removeAllNotifications() {
		setNotifications([])
	}
	function removeAllOfType(type: NotificationType) {
		setNotifications(notifications.filter((not) => not.type !== type))
	}
	function getNotifications() {
		return notifications
	}
	return { addNotification, removeNotification, getNotifications, removeAllNotifications, removeAllOfType }
}
