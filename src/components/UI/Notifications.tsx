import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import Notification from './Notification'

export default function Notifications() {
	const { removeNotification, getNotifications } = useAppContext().Notification
	const notifications = getNotifications().map((not) => {
		function removeCurrentNotification(index: number) {
			removeNotification(index)
		}
		return (
			<Notification key={not.index} index={not.index} title={not.title} onClose={removeCurrentNotification} type={not.type}>
				{not.content}
			</Notification>
		)
	})
	return <>{notifications}</>
}
