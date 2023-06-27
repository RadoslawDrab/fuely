import React from 'react'

import { FullEvent } from '@/hooks/Events/Events.modal'
import { EventSiblings } from '@/pages/[eventId]'
import useCalculate, { Data } from '@/hooks/Events/use-calculate'
import { getProp } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context'

import Section from '@/components/Layout/Section'
import InfoItem from './InfoItem'

import styles from '@styles/pages/Item/Info.module.scss'

interface Props {
	events: EventSiblings
}
export default function Info(props: Props) {
	const { getText } = useAppContext().Language

	const currentEvent = props.events[2]
	const { getData, compare, keys } = useCalculate(currentEvent)

	const sections = keys.map((key, index) => {
		const data: Data = getProp(getData(currentEvent), key)
		const itemKey = `${key}-${index}`

		const infoItems = props.events
			.filter((event): event is FullEvent => event !== null)
			.map((event) => {
				const data: Data = getProp(getData(event), key)
				const isCurrent = currentEvent.fullId === event.fullId
				const percent = getProp(compare(event), key)
				return {
					value: data.value.toFixed(data.decimals ?? 2),
					unit: data.unitType,
					date: event.date,
					isCurrent,
					percent
				}
			})

		return (
			<div key={itemKey} className={styles['data-section']}>
				<header>
					<span className={styles.name}>{data.name}</span>
					<span className={styles.value}>
						{data.value.toFixed(data.decimals ?? 2)} {data.unitType}
					</span>
				</header>
				<hr />
				<InfoItem item={data} items={infoItems} />
				<hr />
			</div>
		)
	})

	return (
		<Section title={getText('Event')} className={styles.section} contentClassName={styles['section-content']}>
			{sections}
		</Section>
	)
}
