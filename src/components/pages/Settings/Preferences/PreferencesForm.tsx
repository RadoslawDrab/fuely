import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { currencies } from '@/utils/currency'
import { getMessage } from '@/utils/messages'

import { PreferencesFormProps as Props, PreferencesFormSettings as Settings } from '../types/PreferencesSection.modal'
import { units } from '@/pages/api/data/types/index.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'
import Select from '@/components/UI/Select'

import defaultStyles from '@styles/styles.module.scss'

export default function PreferencesForm(props: Props) {
	const { user } = useAppContext().Auth
	const { getText } = useAppContext().Language

	const [settings, setSettings] = useState<Settings>({
		displayName: user.displayName,
		units: user.settings.units,
		currency: user.settings.currency
	})

	const unitsOptions = units.map((unit) => ({
		name: getText((unit.substring(0, 1).toUpperCase() + unit.substring(1) + ' system') as any),
		value: unit,
		selected: unit === settings.units ?? unit === user.settings.units
	}))
	const currencyOptions = currencies.map((currency) => ({
		name: currency.toUpperCase(),
		value: currency,
		selected: currency === settings.currency
	}))

	function displayNameValueHandler(value: string) {
		setSettings((prevSettings) => ({ ...prevSettings, displayName: value }))
	}
	function unitsValueHandler(value: string) {
		const units: any = value
		setSettings((prevSettings) => ({ ...prevSettings, units }))
	}
	function currencyValueHandler(value: string) {
		const currency: any = value
		setSettings((prevSettings) => ({ ...prevSettings, currency }))
	}
	function onSubmit(e: React.MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		const { displayName, units, currency } = settings

		// Sends data to parent
		props.onFormSubmit(displayName, units, currency)

		// Resets component's settings state
		setSettings({ displayName: null, units: null, currency: null })
	}

	return (
		<form className={defaultStyles.form} onSubmit={onSubmit}>
			<FormInput
				id="name"
				text={getText('Username')}
				type="text"
				getValueOnBlur={displayNameValueHandler}
				defaultValue={user.displayName}
				placeholder={user.displayName}
				notRequired
				inputData={{ title: getMessage('invalid-name').text }}
				icon="identification-card"
			/>
			<label htmlFor="units-select">{getText('Units')}</label>
			<Select id="units-select" getValue={unitsValueHandler} options={unitsOptions} />
			<label htmlFor="currency-select">{getText('Currency')}</label>
			<Select id="currency-select" getValue={currencyValueHandler} options={currencyOptions} />
			<hr />
			<Button type="submit" className={defaultStyles['submit-button']} variant="accent">
				{getText('Save')}
			</Button>
		</form>
	)
}
