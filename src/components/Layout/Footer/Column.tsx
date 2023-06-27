import React from 'react'

import { className } from '@/utils'

import { ColumnProps as Props } from '@/components/Layout/types/Footer.modal'

import styles from '@styles/Layout/Footer/Column.module.scss'

export default function Column(props: Props) {
	const columnStyles = className(styles.column, `column ${props.name}-column`)
	return (
		<div className={columnStyles}>
			{props.title && <span>{props.title}</span>}
			<ul>{props.children}</ul>
		</div>
	)
}
