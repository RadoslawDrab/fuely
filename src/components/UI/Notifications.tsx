import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import Notification from './Notification'

export default function Notifications() {
	const { getNotifications } = useAppContext().Notification

	const notifications = getNotifications().map((not) => {
		return (
			<Notification key={not.index} index={not.index} title={not.title} type={not.type}>
				{not.content}
			</Notification>
		)
	})

	return <>{notifications}</>
}
