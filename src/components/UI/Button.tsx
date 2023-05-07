import React from 'react'
import { className } from '@/utils'

import { Props } from '@/types/components/UI/Button.modal'

import styles from '@styles/UI/Button.module.scss'

export default function Button(props: Props) {
	const buttonClass = className(styles.button, props.className)

	return (
		<button className={buttonClass} onClick={props.onClick} onFocus={props.onFocus} onBlur={props.onBlur}>
			{props.children}
		</button>
	)
}
