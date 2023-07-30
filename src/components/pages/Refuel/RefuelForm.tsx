import React, { useEffect, useState } from 'react'

import useEvents from '@/hooks/Events/use-events'
import useAppContext from '@/hooks/Other/use-app-context'
import { checkIfStringIsNumber } from '@/utils'
import { currencies } from '@/utils/currency'
import { getMessage } from '@/utils/messages'

import { RefuelFormProps as Props, RefuelFormData } from './types/RefuelForm.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'
import Select from '@/components/UI/Select'

import styles from '@styles/styles.module.scss'

export default function RefuelForm(props: Props) {
	const { user } = useAppContext().Auth
	const { getEvent } = useEvents()

	const [data, setData] = useState<RefuelFormData>({
		cost: props.default?.cost ?? 0,
		currency: props.default?.currency ?? user.settings.currency ?? 'usd',
		fuel: props.default?.fuel ?? 0,
		odometer: props.default?.odometer ?? 0,
		date: props.default?.date ?? new Date().toLocaleDateString('en-CA')
	})

	const currencyOptions = currencies.map((c) => ({
		name: c.toUpperCase(),
		value: c,
		selected: c === data.currency
	}))

	useEffect(() => {
		if (!props.default?.odometer)
			getEvent(0)
				.then((event) => {
					updateData('odometer', event.odometer)
				})
				.catch((error) => {})
	}, [getEvent, props.default?.odometer])

	function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		props.onSubmit(data)
	}
	// Checks if value is proper number and is greather than 0
	function textInputsCheck(value: string) {
		return checkIfStringIsNumber(value) && +value >= 0
	}
	function updateData<Prop extends keyof RefuelFormData>(prop: Prop, value: any) {
		setData((values) => ({ ...values, [prop]: value }))
	}

	return (
		<form onSubmit={onFormSubmit} className={styles.form}>
			<FormInput
				id="cost-input"
				type="number"
				text="Cost"
				min={0}
				getValue={(value) => updateData('cost', +value)}
				defaultValue={data.cost}
				check={textInputsCheck}
				errorText={getMessage('invalid-amount').text}
				inputData={{ step: 0.01 }}
			/>
			<FormInput
				id="fuel-input"
				type="number"
				text="Fuel Amount"
				min={0}
				getValue={(value) => updateData('fuel', +value)}
				defaultValue={data.fuel}
				check={textInputsCheck}
				errorText={getMessage('invalid-amount').text}
				inputData={{ step: 0.01 }}
			/>
			<FormInput
				id="odometer-input"
				type="number"
				text="Odometer"
				min={0}
				getValue={(value) => updateData('odometer', +value)}
				value={data.odometer}
				check={textInputsCheck}
				errorText={getMessage('invalid-amount').text}
			/>
			<FormInput id="date-input" type="date" text="Date" getValue={(value) => updateData('date', value)} value={data.date} />
			<label htmlFor="currency-select">Currency</label>
			<Select id="currency-select" getValue={(value) => updateData('currency', value)} options={currencyOptions} />
			<Button onClick={() => {}} className={styles['submit-button']}>
				Send
			</Button>
		</form>
	)
}
