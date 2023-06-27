import React from 'react'

import { className } from '@/utils'

import { ErrorProps as Props } from './types/Error.modal'

import styles from '@styles/UI/Error.module.scss'

export default function Error(props: Props) {
	const errorStyles = className(styles.error, props.className)
	return (
		<>
			{props.show && (
				<span className={errorStyles} role="status">
					{props.text}
				</span>
			)}
		</>
	)
}
