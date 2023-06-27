import React, { useState } from 'react'

import { className } from '@/utils'

import styles from '@styles/UI/Select.module.scss'
import inputStyles from '@styles/UI/Input.module.scss'

interface Props {
	id?: string
	name?: string
	className?: string
	options: { name?: any; value: string; selected?: boolean }[]
	getValue?: (value: string) => void
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
}
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
