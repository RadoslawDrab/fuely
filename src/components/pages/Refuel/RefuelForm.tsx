import React, { useEffect, useState } from 'react'

import { checkIfStringIsNumber, getSessionStorage } from '@/utils'
import useAppContext from '@/hooks/use-app-context'
import useEvents from '@/hooks/use-events'
import { Event, FullEvent } from '@/hooks/Events.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'

// import styles from './RefuelForm.module.scss';
import styles from '@styles/styles.module.scss'

interface Props {
	onSubmit: (event: Event, date: string) => void
}
export default function RefuelForm(props: Props) {
	const formData: FullEvent | null = getSessionStorage()?.formData

	const { user } = useAppContext().Auth
	const { getEvent } = useEvents()

	const [cost, setCost] = useState(formData?.cost ?? 0)
	const [currency, setCurrency] = useState(formData?.currency || user.settings.currency || 'usd')
	const [fuel, setFuel] = useState(formData?.fuel ?? 0)
	const [fuelPercent, setFuelPercent] = useState(formData?.fuelPercent ?? 100)
	const [odometer, setOdometer] = useState(formData?.odometer ?? 0)
	const [date, setDate] = useState(formData?.date ?? new Date().toLocaleDateString('en-CA'))

	useEffect(() => {
		if (!formData?.odometer)
			getEvent(0)
				.then((event) => {
					setOdometer(event.odometer)
				})
				.catch((error) => {})
	}, [getEvent, formData?.odometer])
	useEffect(() => {
		if (!formData?.currency) setCurrency(user.settings.currency)
	}, [user.settings.currency, formData?.currency])

	function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		props.onSubmit(
			{
				distance: 0,
				cost,
				currency: currency.toLowerCase(),
				fuel,
				fuelPercent,
				odometer
			},
			date
		)
	}
	// Checks if value is proper number and is greather than 0
	function textInputsCheck(value: string) {
		return checkIfStringIsNumber(value) && +value >= 0
	}

	return (
		<form onSubmit={onFormSubmit} className={styles.form}>
			<FormInput
				name="cost"
				type="text"
				text="Cost"
				min={0}
				getValue={(value) => setCost(!isNaN(+value) ? +value : 0)}
				defaultValue={cost}
				check={textInputsCheck}
				errorText="Invalid amount"
			/>
			<FormInput
				name="fuel"
				type="text"
				text="Fuel Amount"
				min={0}
				getValue={(value) => setFuel(!isNaN(+value) ? +value : 0)}
				defaultValue={fuel}
				check={textInputsCheck}
				errorText="Invalid amount"
			/>
			<FormInput
				name="odometer"
				type="number"
				text="Odometer"
				min={0}
				getValue={(value) => setOdometer(+value)}
				defaultValue={odometer}
				check={textInputsCheck}
				errorText="Invalid amount"
			/>
			<FormInput name="date" type="date" text="Date" getValue={(value) => setDate(value)} defaultValue={date} />
			<FormInput
				name="fuel-percent"
				type="number"
				text="Fuel Percent"
				min={0}
				max={100}
				getValue={(value) => setFuelPercent(+value)}
				defaultValue={fuelPercent}
				check={textInputsCheck}
				errorText="Invalid amount"
			/>
			<FormInput name="currency" type="text" text="Currency" getValue={(value) => setCurrency(value)} defaultValue={currency} />
			<Button onClick={() => {}}>Send</Button>
		</form>
	)
}
