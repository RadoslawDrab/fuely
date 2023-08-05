import { useState } from 'react'

import { getText } from '../Language/use-language'
import { isClient } from '@/utils'

import { NotificationType } from '@/components/UI/types/Notification.modal'
import { NotificationData, Notification, NotificationObject } from './types/Notification.modal'

export default function useNotification(): NotificationObject {
	const [notifications, setNotifications] = useState<NotificationData[]>([])
	const currentLang = isClient() ? document.querySelector('html')?.lang || 'en' : 'en'
	const firstTimedNotification = notifications.find((notification) => notification.timer && notification.timer > 0) ?? null

	function addNotification(notification: Notification, synchronousTimer: boolean = true, index?: number): number {
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
				: getText((notification.type[0].toUpperCase() + notification.type.slice(1)) as any, currentLang)

		setNotifications((notifications) => {
			const newNotification = {
				...notification,
				index: notificationIndex,
				title: notificationTitle,
				timer:
					notification.timer !== undefined && notification.timer >= 0 && notification.timer <= 30000 ? notification.timer : 4000
			}
			// Reverses appending to array based on `synchronousTimer` prop.
			// If `synchronousTimer` is true then notification's timer runs no matter the place in `notifications` array
			const newNotifications = synchronousTimer ? [...notifications, newNotification] : [newNotification, ...notifications]
			return newNotifications
		})

		return notificationIndex
	}
	function removeNotification(index: number) {
		setNotifications((notifications) => notifications.filter((not) => not.index !== index))
	}
	function removeAllNotifications() {
		setNotifications([])
	}
	function removeAllOfType(type: NotificationType) {
		setNotifications((notifications) => notifications.filter((not) => not.type !== type))
	}
	function getNotifications() {
		return notifications
	}
	function getNotification(index: number) {
		return notifications.find((notification) => notification.index === index) ?? null
	}
	return {
		firstTimedNotification,
		addNotification,
		removeNotification,
		getNotifications,
		getNotification,
		removeAllNotifications,
		removeAllOfType
	}
}

export const exampleNotificationObject: NotificationObject = {
	firstTimedNotification: {
		index: -1,
		type: 'default',
		content: null
	},
	addNotification: () => -1,
	getNotifications: () => [],
	getNotification: () => null,
	removeNotification: () => {},
	removeAllNotifications: () => {},
	removeAllOfType: () => {}
}
