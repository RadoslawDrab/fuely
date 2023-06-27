import React, { useState } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { currencies } from '@/utils/currency'

import { UserSettingsFormProps as Props, UserSettingsFormSettings as Settings } from '../types/UserSettingsSection.modal'

import Button from '@/components/UI/Button'
import FormInput from '@/components/UI/FormInput'
import Input from '@/components/UI/Input'
import Select from '@/components/UI/Select'

import styles from '@styles/pages/Settings/UserSettingsForm.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function UserSettingsForm(props: Props) {
	const { user } = useAppContext().Auth

	const [settings, setSettings] = useState<Settings>({ displayName: null, units: null, currency: null })

	const currencyOptions = currencies.map((c) => ({
		name: c.toUpperCase(),
		value: c,
		selected: c === user.settings.currency
	}))

	function displayNameValueHandler(value: string) {
		setSettings((prevSettings) => ({ ...prevSettings, displayName: value }))
	}
	function unitSystemChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const unit = e.target.id.replace('units-input_', '')
		setSettings((prevSettings) => ({ ...prevSettings, units: unit }))
	}
	function currencyValueHandler(value: string) {
		setSettings((prevSettings) => ({ ...prevSettings, currency: value }))
	}
	function onSubmit(e: React.MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		const { displayName, units, currency } = settings

		// Sends data to parent
		props.onSubmit(displayName, units, currency)

		// Resets component's settings state
		setSettings({ displayName: null, units: null, currency: null })
	}
	return (
		<form className={defaultStyles.form} onSubmit={onSubmit}>
			<FormInput
				id="name"
				text="Name"
				type="text"
				getValueOnBlur={displayNameValueHandler}
				defaultValue={user.displayName}
				check={(value) => value.length >= 3}
				errorText="Name must contain at least 3 characters"
			/>
			<div className={styles['units-box']}>
				<span>System</span>
				<div>
					<label htmlFor="units-input_metric">Metric</label>
					<Input
						id="units-input_metric"
						name="units-input"
						type="radio"
						onChange={unitSystemChangeHandler}
						defaultChecked={user.settings.units === 'metric'}
					/>
					<label htmlFor="units-input_imperial">Imperial</label>
					<Input
						id="units-input_imperial"
						name="units-input"
						type="radio"
						onChange={unitSystemChangeHandler}
						defaultChecked={user.settings.units === 'imperial'}
					/>
				</div>
			</div>
			<label htmlFor="currency-select">Currency</label>
			<Select id="currency-select" getValue={currencyValueHandler} options={currencyOptions} />
			<hr />
			<Button onClick={() => {}} className={defaultStyles['submit-button']}>
				Save
			</Button>
		</form>
	)
}
