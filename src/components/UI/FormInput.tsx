import React, { useState } from 'react'

import Input from './Input'
import Error from './Error'

import styles from '@styles/styles.module.scss'

interface Props {
	name: string
	text: string
	placeholder?: string
	type: React.HTMLInputTypeAttribute
	getValue: (value: string) => void
	notRequired?: boolean
}

export default function FormInput(props: Props) {
	const [value, setValue] = useState('')
	const [hasError, setHasError] = useState(false)
	const [isTouched, setIsTouched] = useState(false)

	const inputId = `input-${props.name}`

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value

		if (value) {
			setValue(() => value)
			props.getValue(value)
			setHasError(() => false)
		} else {
			setHasError(() => true)
		}
	}
	function onFocus() {
		setIsTouched(() => true)
	}
	function onBlur() {
		if (isTouched && !value) {
			setHasError(() => true)
		}
	}
	return (
		<>
			<label htmlFor={inputId}>{props.text}</label>
			<Input
				id={inputId}
				type={props.type}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				placeholder={props.placeholder ?? props.text}
			/>
			<Error className={styles['form-error']} show={hasError && !props.notRequired} text={`Fill out ${props.text} field`} />
		</>
	)
}
