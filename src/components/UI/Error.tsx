import React from 'react'

import { className } from '@/utils'

import styles from '@styles/UI/Error.module.scss'

interface Props {
	show: boolean
	text: string
	className?: string
}
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
