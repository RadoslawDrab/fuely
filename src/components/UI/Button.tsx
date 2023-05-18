import React from 'react'
import { className, createDatasetObject } from '@/utils'

import { Props } from '@/types/UI/Button.modal'

import styles from '@styles/UI/Button.module.scss'

export default function Button(props: Props) {
	const buttonClass = className(styles.button, props.selected ? 'selected' : '', props.className)

	const data = props.data ? createDatasetObject(props.data) : {}

	return (
		<button
			className={buttonClass}
			onClick={props.onClick}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			{...data}
			disabled={props.disabled}>
			{props.children}
		</button>
	)
}
