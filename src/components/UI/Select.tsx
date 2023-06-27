import React from 'react'

import { className } from '@/utils'

import { SelectProps as Props } from './types/Select.modal'

import styles from '@styles/UI/Select.module.scss'
import inputStyles from '@styles/UI/Input.module.scss'

export default function Select(props: Props) {
	const selectStyles = className(styles.select, inputStyles.input, props.className)
	const selectedOption = props.options.find((option) => option.selected)
	const options = props.options.map((option, index) => {
		return (
			<option key={index} value={option.value}>
				{option.name ?? option.value}
			</option>
		)
	})

	function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
		if (props.getValue) props.getValue(e.target.value)
		if (props.onChange) props.onChange(e)
	}
	return (
		<select
			className={selectStyles}
			id={props.id}
			name={props.name}
			onChange={onChange}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			defaultValue={selectedOption?.value}>
			{options}
		</select>
	)
}
