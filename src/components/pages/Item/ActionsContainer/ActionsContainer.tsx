import React from 'react'

import useToggle from '@/hooks/Other/use-toggle'
import useAppContext from '@/hooks/Other/use-app-context'

import { ActionsContainerProps as Props } from '../types/ActionsContainer/ActionsContainer.modal'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'
import EditForm from './EditForm'
import RemoveConfirmationModal from './RemoveConfirmationModal'

import styles from '@styles/pages/Item/ActionsContainer.module.scss'

export default function ActionsContainer(props: Props) {
	const { getText } = useAppContext().Language
	const [isEditing, setIsEditing, toggleIsEditing] = useToggle(false)
	const [showRemoveModal, setShowRemoveModal, toggleShowRemoveModal] = useToggle(false)

	return (
		<div className={styles.container}>
			<Button onClick={toggleIsEditing} className={styles.button} variant="error">
				<Icon type="gear" alt="edit icon" />
				<span>{getText('Edit')}</span>
			</Button>
			<Button onClick={toggleShowRemoveModal} className={styles.button} variant="error">
				<Icon type="x" alt="remove icon" />
				<span>{getText('Remove')}</span>
			</Button>
			<EditForm show={isEditing} setShow={setIsEditing} currentEvent={props.currentEvent} onSubmit={props.onEventEdit} />
			<RemoveConfirmationModal
				removalDate={props.currentEvent.date}
				isShown={showRemoveModal}
				setIsShown={setShowRemoveModal}
				onConfirm={props.onEventRemove}
			/>
		</div>
	)
}
