import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useLayoutContext } from '@/context/layoutContext'
import { className, getProp } from '@/utils'

import { NotificationProps } from './types/Notification.modal'
import { Icons } from './types/Icon.modal'

import Button from './Button'
import Icon from './Icon'

import styles from '@styles/UI/Notification.module.scss'

export default function Notification(props: NotificationProps) {
	const notificationRef = useRef<HTMLLIElement>(null)
	const [show, setShow] = useState(true)

	const { headerRef } = useLayoutContext()

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

	function onClose() {
		setShow(false)

		if (props.onClose && notificationRef.current) {
			// Duration string
			const durationString = window.getComputedStyle(notificationRef.current).animationDuration
			// Duration in ms
			const duration = +durationString.replaceAll(/[a-zA-Z]/g, '') * 1000

			// Runs `onClose` function delayed based on animation duration
			const timeout = setTimeout(() => {
				if (props.onClose) props.onClose(props.index)
				clearTimeout(timeout)
			}, duration)
		}
	}
	return createPortal(
		<li ref={notificationRef} className={notificationStyles}>
			<Icon className={styles['notification-icon']} type={notificationIconType} alt="info icon" />
			<div className={styles.content}>
				<span className={styles.title}>{props.title ?? 'Notification'}</span>
				{props.children}
			</div>
			<Button className={styles['close-button']} onClick={onClose} variant={'redirect'}>
				<Icon type="x" alt="close icon" />
			</Button>
		</li>,
		parentContainer,
		props.notificationKey
	)
}
