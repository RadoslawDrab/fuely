import React, { useState } from 'react'

import useAppContext from '@/hooks/use-app-context'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import Modal from '@/components/UI/Modal'

import styles from '@styles/pages/Item/RemoveButton.module.scss'

interface Props {
	onClick: () => void
	event: string
}
export default function RemoveButton(props: Props) {
	const { getText } = useAppContext().Language
	const [confirmationIsOpen, setConfirmationIsOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setConfirmationIsOpen(true)} className={styles.button} variant="error">
				<Icon type="xmark" alt="remove icon" />
				<span>{getText('Remove')}</span>
			</Button>
			<Modal title="Confirmation" show={confirmationIsOpen} type="center" className={styles.modal}>
				<p>
					{getText('Remove')} <span>{props.event}</span>
				</p>
				<form onSubmit={(event) => event.preventDefault()}>
					<Button onClick={props.onClick} variant="error">
						{getText('Yes')}
					</Button>
					<Button onClick={() => setConfirmationIsOpen(false)}>{getText('No')}</Button>
				</form>
			</Modal>
		</>
	)
}
