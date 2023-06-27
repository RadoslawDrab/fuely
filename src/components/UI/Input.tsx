import React from 'react'

import { className, createDatasetObject } from '@/utils'

import { InputProps as Props } from '@/components/UI/types/Input.modal'

import styles from '@styles/UI/Input.module.scss'

export default function Input(props: Props) {
	const inputStyles = className(styles.input, props.className)

	const data = props.data ? createDatasetObject(props.data) : {}
	return (
		<input
			id={props.id}
			className={inputStyles}
			name={props.name}
			type={props.type}
			placeholder={props.placeholder}
			defaultValue={props.defaultValue}
			checked={props.checked}
			defaultChecked={props.defaultChecked}
			onChange={props.onChange}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			disabled={props.disabled}
			max={props.max}
			maxLength={props.max}
			min={props.min}
			minLength={props.min}
			{...data}
		/>
	)
}
