import React, { useEffect, useState } from 'react'

import useEvents from '@/hooks/Events/use-events'
import useAppContext from '@/hooks/Other/use-app-context'
import useUnit from '@/hooks/Other/use-unit'
import { checkIfStringIsNumber, className, round } from '@/utils'
import { currencies } from '@/utils/currency'
import { getMessage } from '@/utils/messages'

import { RefuelFormProps as Props, RefuelFormData } from './types/RefuelForm.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'
import Select from '@/components/UI/Select'

import styles from '@styles/styles.module.scss'

export default function RefuelForm(props: Props) {
	const { user } = useAppContext().Auth
	const { getText } = useAppContext().Language
	const { getEvent } = useEvents()
	const { convert, isMetric, units } = useUnit()

	const [data, setData] = useState<RefuelFormData>({
		cost: round(props.default?.cost ?? 0, 2),
		currency: props.default?.currency ?? user.settings.currency ?? 'usd',
		fuel: round(props.default?.fuel ?? 0, 2),
		odometer: Math.round(props.default?.odometer ?? 0),
		date: props.default?.date ?? new Date().toLocaleDateString('en-CA')
	})
	const [dataUpdated, setDataUpdated] = useState<boolean>(false)

	const currencyOptions = currencies.map((c) => ({
		name: c.toUpperCase(),
		value: c,
		selected: c === data.currency
	}))

	useEffect(() => {
		if (!props.default?.odometer)
			getEvent(0)
				.then((event) => {
					if (event)
					updateData('odometer', event.odometer)
				})
				.catch((error) => {})
	}, [getEvent, props.default?.odometer])

	function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (dataUpdated)
			props.onSubmit({
				...data,
				fuel: !isMetric ? convert(data.fuel, 'fuel', true) : data.fuel,
				odometer: !isMetric ? convert(data.odometer, 'distance', true) : data.odometer
			})
		else props.onSubmit(null)
	}
	// Checks if value is proper number and is greater than 0
	function textInputsCheck(value: string) {
		return checkIfStringIsNumber(value) && +value >= 0
	}
	function updateData<Prop extends keyof RefuelFormData>(prop: Prop, value: any) {
		setData((values) => ({ ...values, [prop]: value }))
		setDataUpdated(true)
	}

	return (
		<form onSubmit={onFormSubmit} className={className(styles.form, styles.columns)}>
			<FormInput
				id="cost-input"
				type="number"
				text={getText('Cost')}
				min={0}
				placeholder={data.currency.toUpperCase()}
				getValue={(value) => updateData('cost', +value)}
				defaultValue={round(data.cost, 2)}
				check={textInputsCheck}
				errorText={getMessage('invalid-amount').text}
				inputData={{ step: 0.01 }}
				rightText={data.currency.toUpperCase()}
			/>
			<label htmlFor="currency-select">{getText('Currency')}</label>
			<Select id="currency-select" getValue={(value) => updateData('currency', value)} options={currencyOptions} />
			<FormInput
				id="fuel-input"
				type="number"
				text={getText('Fuel')}
				placeholder={units.fuel}
				min={0}
				getValue={(value) => updateData('fuel', +value)}
				defaultValue={round(data.fuel, 2)}
				check={textInputsCheck}
				errorText={getMessage('invalid-amount').text}
				inputData={{ step: 0.01 }}
				rightText={units.fuel}
			/>
			<FormInput
				id="odometer-input"
				type="number"
				text={getText('Odometer')}
				placeholder={units.distance}
				min={0}
				getValue={(value) => updateData('odometer', +value)}
				value={Math.round(data.odometer)}
				check={textInputsCheck}
				errorText={getMessage('invalid-amount').text}
				rightText={units.distance}
			/>
			<FormInput
				id="date-input"
				type="date"
				text={getText('Date')}
				getValue={(value) => updateData('date', value)}
				value={data.date}
			/>
			<Button type="submit" className={styles['submit-button']} variant="accent">
				{getText('Add')}
			</Button>
		</form>
	)
}
