import React from 'react'

import { Data } from '@/hooks/use-calculate'
import { className } from '@/utils'

import styles from '@styles/pages/Item/InfoItem.module.scss'

interface Props {
	item: Data
	items: { unit: string; value: string; date: string; isCurrent: boolean; percent: number }[]
}
export default function InfoItem(props: Props) {
	const dateItems = props.items.map((item, index) => {
		const key = `${item.date + '-' + index}`
		const percentString = `${item.percent === 0 ? '' : item.percent >= 0 ? '+' : '-'}${Math.abs(item.percent).toFixed(2)}%`

		const currentClassName = item.isCurrent ? styles.current : ''
		const dateClassName = className(styles.date, currentClassName)
		const valueClassName = className(styles.value, currentClassName)
		const percentClassName = className(styles.percent, currentClassName)

		return (
			<React.Fragment key={key}>
				<time className={dateClassName} dateTime={item.date}>
					{item.date}
				</time>
				<data className={valueClassName} value={item.value}>
					{item.value} {item.isCurrent && <span>{item.unit}</span>}
				</data>
				<data className={percentClassName} value={item.percent}>
					{percentString}
				</data>
			</React.Fragment>
		)
	})
	return <ul className={styles.item}>{dateItems}</ul>
}
