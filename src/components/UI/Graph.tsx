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

	// If `max` prop is set to 'auto' then get's max possible value from `items` array
	const maxValue = props.max === 'auto' ? Math.max(...props.items.map((item) => item.value)) : props.max || 1

	const scale = (() => {
		const { graphScaling } = props
		if (!graphScaling || graphScaling.boundary < 0 || graphScaling.boundary > 1)
			return {
				enabled: false,
				minValue: 0,
				maxGraphValue: 1
			}

		// Percents of values' items based on `mainValue`
		const percents = props.items.map((item) => {
			if (graphScaling.mainValue) return item.value / graphScaling.mainValue
			else return 1
		})
		// Max percent change
		const maxPercent = Math.abs(Math.max(...percents))
		// Min percent change
		const minPercent = Math.abs(Math.min(...percents))
		// Min and max graph value with adjusted scaling based on `boundary` prop
		const minValue = minPercent * graphScaling.mainValue * (1 - graphScaling.boundary)
		const maxValue = maxPercent * graphScaling.mainValue * (1 + graphScaling.boundary)
		const maxGraphValue = maxValue - minValue

		return {
			enabled: true,
			minValue,
			maxGraphValue
		}
	})()

	const progressElements = props.items.map((item, i) => {
		const graphValue = scale.enabled ? Math.max(item.value - scale.minValue, 0) : item.value
		const graphMaxValue = scale.enabled ? scale.maxGraphValue : maxValue
		const key = `${i}-${getRandomKey()}`
		const labelId = `progress-bar-${i}`

		return (
			<li key={key} className={styles.bar}>
				{item.name && <label htmlFor={labelId}>{item.name}</label>}
				<progress id={labelId} max={graphMaxValue} value={graphValue}>
					at {item.value}/{props.max}
				</progress>
				{item.tooltip && <div className={styles.tooltip}>{item.tooltip}</div>}
			</li>
		)
	})
	return <ul className={graphStyles}>{progressElements}</ul>
}
