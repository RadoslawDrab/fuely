import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import { EditFormProps as Props } from '../types/ActionsContainer/EditForm.modal'
import { RefuelFormData } from '../../Refuel/types/RefuelForm.modal'

import Modal from '@/components/UI/Modal'
import RefuelForm from '../../Refuel/RefuelForm'

export default function EditForm(props: Props) {
	const { getText } = useAppContext().Language

	function onSubmit(data: RefuelFormData | null) {
		props.setShow(false)
		if (data) props.onSubmit(data)
	}
	return (
		<Modal show={props.show} getState={(state) => props.setShow(state)} title={getText('Edit')} allowClosing>
			<RefuelForm onSubmit={onSubmit} default={props.currentEvent} />
		</Modal>
	)
}
