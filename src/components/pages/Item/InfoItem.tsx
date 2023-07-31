import React from 'react'

import { className } from '@/utils'

import { InfoItemProps as Props } from './types/Info.modal'

import Graph from '@/components/UI/Graph'

import styles from '@styles/pages/Item/InfoItem.module.scss'

export default function InfoItem(props: Props) {
	const graphItems = props.items.map((item) => {
		const percentString = `${item.percent === 0 ? '' : item.percent >= 0 ? '+' : '-'}${Math.abs(item.percent).toFixed(2)}%`
		const currentClassName = item.isCurrent ? styles.current : ''

		return {
			name: (
				<>
					<span className={className(currentClassName, styles.date)}>{item.date}</span>
					<span className={className(currentClassName, styles.value)} data-unit={item.unit}>
						{item.value}
					</span>
				</>
			),
			tooltip: !item.isCurrent ? percentString : '',
			value: +item.value
		}
	})

	return (
		<div className={styles.item}>
			<Graph items={graphItems} alignVertically graphScaling={{ boundary: 0.04, mainValue: props.item.value }} />
		</div>
	)
}
