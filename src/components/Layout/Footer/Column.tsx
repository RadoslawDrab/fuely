import React from 'react'

import styles from '@styles/Layout/Footer/Column.module.scss'
import { className } from '@/utils'

interface Props {
	title: string
	children?: any
	name: string
}
export default function Column(props: Props) {
	const columnStyles = className(styles.column, `column ${props.name}-column`)
	return (
		<div className={columnStyles}>
			<span>{props.title}</span>
			{props.title && <hr />}
			<ul>{props.children}</ul>
		</div>
	)
}
