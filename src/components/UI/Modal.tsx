import React from 'react'

import { className } from '@/utils'

import { ModalProps as Props } from './types/Modal.modal'

import Button from './Button'
import Icon from './Icon'

import styles from '@styles/UI/Modal.module.scss'

export default function Modal(props: Props) {
	const modalType = props.type ?? 'flow'
	const modalStyles = className(styles.modal, styles[`modal__${modalType}`], props.className)

	if (!props.show) return <></>

	return (
		<>
			<dialog open={props.show} className={modalStyles}>
				<div className={styles['modal-bar']}>
					<span>{props.title}</span>
					{props.allowClosing && (
						<form method="dialog">
							<Button className="close-button" onClick={() => {}}>
								<Icon type="xmark" alt="close icon" />
							</Button>
						</form>
					)}
				</div>
				<div className={styles['modal-content']}>{props.children}</div>
			</dialog>
			{props.show && modalType === 'center' && <div className={styles['modal-background']}></div>}
		</>
	)
}
