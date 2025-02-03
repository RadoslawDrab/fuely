import React from 'react'

import { className, createDatasetObject } from '@/utils'

import { SelectProps as Props } from './types/Select.modal'

import Icon from './Icon'

import styles from '@styles/UI/Select.module.scss'
import inputStyles from '@styles/UI/Input.module.scss'

export default function Select(props: Props) {
	const selectStyles = className(styles.select, inputStyles.input, props.className)
	const selectedOption = props.options.find((option) => option?.selected)

	const options = props.options.filter(option => option != null).map((option, index) => {
		return (
			<option key={index} value={option?.value} className={option?.className}>
				{option?.name ?? option?.value}
			</option>
		)
	})
	const data = props.data ? createDatasetObject(props.data) : {}

	function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
		if (props.getValue) props.getValue(e.target.value)
		if (props.onChange) props.onChange(e)
	}
	return (
		<div className={className(styles.wrapper, props.wrapperClassName)}>
			<select
				className={selectStyles}
				id={props.id}
				name={props.name}
				onChange={onChange}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				{
					...props.useDefaultValue ? { defaultValue: selectedOption?.value } : { value: selectedOption?.value }
				}
				{...data}>
				{options}
			</select>
			<Icon type="caret-left" alt="caret icon" />
		</div>
	)
}
