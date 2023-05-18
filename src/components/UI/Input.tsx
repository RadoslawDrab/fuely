import React from 'react'

import { Props } from '@/types/UI/Input.modal'
import { className, createDatasetObject } from '@/utils'

import styles from '@styles/UI/Input.module.scss'

export default function Input(props: Props) {
	const inputStyles = className(styles.input, props.className)

	const data = props.data ? createDatasetObject(props.data) : {}
	return (
		<input
			id={props.id}
			className={inputStyles}
			type={props.type}
			placeholder={props.placeholder}
			defaultValue={props.defaultValue}
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
