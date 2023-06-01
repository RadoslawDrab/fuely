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
	errorText?: string
	check?: (value: string) => boolean
}

export default function FormInput(props: Props) {
	const defaultErrorMessage = `Fill out ${props.text} field`
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(defaultErrorMessage)
	const [isTouched, setIsTouched] = useState(false)

	const inputId = `input-${props.name}`

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value

		if (value) {
			props.getValue(value)
			setHasError(() => false)
		}
	}
	function onFocus() {
		setIsTouched(() => true)
	}
	function onBlur(event: React.FocusEvent<HTMLInputElement>) {
		const value = event.currentTarget.value

		if (isTouched && !value) {
			setHasError(() => true)
			setErrorMessage(() => defaultErrorMessage)
		} else if (isTouched && value && props.check && !props.check(value)) {
			setHasError(() => true)
			setErrorMessage(() => props.errorText || defaultErrorMessage)
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
			<Error className={styles['form-error']} show={hasError && !props.notRequired} text={errorMessage} />
		</>
	)
}
