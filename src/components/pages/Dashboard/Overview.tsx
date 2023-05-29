import React from 'react'

import { className, getRandomKey } from '@/utils'

import Section from '@/components/Layout/Section'
import Graph from '@/components/UI/Graph'

import styles from '@styles/pages/Dashboard/Overview.module.scss'
import defaultStyles from '@styles/styles.module.scss'

interface Props {
	className?: string
	date: string
	items: {
		label: string
		currentValue: number
		previousValue: number
		unit: string | JSX.Element
		digits?: number
	}[]
}
export default function Overview(props: Props) {
	const sectionStyles = className(defaultStyles.section, props.className)

	const itemElements = props.items.map((item, i) => {
		const key = `${i}-${getRandomKey()}`

		const percent = item.currentValue / item.previousValue - 1
		const percentString = `${percent > 0 ? '+' : '-'}${Math.abs(percent * 100).toFixed(1)}`

		const value = item.currentValue.toFixed(item.digits ?? 1)
		const prevValue = item.previousValue.toFixed(item.digits ?? 1)
		return (
			<React.Fragment key={key}>
				<label className={styles.label}>{item.label}</label>
				<Graph
					className={styles.graph}
					min={0}
					max={Math.max(item.currentValue, item.previousValue)}
					items={[
						{ name: value, value: item.currentValue },
						{ name: prevValue, value: item.previousValue }
					]}
				/>

				<data value={value}>
					<span className={styles.data}>
						{value}
						<span>{item.unit}</span>
					</span>
					<span className={styles.percent}>{percentString}</span>
				</data>
			</React.Fragment>
		)
	})
	return (
		<Section title="Overview" className={sectionStyles} contentClassName={styles.section}>
			<header>
				<h3>Last refuel</h3>
				<time dateTime={props.date}>{props.date}</time>
			</header>
			<hr />
			<div className={styles.main}>{itemElements}</div>
		</Section>
	)
}