import React from 'react'

import { className, createDatasetObject } from '@/utils'

import { ButtonProps as Props } from '@/components/UI/types/Button.modal'

import styles from '@styles/UI/Button.module.scss'

export default function Button(props: Props) {
	const variant = (() => {
		if (props.variant) {
			switch (typeof props.variant) {
				case 'object': {
					return props.variant.reduce((prev, cur) => (cur !== 'default' ? (prev += `${styles[`button_${cur}`]} `) : prev), '')
				}
				case 'string': {
					return props.variant !== 'default' ? styles[`button_${props.variant}`] : ''
				}
			}
		} else return ''
	})()

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
			{props.children || 'Button'}
		</button>
	)
}
