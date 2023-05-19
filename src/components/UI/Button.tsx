import React from 'react'
import { className, createDatasetObject } from '@/utils'

import { Props } from '@/types/UI/Button.modal'

import styles from '@styles/UI/Button.module.scss'

export default function Button(props: Props) {
	let variant = ''

	if (props.variant) {
		switch (typeof props.variant) {
			case 'object': {
				variant = props.variant.reduce((prev, cur) => (prev += `${styles[`button_${cur}`]} `), '')
				break
			}
			case 'string': {
				variant = styles[`button_${props.variant}`]
				break
			}
		}
	}

	const buttonClass = className(styles.button, props.selected ? styles.selected : '', variant, props.className)

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
