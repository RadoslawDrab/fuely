import React, { useState } from 'react'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import Modal from '@/components/UI/Modal'

import styles from '@styles/pages/Item/RemoveButton.module.scss'

interface Props {
	onClick: () => void
	event: string
}
export default function RemoveButton(props: Props) {
	const [confirmationIsOpen, setConfirmationIsOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setConfirmationIsOpen(true)} className={styles.button} variant="error">
				<Icon type="xmark" alt="remove icon" />
				<span>Remove</span>
			</Button>
			<Modal title="Confirmation" show={confirmationIsOpen} type="center" className={styles.modal}>
				<p>
					Remove <span>{props.event}</span> event
				</p>
				<form onSubmit={(event) => event.preventDefault()}>
					<Button onClick={props.onClick} variant="error">
						Yes
					</Button>
					<Button onClick={() => setConfirmationIsOpen(false)}>No</Button>
				</form>
			</Modal>
		</>
	)
}
