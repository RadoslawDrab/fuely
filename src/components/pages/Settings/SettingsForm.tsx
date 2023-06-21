import React, { useEffect, useState } from 'react'

import useAppContext from '@/hooks/use-app-context'
import { getCurrencies, currencies as availableCurrencies } from '@/utils'

import FormInput from '@/components/UI/FormInput'
import Button from '@/components/UI/Button'
import Select from '@/components/UI/Select'
import Input from '@/components/UI/Input'

import styles from '@styles/pages/Settings/SettingsForm.module.scss'
import defaultStyles from '@styles/styles.module.scss'

interface Props {
	onSubmit: (displayName: string, unit: string, currency: string) => void
}
export default function SettingsForm(props: Props) {
	const { user } = useAppContext().Auth

	const [currencies, setCurrencies] = useState<string[]>([])
	const [selectedCurrency, setSelectedCurrency] = useState<string>(user.settings.currency)
	const [userName, setUserName] = useState<string>(user.displayName)
	const [unitSystem, setUnitSystem] = useState<string>(user.settings.units)

	useEffect(() => {
		getCurrencies().then((currencies) => {
			const c = Object.keys(currencies).filter((currency) => availableCurrencies.find((c) => c === currency))
			setCurrencies(c)
		})
	}, [])

	const currencyOptions = currencies.map((c) => ({ name: c.toUpperCase(), value: c, selected: c === selectedCurrency }))

	function currencyValueHandler(value: string) {
		setSelectedCurrency(value)
	}
	function userNameValueHandler(value: string) {
		setUserName(value)
	}
	function unitSystemChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setUnitSystem(e.target.id.replace('units-input_', ''))
	}
	function onSubmit(e: React.MouseEvent<HTMLFormElement>) {
		e.preventDefault()
		props.onSubmit(userName, unitSystem, selectedCurrency)
	}
	return (
		<form className={defaultStyles.form} onSubmit={onSubmit}>
			<FormInput id="name" text="Name" type="text" getValue={userNameValueHandler} defaultValue={user.displayName} notRequired />
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
