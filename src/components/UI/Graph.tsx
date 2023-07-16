import React from 'react'

import { className, getRandomKey } from '@/utils'

import { GraphProps as Props } from './types/Graph.modal'

import styles from '@styles/UI/Graph.module.scss'

export default function Graph(props: Props) {
	const graphStyles = className(
		styles.graph,
		props.meter ? styles.meter : '',
		props.alignVertically ? styles.vertical : '',
		props.className
	)

	const progressElements = props.items.map((item, i) => {
		const key = `${i}-${getRandomKey()}`
		const labelId = `progress-bar-${i}`

		return (
			<li key={key} className={styles.bar}>
				{item.name && <label htmlFor={labelId}>{item.name}</label>}
				<progress id={labelId} max={props.max} value={item.value}>
					at {item.value}/{props.max}
				</progress>
				{item.tooltip && <div className={styles.tooltip}>{item.tooltip}</div>}
			</li>
		)
	})
	return <ul className={graphStyles}>{progressElements}</ul>
}
