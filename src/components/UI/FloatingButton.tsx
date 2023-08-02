import React from 'react'
import { createPortal } from 'react-dom'

import { useLayoutContext } from '@/context/layoutContext'

import { FloatingButtonProps as Props } from './types/FloatingButton.modal'

import Button from './Button'
import Icon from './Icon'

import styles from '@styles/UI/FloatingButton.module.scss'

export default function FloatingButton(props: Props) {
	const { mainContainerRef } = useLayoutContext()

	const content = (
		<Button className={styles.button} onClick={props.onClick} variant="accent">
			<span>{props.text}</span>
			<Icon type={props.iconType} alt={props.iconAlt} />
		</Button>
	)
	if (props.useParent) return <>{content}</>
	const floatingButtonsContainer = mainContainerRef?.current?.querySelector('.floating-buttons')
	if (!floatingButtonsContainer) return
	return createPortal(content, floatingButtonsContainer)
}
