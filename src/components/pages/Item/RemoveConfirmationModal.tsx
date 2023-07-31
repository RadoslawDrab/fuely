import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import { RemoveConfirmationModalProps as Props } from './types/RemoveConfirmationModal.modal'

import Button from '@/components/UI/Button'
import Modal from '@/components/UI/Modal'

import styles from '@styles/pages/Item/ActionsContainer.module.scss'

export default function RemoveConfirmationModal(props: Props) {
	const { getText } = useAppContext().Language
	return (
		<Modal title="Confirmation" show={props.isShown} className={styles.modal}>
			<p>
				{getText('Remove')} <span>{props.removalDate}</span>
			</p>
			<form onSubmit={(event) => event.preventDefault()}>
				<Button onClick={props.onConfirm} variant="error">
					{getText('Yes')}
				</Button>
				<Button onClick={() => props.setIsShown(false)}>{getText('No')}</Button>
			</form>
		</Modal>
	)
}
