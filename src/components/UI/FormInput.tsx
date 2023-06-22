import React, { useState } from 'react'

import Input from './Input'
import Error from './Error'

import styles from '@styles/styles.module.scss'

interface Props {
	name?: string
	id: string
	text: string
	placeholder?: string
	type: React.HTMLInputTypeAttribute
	notRequired?: boolean
	errorText?: string
	min?: number
	max?: number
	defaultValue?: any
	defaultChecked?: boolean
	getValue?: (value: string) => void
	getValueOnBlur?: (value: string) => void
	check?: (value: string) => boolean
}

export default function FormInput(props: Props) {
	const defaultErrorMessage = `Fill out ${props.text} field`
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(defaultErrorMessage)
	const [isTouched, setIsTouched] = useState(props.defaultValue ? true : false)

	const inputId = `input-${props.id}`

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value

		if (value) {
			props.getValue && props.getValue(value)
			setHasError(() => false)
		}
	}
	function onFocus() {
		setIsTouched(() => true)
	}
	function onBlur(event: React.FocusEvent<HTMLInputElement>) {
		const value = event.currentTarget.value

		if (isTouched && !value && !props.notRequired) {
			setHasError(true)
			setErrorMessage(defaultErrorMessage)
		} else if (isTouched && value && props.check && !props.check(value) && !props.notRequired) {
			setHasError(true)
			setErrorMessage(props.errorText || defaultErrorMessage)
		} else if (isTouched && value && props.check && !props.check(value) && props.notRequired) {
			setHasError(true)
			setErrorMessage(props.errorText || defaultErrorMessage)
		} else {
			if (props.getValueOnBlur) {
				props.getValueOnBlur(value)
			}
		}
	}
	return (
		<>
			<label htmlFor={inputId}>{props.text}</label>
			<Input
				id={inputId}
				type={props.type}
				name={props.name}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				placeholder={props.placeholder ?? props.text}
				min={props.min}
				max={props.max}
				defaultValue={props.defaultValue}
				defaultChecked={props.defaultChecked}
			/>
			<Error className={styles['form-error']} show={hasError} text={errorMessage} />
		</>
	)
}
