import React from 'react'
import { createPortal } from 'react-dom'

import { className, xorGate } from '@/utils'
import { useLayoutContext } from '@/context/layoutContext'

import { ModalProps as Props } from './types/Modal.modal'

import Button from './Button'
import Icon from './Icon'

import styles from '@styles/UI/Modal.module.scss'

export default function Modal(props: Props) {
	const { mainContainerRef } = useLayoutContext()

	const modalStyles = className(styles.modal, props.className)

	if (!props.show || !mainContainerRef?.current) return <></>

	function closeButtonClickHandler() {
		if (props.getState) props.getState(false)
	}
	return createPortal(
		<>
			<dialog open={true} className={modalStyles}>
				<div className={styles['modal-bar']}>
					<span>{props.title}</span>
					{props.allowClosing && (
						<Button className="close-button" onClick={closeButtonClickHandler} variant="redirect">
							<Icon type="x" alt="close icon" />
						</Button>
					)}
				</div>
				<div className={styles['modal-content']}>{props.children}</div>
			</dialog>
			<div className={styles.background}></div>
		</>,
		mainContainerRef?.current
	)
}
