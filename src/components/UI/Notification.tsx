import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useLayoutContext } from '@/context/layoutContext'
import { className, getProp } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context'

import { NotificationProps } from './types/Notification.modal'
import { Icons } from './types/Icon.modal'

import Button from './Button'
import Icon from './Icon'

import styles from '@styles/UI/Notification.module.scss'

function Notification(props: NotificationProps) {
	const notificationRef = useRef<HTMLLIElement>(null)
	const [show, setShow] = useState(true)
	const [timer, setTimer] = useState(0)

	const { headerRef } = useLayoutContext()
	const { removeNotification, firstTimedNotification } = useAppContext().Notification

	const closeAnimDuration = (() => {
		if (notificationRef.current) {
			// Duration string
			const durationString = window.getComputedStyle(notificationRef.current).animationDuration
			// Duration in ms
			const duration = +durationString.replaceAll(/[a-zA-Z]/g, '') * 1000
			return duration
		}
		return 0
	})()

	const onClose = useCallback(() => {
		setShow(false)

		if (notificationRef.current) {
			const timeout = setTimeout(() => {
				// Removes notification delayed based on animation duration
				removeNotification(props.index)
				clearTimeout(timeout)
			}, closeAnimDuration)
		}
	}, [closeAnimDuration, props.index, removeNotification])

	useEffect(() => {
		// Checks if first notification with timer has the same index as this component
		if (firstTimedNotification && firstTimedNotification.index === props.index) {
			// Time from timer substracting animation time
			const time =
				(firstTimedNotification.timer && firstTimedNotification.timer > 0 ? firstTimedNotification.timer : 0) - closeAnimDuration
			setTimer(time)

			// Enables close animation after timer end
			if (notificationRef.current) {
				const timeout = setTimeout(() => {
					onClose()
					clearTimeout(timeout)
				}, time)
			}
		}
	}, [closeAnimDuration, firstTimedNotification, onClose, props.index])

	const parentContainer = props.parentNode || headerRef?.current?.querySelector('ul.notifications')
	if (!parentContainer) {
		return
	}

	const notificationStyles = className(
		styles.notification,
		show ? styles.show : styles.hide,
		getProp(styles, 'notification-' + props.type ?? 'default')
	)
	const notificationIconType: Icons = (() => {
		switch (props.type) {
			case 'success':
				return 'check'
			case 'error':
				return 'x'
			case 'info':
				return 'info'
			default:
				return 'bell'
		}
	})()

	return createPortal(
		<li ref={notificationRef} className={notificationStyles}>
			<Icon className={styles['notification-icon']} type={notificationIconType} alt={`${props.type} icon`} />
			<div className={styles.content}>
				<span className={styles.title}>{props.title ?? 'Notification'}</span>
				{props.children}
			</div>
			<Button className={styles['close-button']} onClick={onClose} variant={'redirect'}>
				<Icon type="x" alt="close icon" />
			</Button>
			{timer > 0 && <div className={styles.timer} style={{ animationDuration: `${timer}ms` }}></div>}
		</li>,
		parentContainer,
		props.notificationKey
	)
}
export default Notification
