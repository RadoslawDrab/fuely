import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import { EditFormProps as Props } from '../types/ActionsContainer/EditForm.modal'
import { RefuelFormData } from '../../Refuel/types/RefuelForm.modal'

import Modal from '@/components/UI/Modal'
import RefuelForm from '../../Refuel/RefuelForm'
import VehicleSelector from '@comp/Layout/Dashboard/VehicleSelector.tsx'

export default function EditForm(props: Props) {
	const { getText } = useAppContext().Language
	const vehicle = useAppContext().Vehicle
	const [vehicleId, setVehicleId] = useState<string | null>(vehicle.currentVehicle?.id ?? null)

	function onSubmit(data: RefuelFormData | null) {
		props.setShow(false)
		props.onSubmit(data, vehicleId)
	}
	return (
		<Modal show={props.show} getState={(state) => props.setShow(state)} title={getText('Edit')} allowClosing>
			<VehicleSelector allowNull chooseOnly onInput={(v) => setVehicleId(v)} />
			<RefuelForm onSubmit={onSubmit} default={props.currentEvent} />
		</Modal>
	)
}
